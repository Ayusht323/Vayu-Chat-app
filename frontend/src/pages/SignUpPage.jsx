import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { User, MessageSquare, Mail, Lock, Loader2, Check, X, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import { checkPasswordStrength, validateEmail } from '../lib/utils'
import toast from 'react-hot-toast'

const SignUpPage = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const {signup, isSigningUp} = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (formData.fullName.trim().length < 2) return "Full name must be at least 2 characters";
    
    if (!formData.email.trim()) return "Email is required";
    if (!validateEmail(formData.email)) return "Please enter a valid email address";
    
    if (!formData.password) return "Password is required";
    
    const strength = checkPasswordStrength(formData.password);
    if (!strength.isStrong) return "Please create a stronger password";
    
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
      await signup(formData);
    } catch (error) {
      // Error is already handled in the store with toast
      console.log("Signup error:", error);
    }
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    
    if (password) {
      const strength = checkPasswordStrength(password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(null);
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
                  Create Account
                </h1>
                <p className="text-base-content/70 text-xs font-medium px-2 sm:px-0">Get started with your free account today</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="form-control group">
              <label htmlFor="fullName" className="label pb-1 sm:pb-2">
                <span className="label-text font-semibold text-xs sm:text-sm text-base-content/80 group-focus-within:text-primary transition-colors duration-300">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none z-10">
                  <User className="size-4 sm:size-5 text-base-content/40 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300" />
                </div>
                <input 
                  type="text" 
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
                  placeholder="John Doe" 
                  className="input input-bordered w-full pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base bg-base-100/50 border-base-300 focus:border-primary focus:bg-base-100 hover:border-base-content/20 transition-all duration-300 rounded-xl sm:rounded-2xl shadow-sm focus:shadow-lg focus:shadow-primary/20 hover:shadow-md placeholder:text-base-content/40 focus:placeholder:text-base-content/60"
                  required
                />
                {/* Input glow effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-sm"></div>
              </div>
            </div>

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
                  type="password" 
                  id="password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••" 
                  className="input input-bordered w-full pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base bg-base-100/50 border-base-300 focus:border-primary focus:bg-base-100 hover:border-base-content/20 transition-all duration-300 rounded-xl sm:rounded-2xl shadow-sm focus:shadow-lg focus:shadow-primary/20 hover:shadow-md placeholder:text-base-content/40 focus:placeholder:text-base-content/60"
                  required
                />
                {/* Input glow effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-sm"></div>
              </div>
              
              {/* Password strength indicator - Compact Version */}
              {formData.password && (
                <div className="mt-2 space-y-2">
                  {/* Strength bar with integrated text */}
                  <div className="relative">
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          passwordStrength?.strength === 1 ? 'w-1/5 bg-red-500' :
                          passwordStrength?.strength === 2 ? 'w-2/5 bg-orange-500' :
                          passwordStrength?.strength === 3 ? 'w-3/5 bg-yellow-500' :
                          passwordStrength?.strength === 4 ? 'w-4/5 bg-blue-500' :
                          passwordStrength?.strength === 5 ? 'w-full bg-green-500' : 'w-0'
                        }`}
                      />
                    </div>
                    <div className="absolute -top-1 right-0 text-xs font-medium">
                      <span className={passwordStrength?.strengthColor}>
                        {passwordStrength?.strengthText}
                      </span>
                    </div>
                  </div>
                  
                  {/* Compact requirements - show as small pills */}
                  <div className="flex flex-wrap gap-1">
                    {passwordStrength.requirements.map((req, index) => {
                      const icons = {
                        "At least 8 characters": "8+",
                        "At least one number": "123",
                        "At least one lowercase letter": "abc",
                        "At least one uppercase letter": "ABC",
                        "At least one special character": "@#$"
                      };
                      
                      return (
                        <div 
                          key={index} 
                          className={`
                            px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-300
                            ${req.met 
                              ? 'bg-green-500/20 text-green-600 border border-green-500/30' 
                              : 'bg-base-300/50 text-base-content/50 border border-base-300'
                            }
                          `}
                          title={req.text}
                        >
                          <span className="font-mono text-xs">{icons[req.text]}</span>
                        </div>
                      );
                    })}
                    
                    {/* Info button for details */}
                    <button
                      type="button"
                      onClick={() => setShowPasswordRequirements(!showPasswordRequirements)}
                      className="px-2 py-0.5 rounded-full text-xs font-medium bg-base-300/50 text-base-content/60 hover:bg-base-300 transition-all duration-200 border border-base-300"
                      title="Show password requirements"
                    >
                      <Info className="size-3" />
                    </button>
                  </div>
                  
                  {/* Expandable detailed requirements */}
                  {showPasswordRequirements && (
                    <div className="mt-2 space-y-1 bg-base-200/30 rounded-lg p-2 border border-base-300/50 animate-in slide-in-from-top-2 duration-200">
                      {passwordStrength.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {req.met ? (
                            <Check className="size-3 text-green-500 flex-shrink-0" />
                          ) : (
                            <X className="size-3 text-base-content/40 flex-shrink-0" />
                          )}
                          <span className={`text-xs ${req.met ? 'text-base-content/80' : 'text-base-content/60'}`}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="relative btn w-full h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border-0 text-white shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={isSigningUp}
            >
              {/* Animated background layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl sm:rounded-2xl"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-4 sm:size-5 animate-spin" />
                    <span className="text-sm sm:text-base font-medium">Creating account...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm sm:text-base font-semibold">Sign Up</span>
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
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:text-secondary transition-colors duration-200 hover:underline decoration-2 underline-offset-2">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <AuthImagePattern 
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with the people who matter most."
      />
    </div>
  )
}

export default SignUpPage