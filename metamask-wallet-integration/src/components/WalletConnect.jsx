// src/components/WalletConnect.jsx
import React from 'react';

const WalletConnect = ({ 
  isConnected, 
  isConnecting, 
  isMetaMaskAvailable,
  onConnect, 
  onDisconnect 
}) => {
  // Render MetaMask install prompt if not available
  if (!isMetaMaskAvailable) {
    return (
      <div className="wallet-card bg-yellow-50">
        <h3 className="font-medium text-yellow-800">MetaMask Not Detected</h3>
        <p className="mt-2 text-sm text-yellow-700">
          To connect your wallet, please install the MetaMask extension.
        </p>
        <a 
          href="https://metamask.io/download/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary mt-3 inline-block"
        >
          Install MetaMask
        </a>
      </div>
    );
  }

  // Render connect/disconnect button based on connection state
  return (
    <div>
      {isConnected ? (
        <button 
          onClick={onDisconnect}
          className="btn bg-red-500 text-white hover:bg-red-600 flex items-center"
          disabled={isConnecting}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 0v4h12V4H4zm-1 7a1 1 0 011-1h12a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm1 0v4h12v-4H4z" clipRule="evenodd" />
          </svg>
          Disconnect Wallet
        </button>
      ) : (
        <button 
          onClick={onConnect}
          className="btn btn-primary flex items-center"
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <svg 
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Connecting...
            </>
          ) : (
            <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Connect Wallet
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;