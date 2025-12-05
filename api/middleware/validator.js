/**
 * ===========================================
 * INPUT VALIDATION MIDDLEWARE
 * ===========================================
 *
 * Validates and sanitizes request input before processing.
 * Prevents injection attacks and ensures data integrity.
 */

/**
 * Validates AI concept generation request body
 */
export function validateConceptRequest(req, res, next) {
  const { projectType, location, description } = req.body;

  // Collect validation errors
  const errors = [];

  // Validate projectType
  if (!projectType || typeof projectType !== 'string') {
    errors.push('Pole "projectType" jest wymagane i musi być tekstem.');
  } else if (projectType.length > 100) {
    errors.push('Pole "projectType" jest zbyt długie (max 100 znaków).');
  }

  // Validate location
  if (!location || typeof location !== 'string') {
    errors.push('Pole "location" jest wymagane i musi być tekstem.');
  } else if (location.length > 100) {
    errors.push('Pole "location" jest zbyt długie (max 100 znaków).');
  }

  // Validate description
  if (!description || typeof description !== 'string') {
    errors.push('Pole "description" jest wymagane i musi być tekstem.');
  } else if (description.length < 10) {
    errors.push('Opis musi mieć co najmniej 10 znaków.');
  } else if (description.length > 1000) {
    errors.push('Opis jest zbyt długi (max 1000 znaków).');
  }

  // If there are errors, return 400
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Nieprawidłowe dane wejściowe.',
      details: errors,
    });
  }

  // Sanitize inputs (basic XSS prevention)
  req.body.projectType = sanitizeInput(projectType);
  req.body.location = sanitizeInput(location);
  req.body.description = sanitizeInput(description);

  next();
}

/**
 * Basic input sanitization
 * Removes potentially dangerous characters
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove control characters except newlines and tabs
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Limit consecutive whitespace
    .replace(/\s+/g, ' ');
}

/**
 * Validates content type is JSON
 */
export function requireJSON(req, res, next) {
  const contentType = req.headers['content-type'];

  if (!contentType || !contentType.includes('application/json')) {
    return res.status(415).json({
      success: false,
      error: 'Content-Type musi być application/json',
    });
  }

  next();
}

export default {
  validateConceptRequest,
  requireJSON,
};
