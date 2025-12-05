/**
 * ===========================================
 * ERROR HANDLING MIDDLEWARE
 * ===========================================
 *
 * Centralized error handling for consistent error responses.
 * Logs errors and returns user-friendly messages.
 */

import config from '../config/env.js';

/**
 * Error logging utility
 */
function logError(error, req) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;

  console.error('\n=== API ERROR ===');
  console.error(`[${timestamp}] ${method} ${url}`);
  console.error(`IP: ${ip}`);
  console.error('Error:', error.message);
  if (error.stack && config.server.isDevelopment) {
    console.error('Stack:', error.stack);
  }
  console.error('================\n');
}

/**
 * Error handler middleware
 * Must be registered last in Express middleware chain
 */
export function errorHandler(err, req, res, next) {
  // Log the error
  logError(err, req);

  // Default error status and message
  let status = err.status || err.statusCode || 500;
  let message = 'Wystąpił błąd serwera. Spróbuj ponownie później.';

  // Handle specific error types
  if (err.code === 'TIMEOUT') {
    status = 504;
    message = 'Zapytanie przekroczyło limit czasu. Spróbuj ponownie.';
  } else if (err.name === 'ValidationError') {
    status = 400;
    message = 'Nieprawidłowe dane wejściowe.';
  } else if (err.status === 429) {
    status = 429;
    message = 'Zbyt wiele zapytań. Spróbuj ponownie za chwilę.';
  } else if (status === 401 || status === 403) {
    message = 'Brak autoryzacji.';
  } else if (status === 404) {
    message = 'Nie znaleziono zasobu.';
  }

  // In development, include more details
  const response = {
    success: false,
    error: message,
  };

  if (config.server.isDevelopment) {
    response.details = err.message;
    response.stack = err.stack;
  }

  res.status(status).json(response);
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: 'Endpoint nie istnieje.',
    path: req.originalUrl,
  });
}

/**
 * Async route wrapper to catch errors in async handlers
 * Usage: router.post('/endpoint', asyncHandler(async (req, res) => { ... }))
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default {
  errorHandler,
  notFoundHandler,
  asyncHandler,
};
