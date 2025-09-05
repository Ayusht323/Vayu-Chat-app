import { MessageSquare, Users, Heart, Star, Zap, Shield, Sparkles, Globe, Lock } from "lucide-react";
import React from "react";


const AuthImagePattern = ({ title, subtitle }) => {
    const icons = [MessageSquare, Users, Heart, Star, Zap, Shield, Sparkles, Globe, Lock];
    const iconLabels = [
        "Real-time Chat",
        "Community",
        "Find Love",
        "Premium Features",
        "Lightning Fast",
        "Secure & Private",
        "AI Powered",
        "Global Reach",
        "End-to-End Encrypted"
    ];
    
    return (
        <div className="hidden lg:flex items-center justify-center h-full p-8 xl:p-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
            {/* Enhanced Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full">
                {/* Main floating orbs */}
                <div className="absolute top-10 xl:top-20 left-10 xl:left-20 w-48 xl:w-64 h-48 xl:h-64 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 xl:bottom-20 right-10 xl:right-20 w-32 xl:w-48 h-32 xl:h-48 bg-gradient-to-br from-secondary/20 to-accent/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-5 xl:left-10 w-24 xl:w-32 h-24 xl:h-32 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
                
                {/* Additional floating elements */}
                <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-primary/5 rounded-full blur-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-secondary/5 rounded-full blur-lg animate-pulse" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute top-2/3 right-1/6 w-12 h-12 bg-accent/5 rounded-full blur-md animate-pulse" style={{animationDelay: '2.5s'}}></div>
                
                {/* Sparkle effects */}
                <div className="absolute top-1/5 left-1/2 w-2 h-2 bg-primary/30 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
                <div className="absolute bottom-1/4 left-1/5 w-1 h-1 bg-secondary/40 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
                <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-accent/35 rounded-full animate-ping" style={{animationDelay: '5s'}}></div>
            </div>
            
            <div className="w-full max-w-sm xl:max-w-md mx-auto flex flex-col items-center justify-center gap-3 relative z-10 px-4">
                {/* Enhanced Icon Grid */}
                <div className="grid grid-cols-3 gap-1.5 xl:gap-2 w-full max-w-xs xl:max-w-sm mx-auto">
                    {[...Array(9)].map((_, index) => {
                        const Icon = icons[index];
                        const delay = index * 0.2;
                        const colors = [
                            'from-primary/20 to-primary/10 border-primary/30',
                            'from-secondary/20 to-secondary/10 border-secondary/30',
                            'from-accent/20 to-accent/10 border-accent/30',
                        ];
                        const colorClass = colors[index % 3];
                        
                        return (
                            <div 
                                key={index} 
                                className={`aspect-square rounded-xl xl:rounded-2xl bg-gradient-to-br ${colorClass} backdrop-blur-sm border flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group relative overflow-hidden cursor-pointer`}
                                style={{
                                    animation: `float 6s ease-in-out infinite`,
                                    animationDelay: `${delay}s`
                                }}
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                
                                {/* Icon - visible by default, hidden on hover */}
                                <Icon className={`size-4 xl:size-5 ${index % 3 === 0 ? 'text-primary/70 group-hover:text-primary' : index % 3 === 1 ? 'text-secondary/70 group-hover:text-secondary' : 'text-accent/70 group-hover:text-accent'} transition-all duration-300 relative z-10 group-hover:opacity-0 group-hover:scale-90`} />
                                
                                {/* Text - hidden by default, visible on hover */}
                                <div className="absolute inset-0 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <span className={`text-[10px] xl:text-xs font-medium text-center leading-tight ${index % 3 === 0 ? 'text-primary' : index % 3 === 1 ? 'text-secondary' : 'text-accent'}`}>
                                        {iconLabels[index]}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="space-y-2 text-center w-full">
                    {/* Enhanced title with glow effect */}
                    <div className="relative">
                        <h2 className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight relative z-10">
                            {title}
                        </h2>
                        <div className="absolute inset-0 text-2xl xl:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent opacity-30 blur-sm">
                            {title}
                        </div>
                    </div>
                    
                    <p className="text-base-content/70 text-sm xl:text-base leading-relaxed max-w-sm mx-auto px-4">
                        {subtitle}
                    </p>
                    

                </div>
            </div>
        </div>
    );
};

export default AuthImagePattern;