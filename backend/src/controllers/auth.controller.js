import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"
import { io } from "../lib/socket.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!!" });
        }

        // Password strength validation
        const passwordRegex = {
            minLength: /.{8,}/,
            number: /[0-9]/,
            lowercase: /[a-z]/,
            uppercase: /[A-Z]/,
            special: /[^A-Za-z0-9]/
        };

        if (!passwordRegex.minLength.test(password)) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const strengthChecks = [
            passwordRegex.number.test(password),
            passwordRegex.lowercase.test(password),
            passwordRegex.uppercase.test(password),
            passwordRegex.special.test(password)
        ];

        const passedChecks = strengthChecks.filter(check => check).length;
        
        if (passedChecks < 3) {
            return res.status(400).json({ 
                message: "Password must contain at least 3 of the following: uppercase letter, lowercase letter, number, special character" 
            });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(String(password), salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(String(password), user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logut controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        // Check if the base64 string is too large (over 10MB when decoded)
        const base64Size = profilePic.length * 0.75; // Approximate size in bytes
        if (base64Size > 10 * 1024 * 1024) {
            return res.status(400).json({ message: "Image size too large. Please upload an image smaller than 10MB" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            resource_type: 'auto',
            transformation: [
                { width: 500, height: 500, crop: 'limit' },
                { quality: 'auto' }
            ]
        });
        
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { profilePic: uploadResponse.secure_url }, 
            { new: true }
        );

        // Emit profile update to all connected users
        io.emit("userProfileUpdate", {
            userId: updatedUser._id,
            profilePic: updatedUser.profilePic,
            fullName: updatedUser.fullName
        });

        res.status(200).json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic,
        });

    } catch (error) {
        console.log("Error in update profile:", error.message);
        console.log("Full error details:", error);
        
        // Handle specific Cloudinary errors
        if (error.message?.includes('Invalid image file')) {
            return res.status(400).json({ message: "Invalid image format. Please upload a valid image file" });
        }
        
        if (error.message?.includes('File size too large')) {
            return res.status(400).json({ message: "Image size too large. Please upload a smaller image" });
        }
        
        // Handle missing Cloudinary configuration
        if (error.message?.includes('Must supply api_key') || error.message?.includes('Unknown api_key')) {
            console.error("Cloudinary configuration error - check your environment variables:");
            console.error("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Not set");
            console.error("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "Set" : "Not set");
            console.error("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "Set" : "Not set");
            return res.status(500).json({ message: "Server configuration error. Please contact support." });
        }
        
        res.status(500).json({ message: "Failed to update profile picture. Please try again" });
    }
};

export const checkAuth = (req,res) =>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}