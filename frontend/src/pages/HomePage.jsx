import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'


const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-100">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)] border border-base-300/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
          <div className="flex h-full rounded-2xl overflow-hidden relative">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage