// src/App.jsx - Simplified version
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleWalletConnect from './components/SimpleWalletConnect';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <svg 
                className="h-8 w-8 text-indigo-600" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <h1 className="ml-2 text-xl font-bold text-gray-900">Token Launcher</h1>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center py-12 bg-white rounded-lg shadow-sm mb-6">
            <svg 
              className="mx-auto h-20 w-20 text-indigo-500" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">Welcome to Token Launcher</h2>
            <p className="mt-2 text-gray-600 max-w-lg mx-auto">
              Connect your MetaMask wallet to create and manage your tokens. Secure, fast, and intuitive.
            </p>
          </div>
          
          {/* Simple Wallet Connect Component */}
          <SimpleWalletConnect />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Token Launcher Demo. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;