/**
 * ===========================================
 * ENVIRONMENT CONFIGURATION
 * ===========================================
 *
 * Centralized configuration management for environment variables.
 * Validates required variables and provides defaults where appropriate.
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '..', '.env');

dotenv.config({ path: envPath });

/**
 * Validates that required environment variables are present
 * @throws {Error} If required variables are missing
 */
function validateEnv() {
  const required = ['GEMINI_API_KEY'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please copy .env.example to .env and fill in the values.'
    );
  }
}

// Validate on import
validateEnv();

/**
 * Application configuration object
 */
export const config = {
  // Gemini API
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash-preview-09-2025',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    timeout: parseInt(process.env.GEMINI_TIMEOUT_MS || '30000', 10),
  },

  // Server
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV !== 'production',
    isProduction: process.env.NODE_ENV === 'production',
  },

  // CORS
  cors: {
    origins: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
      : ['http://localhost:5500', 'http://127.0.0.1:5500'],
  },

  // Rate Limiting
  rateLimit: {
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  },

  // Security
  security: {
    apiSecret: process.env.API_SECRET || 'default-secret-change-in-production',
  },
};

export default config;
