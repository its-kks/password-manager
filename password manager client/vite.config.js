import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Access environment variables from process.env
const { VITE_SERVER, VITE_API_KEY } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_SERVER': JSON.stringify(VITE_SERVER),
    'import.meta.env.VITE_API_KEY': JSON.stringify(VITE_API_KEY),
  },
});
