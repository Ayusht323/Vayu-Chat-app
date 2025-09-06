import { MessageSquare, Users, Heart, Zap } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-b from-base-100/50 to-base-200/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-md text-center space-y-8 relative z-10">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="relative">
            {/* Floating background icons */}
            <div className="absolute -left-12 -top-8 text-primary/20">
              <Users className="w-8 h-8" style={{ animation: 'float 6s ease-in-out infinite' }} />
            </div>
            <div className="absolute -right-12 -top-8 text-secondary/20">
              <Heart className="w-6 h-6" style={{ animation: 'float 6s ease-in-out infinite 2s' }} />
            </div>
            <div className="absolute -right-8 bottom-0 text-primary/20">
              <Zap className="w-5 h-5" style={{ animation: 'float 6s ease-in-out infinite 4s' }} />
            </div>
            
            {/* Main icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl blur-xl opacity-50 animate-pulse" />
              <div
                className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center
               justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300"
              >
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to Vayu!
          </h2>
          <p className="text-base-content/70 text-lg">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>

        {/* Feature highlights */}
        <div className="flex gap-8 justify-center mt-12 text-base-content/50">
          <div className="flex flex-col items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs">Real-time</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span className="text-xs">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <span className="text-xs">Fast</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;