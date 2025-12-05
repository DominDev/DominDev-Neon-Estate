/**
 * ===========================================
 * RATE LIMITING MIDDLEWARE
 * ===========================================
 *
 * Protects API endpoints from abuse by limiting requests per IP.
 * Uses express-rate-limit for efficient in-memory rate limiting.
 */

import rateLimit from 'express-rate-limit';
import config from '../config/env.js';

/**
 * Rate limiter for AI generation endpoint
 * More restrictive due to costly API calls
 */
export const aiGenerationLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs, // Time window in ms
  max: config.rateLimit.maxRequests, // Max requests per window
  message: {
    success: false,
    error: 'Zbyt wiele zapytań. Spróbuj ponownie za chwilę.',
    retryAfter: Math.ceil(config.rateLimit.windowMs / 1000 / 60), // minutes
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  handler: (req, res) => {
    console.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: 'Zbyt wiele zapytań. Spróbuj ponownie za chwilę.',
      retryAfter: Math.ceil(config.rateLimit.windowMs / 1000 / 60),
    });
  },
  skip: (req) => {
    // Skip rate limiting in development for testing (optional)
    return config.server.isDevelopment && req.ip === '127.0.0.1';
  },
});

/**
 * General rate limiter for all endpoints
 * More permissive than AI-specific limiter
 */
export const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: {
    success: false,
    error: 'Zbyt wiele zapytań. Spróbuj ponownie za chwilę.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default {
  aiGenerationLimiter,
  generalLimiter,
};
