// src/components/WalletStatus.jsx
import React from 'react';
import { formatAddress } from '../utils/walletUtils';

const WalletStatus = ({ account, chainId, networkName, error }) => {
  // If not connected, return empty
  if (!account) {
    return null;
  }

  // Network status indicator
  const getNetworkIndicator = () => {
    // Mainnet
    if (chainId === '0x1') {
      return <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>;
    }
    
    // Testnets
    if (chainId === '0x5' || chainId === '0xaa36a7' || chainId === '0x13881') {
      return <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>;
    }
    
    // Unknown/other networks
    return <span className="inline-block w-3 h-3 rounded-full bg-gray-500 mr-2"></span>;
  };

  return (
    <div className="wallet-card bg-white">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Wallet Connected</h3>
        <div className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
          Active
        </div>
      </div>
      
      <div className="mt-3 space-y-2">
        {/* Account address */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Address:</span>
          <div className="flex items-center">
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
              {formatAddress(account)}
            </code>
            <button 
              onClick={() => navigator.clipboard.writeText(account)}
              className="ml-2 text-gray-500 hover:text-gray-700"
              title="Copy address"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Network */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Network:</span>
          <div className="flex items-center">
            {getNetworkIndicator()}
            <span className="text-sm font-medium">
              {networkName}
            </span>
          </div>
        </div>
      </div>

      {/* Error message if any */}
      {error && (
        <div className="mt-3 p-2 bg-red-50 text-red-700 text-sm rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default WalletStatus;