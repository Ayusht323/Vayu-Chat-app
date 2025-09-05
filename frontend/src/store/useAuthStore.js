import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BaseURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');

            set({ authUser: res.data });
            get().connectedSocket();
        } catch (error) {
            set({ authUser: null });
            console.log("Error in checkAuth", error.message);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data, isSigningUp: false });
            toast.success("Account created successfully!");
        } catch (error) {
            set({ isSigningUp: false });
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
            throw error;
        }
    },

    login: async (data) => {
        set({ isSigningIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data, isSigningIn: false });
            toast.success("Logged in successfully!");

            get().connectedSocket();
        } catch (error) {
            set({ isSigningIn: false });
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
            throw error;
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            get().disconnectSocket();
        } catch (error) {
            console.log("Error in logout", error.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: res.data, isUpdatingProfile: false });
            toast.success("Profile updated successfully!");
        } catch (error) {
            set({ isUpdatingProfile: false });
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        }
    },

    connectedSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BaseURL, {
            query: {
                userId: authUser._id
            }
        });
        socket.connect();
        set({ socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
        }
    }
}));