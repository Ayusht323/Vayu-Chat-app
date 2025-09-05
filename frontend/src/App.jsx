import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'
import { useChatStore } from './store/useChatStore'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme} = useThemeStore();
  const { resetState } = useChatStore();
  
  useEffect(() => {
    checkAuth();
  }, []);
  
  // Reset chat state when user logs out
  useEffect(() => {
    if (!authUser) {
      resetState();
    }
  }, [authUser, resetState]);
  
  useEffect(() => {
    // Apply theme to HTML element on mount and when theme changes
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex justify-center items-center h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-100'>
        <div className='text-center space-y-4'>
          <Loader className='size-12 animate-spin text-primary mx-auto' />
          <p className='text-base-content/70 font-medium'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col" >
      <Navbar />      
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: 'green',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </div>
  )
}

export default App