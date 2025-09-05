import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, User, Mail, Calendar, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'



const ProfilePage = () => {

  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  // Compress image function
  const compressImage = (base64String, maxWidth = 800, maxHeight = 800, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64String;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert back to base64 with compression
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };

      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast.error("Image size too large. Please upload an image smaller than 10MB");
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a valid image (JPEG, PNG, GIF, or WebP)");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      
      try {
        // Show loading toast
        const loadingToast = toast.loading("Processing image...");
        
        // Compress the image if it's larger than 1MB
        let finalImage = base64Image;
        const base64Size = base64Image.length * 0.75; // Approximate size in bytes
        
        if (base64Size > 1 * 1024 * 1024) { // If larger than 1MB, compress
          try {
            finalImage = await compressImage(base64Image, 800, 800, 0.7);
            toast.dismiss(loadingToast);
            toast.success("Image compressed successfully");
          } catch (compressionError) {
            toast.dismiss(loadingToast);
            console.error("Compression failed:", compressionError);
            // Continue with original image if compression fails
          }
        } else {
          toast.dismiss(loadingToast);
        }
        
        // Set the image immediately for instant preview!
        setSelectedImg(finalImage);
        
        // Then try to upload to server
        await updateProfile({ profilePic: finalImage });
      } catch (error) {
        console.error("Upload failed, but image is still showing:", error);
        // The error will be handled by the updateProfile function in useAuthStore
        // which will show a toast with the specific error message
      }
    };
  }

  return (
    <div className="min-h-full bg-base-200">
      <div className="container max-w-2xl mx-auto px-4 pt-20 pb-12">
        {/* Simple Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-base-content">Profile</h1>
          <p className="text-base-content/60 mt-2">Your account information</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-8 py-12">
            <div className="flex flex-col items-center">
              {/* Profile Picture */}
              <div className="relative mb-6">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover ring-4 ring-base-100 shadow-lg"
                />
                
                {/* Camera Button */}
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-1 right-1
                    bg-primary hover:bg-primary-focus text-white
                    p-2.5 rounded-full cursor-pointer shadow-lg
                    transition-all duration-200 hover:scale-110
                    ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}
                  `}
                >
                  <Camera className="w-5 h-5" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
                
                {/* Loading Overlay */}
                {isUpdatingProfile && (
                  <div className="absolute inset-0 bg-white/80 rounded-full flex items-center justify-center">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-bold text-base-content">{authUser?.fullName}</h2>
              <p className="text-base-content/60 text-sm mt-1">
                {isUpdatingProfile ? 'Updating...' : 'Click camera icon to update photo'}
              </p>
            </div>
          </div>

          {/* Information Section */}
          <div className="p-8 space-y-6">
            {/* Full Name */}
            <div>
              <label className="text-xs font-medium text-base-content/60 uppercase tracking-wider">
                Full Name
              </label>
              <div className="mt-2 flex items-center gap-3 p-4 bg-base-200/50 rounded-xl">
                <User className="w-5 h-5 text-base-content/40" />
                <span className="text-lg font-medium">{authUser?.fullName}</span>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-medium text-base-content/60 uppercase tracking-wider">
                Email Address
              </label>
              <div className="mt-2 flex items-center gap-3 p-4 bg-base-200/50 rounded-xl">
                <Mail className="w-5 h-5 text-base-content/40" />
                <span className="text-lg font-medium">{authUser?.email}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="divider"></div>

            {/* Account Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-base-200/30 rounded-xl">
                <Calendar className="w-5 h-5 text-base-content/60 mx-auto mb-2" />
                <p className="text-xs text-base-content/60">Member Since</p>
                <p className="font-semibold mt-1">
                  {authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  }) : 'Nov 2024'}
                </p>
              </div>

              <div className="text-center p-4 bg-base-200/30 rounded-xl">
                <CheckCircle className="w-5 h-5 text-success mx-auto mb-2" />
                <p className="text-xs text-base-content/60">Status</p>
                <p className="font-semibold text-success mt-1">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage