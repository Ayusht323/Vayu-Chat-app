import React from 'react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import { validateEmail } from '../lib/utils';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login, isSigningIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return "Email is required";
    if (!validateEmail(formData.email)) return "Please enter a valid email address";
    
    if (!formData.password) return "Password is required";
    
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }
    
    try {
      await login(formData);
    } catch (error) {
      // Error is already handled in the store with toast
      console.log("Login error:", error);
    }
  }

  return (
    <div className="h-full grid lg:grid-cols-2 bg-gradient-to-br from-base-300 via-base-200 to-base-100 overflow-hidden">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-8 lg:p-10 relative h-full min-h-0 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
        <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-32 h-32 sm:w-40 sm:h-40 bg-secondary/10 rounded-full blur-3xl"></div>
        
        {/* Enhanced Glass morphism container */}
        <div className="w-full max-w-md space-y-4 sm:space-y-5 relative z-10 bg-base-100/90 backdrop-blur-xl border border-base-300/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl mx-auto hover:shadow-3xl transition-all duration-500 hover:border-primary/20 group animate-in slide-in-from-bottom-4 duration-700">
          {/* Logo and Header */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-2 group mb-4 sm:mb-5">
              <div className="relative">
                <div className="size-12 sm:size-14 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-primary/25 hover:shadow-primary/40 animate-pulse hover:animate-none">
                  <MessageSquare className="size-6 sm:size-7 text-white drop-shadow-sm group-hover:rotate-12 transition-transform duration-500" />    
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-2xl sm:rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
                {/* Additional glow rings */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-base-content/70 text-xs font-medium px-2 sm:px-0">Sign in to continue your conversations</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="form-control group">
              <label htmlFor="email" className="label pb-1 sm:pb-2">
                <span className="label-text font-semibold text-xs sm:text-sm text-base-content/80 group-focus-within:text-primary transition-colors duration-300">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none z-10">
                  <Mail className="size-4 sm:size-5 text-base-content/40 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300" />
                </div>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  placeholder="you@example.com" 
                  className="input input-bordered w-full pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base bg-base-100/50 border-base-300 focus:border-primary focus:bg-base-100 hover:border-base-content/20 transition-all duration-300 rounded-xl sm:rounded-2xl shadow-sm focus:shadow-lg focus:shadow-primary/20 hover:shadow-md placeholder:text-base-content/40 focus:placeholder:text-base-content/60"
                  required
                />
                {/* Input glow effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-sm"></div>
              </div>
            </div>

            <div className="form-control group">
              <label htmlFor="password" className="label pb-1 sm:pb-2">
                <span className="label-text font-semibold text-xs sm:text-sm text-base-content/80 group-focus-within:text-primary transition-colors duration-300">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none z-10">
                  <Lock className="size-4 sm:size-5 text-base-content/40 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                  placeholder="••••••••" 
                  className="input input-bordered w-full pl-10 sm:pl-12 pr-12 h-11 sm:h-12 text-sm sm:text-base bg-base-100/50 border-base-300 focus:border-primary focus:bg-base-100 hover:border-base-content/20 transition-all duration-300 rounded-xl sm:rounded-2xl shadow-sm focus:shadow-lg focus:shadow-primary/20 hover:shadow-md placeholder:text-base-content/40 focus:placeholder:text-base-content/60"
                  required
                />
                {/* Password visibility toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center z-10 text-base-content/40 hover:text-primary transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="size-4 sm:size-5" />
                  ) : (
                    <Eye className="size-4 sm:size-5" />
                  )}
                </button>
                {/* Input glow effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-sm"></div>
              </div>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                <span className="text-base-content/70">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-primary hover:text-secondary transition-colors duration-200 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="relative btn w-full h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border-0 text-white shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={isSigningIn}
            >
              {/* Animated background layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl sm:rounded-2xl"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isSigningIn ? (
                  <>
                    <Loader2 className="size-4 sm:size-5 animate-spin" />
                    <span className="text-sm sm:text-base font-medium">Signing in...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm sm:text-base font-semibold">Sign In</span>
                    <div className="w-0 group-hover:w-5 transition-all duration-300 overflow-hidden">
                      <div className="size-4 sm:size-5 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="size-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="text-center pt-1 sm:pt-2">
            <p className="text-base-content/60 text-xs sm:text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:text-secondary transition-colors duration-200 hover:underline decoration-2 underline-offset-2">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <AuthImagePattern 
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and connect with your community."
      />
    </div>
  );
};

export default LoginPage;