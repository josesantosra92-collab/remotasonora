import { Base44Client } from '@base44/sdk';

export const base44 = new Base44Client({
  appId: import.meta.env.VITE_BASE44_APP_ID,
  apiKey: import.meta.env.VITE_BASE44_API_KEY,
});
