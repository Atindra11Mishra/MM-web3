// src/utils/walletUtils.js - Updated for ethers v6
import { ethers } from 'ethers';

/**
 * Check if MetaMask is installed
 * @returns {boolean} True if MetaMask is installed
 */
export const isMetaMaskInstalled = () => {
  return window.ethereum && window.ethereum.isMetaMask;
};

/**
 * Get Ethereum provider
 * @returns {ethers.BrowserProvider|null} Ethereum provider or null if not available
 */
export const getProvider = () => {
  if (!isMetaMaskInstalled()) return null;
  // In ethers v6, we use BrowserProvider instead of Web3Provider
  return new ethers.BrowserProvider(window.ethereum);
};

/**
 * Format Ethereum address to display format (0x1234...5678)
 * @param {string} address Full Ethereum address
 * @returns {string} Shortened address
 */
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

/**
 * Format Ethereum balance from wei to ETH with 4 decimals
 * @param {string|number|bigint} balanceWei Balance in wei
 * @returns {string} Formatted balance in ETH
 */
export const formatBalance = (balanceWei) => {
  if (!balanceWei) return '0';
  // In ethers v6, we use formatEther from ethers.utils
  const balanceEth = ethers.formatEther(balanceWei);
  return parseFloat(balanceEth).toFixed(4);
};

/**
 * Get a human-readable error message from MetaMask errors
 * @param {Error} error Error object
 * @returns {string} Human-readable error message
 */
export const getMetaMaskErrorMessage = (error) => {
  // Common MetaMask error codes
  if (error.code === 4001) {
    return 'Transaction rejected by user';
  }
  
  if (error.code === -32002) {
    return 'MetaMask is already processing a request. Please wait.';
  }
  
  if (error.code === -32603) {
    return 'Internal error. Please try again.';
  }
  
  if (error.message && error.message.includes('user rejected')) {
    return 'You rejected the connection request';
  }
  
  if (error.message && error.message.includes('already pending')) {
    return 'A connection request is already pending. Please check MetaMask.';
  }
  
  // Fallback for other errors
  return error.message || 'Something went wrong. Please try again.';
};

/**
 * Switch to a specified network in MetaMask
 * @param {string} chainId Chain ID in hex format (e.g., "0x1" for Ethereum Mainnet)
 * @returns {Promise<boolean>} True if successful
 */
export const switchNetwork = async (chainId) => {
  if (!isMetaMaskInstalled()) throw new Error('MetaMask is not installed');
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
    return true;
  } catch (error) {
    // Error code 4902 means the chain hasn't been added to MetaMask
    if (error.code === 4902) {
      throw new Error('This network is not available in your MetaMask, please add it first');
    }
    throw error;
  }
};

/**
 * Get chain name from chain ID
 * @param {string} chainId Chain ID
 * @returns {string} Network name
 */
export const getNetworkName = (chainId) => {
  const networks = {
    '0x1': 'Ethereum Mainnet',
    '0x5': 'Goerli Testnet',
    '0xaa36a7': 'Sepolia Testnet',
    '0x89': 'Polygon Mainnet',
    '0x13881': 'Mumbai Testnet',
    '0xa4b1': 'Arbitrum',
    '0xa': 'Optimism',
  };
  
  return networks[chainId] || `Chain ID: ${chainId}`;
};