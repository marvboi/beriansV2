import React, { useState, useEffect } from 'react';
import { whitelistedAddresses, isValidAddress } from './whitelist';

function App() {
  const [address, setAddress] = useState('');
  const [checkResult, setCheckResult] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const checkEligibility = () => {
    // Reset previous states
    setError(null);
    setCheckResult(null);

    // Validate address format
    if (!address) {
      setError('Please enter an address');
      return;
    }

    const cleanAddress = address.toLowerCase().trim();
    if (!isValidAddress(cleanAddress)) {
      setError('Please enter a valid Ethereum address');
      return;
    }

    // Check whitelist using normalized address
    const isEligible = whitelistedAddresses.has(cleanAddress);
    setCheckResult(isEligible);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-brown-200 flex flex-col items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-6">
          <img 
            src="https://i.ibb.co/zHt2YL7B/beanie-bear-2-0.png" 
            alt="Berians Logo" 
            className="w-24 h-24 animate-bounce"
          />
          <h1 className="text-4xl font-bold text-brown-100">Berians</h1>
          <div className="mt-4 w-12 h-12 border-4 border-brown-400 border-t-brown-100 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-brown-200 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-brown-900/50 p-6">
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="flex items-center gap-2">
            <img 
              src="https://i.ibb.co/zHt2YL7B/beanie-bear-2-0.png" 
              alt="Berians Logo" 
              className="w-8 h-8"
            />
            <h1 className="text-2xl font-bold text-brown-100">Berians</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl w-full mx-auto mt-20 p-6">
        <div className="bg-brown-900/20 p-8 rounded-lg border border-brown-800">
          <h2 className="text-3xl font-bold text-brown-100 mb-6 text-center">
            Whitelist Checker
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="address" className="block text-brown-400">
                Enter your wallet address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 rounded-lg bg-black border border-brown-800 text-brown-100 placeholder-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-600"
              />
            </div>

            <button
              onClick={checkEligibility}
              className="w-full py-3 px-4 bg-brown-800 hover:bg-brown-700 text-brown-100 rounded-lg transition-colors"
            >
              Check Eligibility
            </button>

            {error && (
              <div className="mt-4 p-4 rounded-lg bg-red-900/40 border border-red-800 text-red-200">
                ❌ {error}
              </div>
            )}

            {checkResult !== null && !error && (
              <div className={`mt-4 p-4 rounded-lg ${
                checkResult 
                  ? 'bg-brown-900/40 border border-brown-700 text-brown-100' 
                  : 'bg-red-900/40 border border-red-800 text-red-200'
              }`}>
                {checkResult 
                  ? '🎉 Congratulations! Your address is whitelisted' 
                  : '❌ Sorry, this address is not whitelisted'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 w-full bg-brown-900/50 p-4">
        <div className="max-w-4xl mx-auto text-center text-brown-400">
          <a 
            href="https://x.com/beania_eth" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-brown-200 transition-colors"
          >
            Berians
          </a> © 2025 | Whitelist Checker
        </div>
      </div>
    </div>
  );
}

export default App;