import Bytez from 'bytez.js';

const bytezApiKey = import.meta.env.VITE_BYTEZ_API_KEY;

if (!bytezApiKey) {
  console.warn('Bytez API key not found. AI features will use fallback templates.');
}

let bytezInstance: Bytez | null = null;

export function getBytezClient(): Bytez | null {
  if (!bytezApiKey || bytezApiKey === 'your_bytez_api_key_here') {
    return null;
  }

  if (!bytezInstance) {
    bytezInstance = new Bytez(bytezApiKey);
  }

  return bytezInstance;
}

export function isBytezAvailable(): boolean {
  return bytezApiKey !== undefined && bytezApiKey !== 'your_bytez_api_key_here';
}
