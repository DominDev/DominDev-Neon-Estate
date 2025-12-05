/**
 * ===========================================
 * NEON ESTATE - BACKEND SERVER
 * ===========================================
 *
 * Express server for AI Atelier backend API.
 * Provides secure endpoint for AI-powered architectural concept generation.
 *
 * DEPLOYMENT INSTRUCTIONS:
 *
 * 1. LOCAL DEVELOPMENT:
 *    - Copy .env.example to .env and fill in GEMINI_API_KEY
 *    - Run: npm install
 *    - Run: npm run dev (with auto-reload)
 *    - Server will run on http://localhost:3000
 *
 * 2. PRODUCTION (Vercel):
 *    - Install Vercel CLI: npm i -g vercel
 *    - Run: vercel (follow prompts)
 *    - Set environment variables in Vercel dashboard:
 *      * GEMINI_API_KEY
 *      * NODE_ENV=production
 *      * ALLOWED_ORIGINS=https://neon-estate.com
 *    - Deploy: vercel --prod
 *
 * 3. PRODUCTION (Other platforms - Heroku, Railway, etc):
 *    - Push code to Git repository
 *    - Connect repository to hosting platform
 *    - Set environment variables in platform dashboard
 *    - Platform will auto-detect Node.js and run `npm start`
 *
 * 4. FRONTEND INTEGRATION:
 *    - Update frontend to point to your deployed backend URL
 *    - Change API_BASE_URL in main.js to your backend domain
 *    - Example: const API_BASE_URL = 'https://your-backend.vercel.app';
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/env.js';
import aiAtelierRouter from './routes/ai-atelier.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import { generalLimiter } from './middleware/rate-limiter.js';

// Initialize Express app
const app = express();

// ===========================================
// SECURITY MIDDLEWARE
// ===========================================

// Helmet - Sets security-related HTTP headers
app.use(helmet({
  contentSecurityPolicy: config.server.isProduction ? undefined : false, // Disable CSP in dev
  crossOriginEmbedderPolicy: false, // Allow cross-origin requests
}));

// CORS - Configure allowed origins
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Check if origin is in allowed list
    if (config.cors.origins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  maxAge: 86400, // 24 hours
}));

// General rate limiting for all routes
app.use(generalLimiter);

// Body parser middleware
app.use(express.json({ limit: '10kb' })); // Limit body size for security
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ===========================================
// LOGGING MIDDLEWARE
// ===========================================

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// ===========================================
// ROUTES
// ===========================================

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Neon Estate Backend API',
    version: '1.0.0',
    status: 'operational',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/ai-atelier', aiAtelierRouter);

// ===========================================
// ERROR HANDLING
// ===========================================

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Global error handler - must be last
app.use(errorHandler);

// ===========================================
// START SERVER
// ===========================================

const PORT = config.server.port;

app.listen(PORT, () => {
  console.log('\n===========================================');
  console.log('🎨 NEON ESTATE - Backend Server');
  console.log('===========================================');
  console.log(`Environment: ${config.server.env}`);
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log(`Gemini Model: ${config.gemini.model}`);
  console.log(`CORS Origins: ${config.cors.origins.join(', ')}`);
  console.log('===========================================\n');
  console.log('📡 Available Endpoints:');
  console.log(`  GET  /                                - Health check`);
  console.log(`  POST /api/ai-atelier/generate-concept - Generate AI concept`);
  console.log(`  GET  /api/ai-atelier/health           - API health check`);
  console.log('\n===========================================\n');

  if (config.server.isDevelopment) {
    console.log('💡 Development Tips:');
    console.log('  - Frontend should connect to: http://localhost:3000');
    console.log('  - Use Live Server or similar for frontend on port 5500');
    console.log('  - Rate limiting is relaxed for localhost');
    console.log('\n===========================================\n');
  }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully...');
  process.exit(0);
});

export default app;
