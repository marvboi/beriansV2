// Import addresses as string and split into array
import { addresses } from './addresses';

// Helper function to normalize addresses
const normalizeAddress = (addr: string): string => {
  return addr.toLowerCase().trim().replace(/\s+/g, '');
};

// Convert the raw addresses string into a Set for efficient lookups
const addressArray = addresses
  .split('\n')
  .map(addr => normalizeAddress(addr))
  .filter(addr => addr.length > 0);

export const whitelistedAddresses = new Set(addressArray);

// Helper function to validate and normalize input addresses
export const isValidAddress = (address: string): boolean => {
  const normalized = normalizeAddress(address);
  return normalized.startsWith('0x') && normalized.length >= 40;
};

// Log whitelist size for verification
console.log(`Total whitelisted addresses: ${whitelistedAddresses.size}`);