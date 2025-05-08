// src/hooks/useWallet.js - Updated for ethers v6
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { 
  isMetaMaskInstalled, 
  getProvider, 
  getMetaMaskErrorMessage,
  getNetworkName 
} from '../utils/walletUtils';

const useWallet = () => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(false);

  // Initialize - check if MetaMask is available
  useEffect(() => {
    setIsMetaMaskAvailable(isMetaMaskInstalled());
  }, []);

  // Fetch balance for connected account
  const fetchBalance = useCallback(async () => {
    if (!account) return;
    
    try {
      const provider = getProvider();
      if (!provider) return;
      
      const balanceWei = await provider.getBalance(account);
      setBalance(balanceWei);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setError('Failed to fetch balance');
    }
  }, [account]);

  // Setup event listeners for wallet changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        setAccount(null);
        setBalance(null);
        setError(null);
        toast.info('Wallet disconnected');
      } else if (accounts[0] !== account) {
        // Account changed
        setAccount(accounts[0]);
        toast.success('Account changed');
      }
    };

    const handleChainChanged = (newChainId) => {
      setChainId(newChainId);
      toast.info(`Network changed to ${getNetworkName(newChainId)}`);
      // Reload page on chain change as recommended by MetaMask
      window.location.reload();
    };

    const handleDisconnect = (error) => {
      console.log('MetaMask disconnected', error);
      setAccount(null);
      setBalance(null);
      toast.error('MetaMask disconnected');
    };

    // Subscribe to events
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('disconnect', handleDisconnect);

    // Get initial chain ID
    window.ethereum.request({ method: 'eth_chainId' })
      .then((id) => setChainId(id))
      .catch(console.error);

    // Clean up listeners
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
      window.ethereum.removeListener('disconnect', handleDisconnect);
    };
  }, [account]);

  // Update balance when account changes
  useEffect(() => {
    if (account) {
      fetchBalance();
    }
  }, [account, fetchBalance]);

  // Connect wallet function
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed');
      toast.error('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const provider = getProvider();
      
      // In ethers v6, we connect differently
      const accounts = await provider.send("eth_requestAccounts", []);
      
      // Get current chain ID
      const networkChainId = await provider.send("eth_chainId", []);
      setChainId(networkChainId);
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        toast.success('Wallet connected successfully');
      } else {
        setError('No accounts found');
        toast.error('No accounts found. Please create an account in MetaMask.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      const errorMessage = getMetaMaskErrorMessage(error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    // Note: MetaMask doesn't have a real "disconnect" method
    // We can only clear our app state
    setAccount(null);
    setBalance(null);
    toast.info('Wallet disconnected from app');
  };

  // Refresh balance manually
  const refreshBalance = () => {
    fetchBalance();
  };

  return {
    account,
    balance,
    chainId,
    isConnecting,
    error,
    isMetaMaskAvailable,
    connectWallet,
    disconnectWallet,
    refreshBalance,
    networkName: chainId ? getNetworkName(chainId) : null,
  };
};

export default useWallet;