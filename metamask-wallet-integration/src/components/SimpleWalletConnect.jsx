// src/components/SimpleWalletConnect.jsx
import React, { useState } from 'react';

const SimpleWalletConnect = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const checkIfWalletIsConnected = async () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      setError("Please install MetaMask to connect your wallet");
      return;
    }

    try {
      // Check if we're authorized to access the user's wallet
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        console.log("Found an authorized account:", accounts[0]);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while checking wallet connection");
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (!window.ethereum) {
        setError("Please install MetaMask to connect your wallet");
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected to account:", accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      
      if (error.code === 4001) {
        // User rejected the request
        setError("Please connect to MetaMask to continue");
      } else {
        setError("Error connecting to wallet. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-4">
          Wallet Connection
        </div>
        
        {account ? (
          <div>
            <p className="text-gray-700 mb-4">
              Connected: <span className="font-bold">{formatAddress(account)}</span>
            </p>
            <button
              onClick={disconnectWallet}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 mb-4">
              Please connect your wallet to continue
            </p>
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          </div>
        )}
        
        {error && (
          <div className="text-red-500 mt-4">{error}</div>
        )}
      </div>
    </div>
  );
};

export default SimpleWalletConnect;