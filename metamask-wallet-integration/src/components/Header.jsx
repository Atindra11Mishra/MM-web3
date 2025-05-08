// src/components/Header.jsx
import React from 'react';
import WalletConnect from './WalletConnect';
import { formatAddress } from '../utils/walletUtils';

const Header = ({ 
  account, 
  isConnecting, 
  isMetaMaskAvailable,
  connectWallet, 
  disconnectWallet 
}) => {
  const isConnected = !!account;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg 
                className="h-8 w-8 text-indigo-600" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="ml-2">
              <h1 className="text-xl font-bold text-gray-900">Token Launcher</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Status indicator for connected wallet */}
            {isConnected && (
              <div className="mr-4 flex items-center">
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                  <span>{formatAddress(account)}</span>
                </div>
              </div>
            )}
            
            {/* Connect/Disconnect button */}
            <WalletConnect 
              isConnected={isConnected}
              isConnecting={isConnecting}
              isMetaMaskAvailable={isMetaMaskAvailable}
              onConnect={connectWallet}
              onDisconnect={disconnectWallet}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;