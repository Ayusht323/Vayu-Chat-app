import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from '../components/skeletons/SidebarSkeleton'
import { Users } from 'lucide-react'



const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, subscribeToProfileUpdates, unsubscribeFromProfileUpdates } = useChatStore();

    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    useEffect(() => {
        getUsers();
        subscribeToProfileUpdates();

        return () => {
            unsubscribeFromProfileUpdates();
        };
    }, [getUsers, subscribeToProfileUpdates, unsubscribeFromProfileUpdates]);

    const filteredUsers = showOnlineOnly
        ? users.filter((user) => onlineUsers.includes(user._id))
        : users;

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300/50 flex flex-col transition-all duration-300 bg-base-100/50 backdrop-blur-sm">
            <div className="border-b border-base-300/50 w-full p-5 bg-base-100/30">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Users className="size-5 text-primary" />
                    </div>
                    <span className="font-semibold text-lg hidden lg:block">Contacts</span>
                </div>
                {/* TODO: Online filter toggle */}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm checkbox-primary"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-xs text-base-content/60 font-medium">({onlineUsers.length - 1} online)</span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-2 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100">
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`
                w-full p-3 flex items-center gap-3 relative group
                transition-all duration-200 cursor-pointer
                ${selectedUser?._id === user._id 
                    ? "bg-gradient-to-r from-primary/20 to-secondary/20 shadow-lg shadow-primary/10 border-l-4 border-primary" 
                    : "hover:bg-base-200/70 hover:pl-5 border-l-4 border-transparent"}
              `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <div className="relative">
                                <img
                                    src={user.profilePic || "/avatar.png"}
                                    alt={user.name}
                                    className="size-12 object-cover rounded-full transition-transform duration-200 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </div>
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-base-100 shadow-lg animate-pulse"
                                />
                            )}
                        </div>

                        {/* User info - only visible on larger screens */}
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-semibold truncate group-hover:text-primary transition-colors duration-200">{user.fullName}</div>
                            <div className={`text-sm transition-colors duration-200 ${onlineUsers.includes(user._id) ? "text-green-500 font-medium" : "text-base-content/50"}`}>
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="text-center text-base-content/50 py-8">
                        <Users className="size-12 mx-auto mb-2 opacity-50" />
                        <p className="font-medium">No online users</p>
                        <p className="text-sm mt-1">Check back later!</p>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;