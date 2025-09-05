import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';
import { io } from 'socket.io-client';

export const useChatStore = create((set, get) => ({
    users: [],
    messages: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get('/messages/users');
            set({ users: res.data});
        } catch (error) {
            set({ isUsersLoading: false });
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            set({ isMessageLoading: false });
            toast.error(error.response.data.message);
        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
          const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
          set({ messages: [...messages, res.data] });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    
      subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
    
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
    
        socket.on("newMessage", (newMessage) => {
          const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
          if (!isMessageSentFromSelectedUser) return;
    
          set({
            messages: [...get().messages, newMessage],
          });
        });
      },
    
      unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (socket) {
          socket.off("newMessage");
        }
      },

    setSelectedUser: (SelectedUser) => set({ selectedUser: SelectedUser }),
    clearSelectedUser: () => set({ selectedUser: null }),
    
    // Reset all chat state - used on logout
    resetState: () => set({ 
        users: [], 
        messages: [], 
        selectedUser: null,
        isUsersLoading: false,
        isMessageLoading: false
    }),

    // Listen for profile updates
    subscribeToProfileUpdates: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        socket.on("userProfileUpdate", (updateData) => {
            const { userId, profilePic, fullName } = updateData;
            
            // Update the user in the users list
            set((state) => ({
                users: state.users.map(user => 
                    user._id === userId.toString() 
                        ? { ...user, profilePic, fullName }
                        : user
                )
            }));

            // Update selected user if it's the one being updated
            const { selectedUser } = get();
            if (selectedUser && selectedUser._id === userId.toString()) {
                set({ 
                    selectedUser: { ...selectedUser, profilePic, fullName }
                });
            }
        });
    },

    unsubscribeFromProfileUpdates: () => {
        const socket = useAuthStore.getState().socket;
        if (socket) {
            socket.off("userProfileUpdate");
        }
    },
}));