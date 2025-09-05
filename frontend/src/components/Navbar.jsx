import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Settings, LogOut, User, Home } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
    const { authUser, logout } = useAuthStore();

    return (
        <div className="navbar bg-base-100/80 backdrop-blur-xl border-b border-base-300/20 px-4 lg:px-6 h-16 min-h-16 flex-shrink-0 z-50 shadow-sm relative">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform duration-300 group h-auto py-2">
                    <div className="relative">
                        <div className="size-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                            <MessageSquare className="size-4 text-white drop-shadow-sm" />
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    </div>
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Vayu
                    </span>
                </Link>
            </div>
            

            
            <div className="navbar-end gap-2">
                {authUser ? (
                    <div className="flex items-center gap-2">
                        <Link 
                            to="/profile" 
                            className="btn btn-ghost btn-sm rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center gap-2"
                        >
                            <User className="size-4" />
                            <span className="hidden sm:inline">Profile</span>
                        </Link>
                        <Link 
                            to="/settings" 
                            className="btn btn-ghost btn-sm rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center gap-2"
                        >
                            <Settings className="size-4" />
                            <span className="hidden sm:inline">Settings</span>
                        </Link>
                        <button 
                            onClick={logout}
                            className="btn btn-ghost btn-sm rounded-xl text-error hover:bg-error/10 transition-all duration-300 flex items-center gap-2"
                        >
                            <LogOut className="size-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-ghost btn-sm rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300">
                            Sign In
                        </Link>
                        <Link to="/signup" className="btn btn-primary btn-sm rounded-xl bg-gradient-to-r from-primary to-secondary border-0 text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;