/**
 * ===========================================
 * HTML SANITIZATION UTILITY
 * ===========================================
 *
 * Server-side HTML sanitization using DOMPurify with jsdom.
 * Protects against XSS attacks in AI-generated content.
 *
 * SECURITY: This is critical for preventing malicious HTML/JS injection
 * from AI responses before sending to frontend.
 */

import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

// Create DOMPurify instance with jsdom window
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Sanitizes HTML content to prevent XSS attacks
 *
 * @param {string} dirty - Potentially unsafe HTML content
 * @returns {string} - Sanitized HTML safe for rendering
 *
 * @example
 * const userInput = '<script>alert("xss")</script><p>Safe text</p>';
 * const clean = sanitizeHTML(userInput);
 * // Returns: '<p>Safe text</p>'
 */
export function sanitizeHTML(dirty) {
  if (typeof dirty !== 'string') {
    console.warn('sanitizeHTML received non-string input:', typeof dirty);
    return '';
  }

  // Configure DOMPurify with strict settings
  const cleanHTML = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'span', 'div'
    ],
    ALLOWED_ATTR: ['style', 'class'],
    ALLOWED_STYLES: {
      '*': {
        'color': [/^#[0-9a-fA-F]{3,6}$/, /^rgb\(/, /^var\(/],
        'font-weight': [/^\d{3}$/, /^(normal|bold|bolder|lighter)$/],
        'text-align': [/^(left|right|center|justify)$/],
        'font-size': [/^[\d.]+em$/, /^[\d.]+rem$/, /^[\d.]+px$/],
        'display': [/^(block|inline|inline-block|flex|grid|none)$/],
        'margin-top': [/^[\d.]+em$/, /^[\d.]+rem$/, /^[\d.]+px$/],
        'margin-bottom': [/^[\d.]+em$/, /^[\d.]+rem$/, /^[\d.]+px$/],
        'letter-spacing': [/^[\d.]+px$/],
      }
    },
    KEEP_CONTENT: true, // Keep text content even if tags are removed
    ALLOW_DATA_ATTR: false, // Block data-* attributes
    ALLOW_UNKNOWN_PROTOCOLS: false, // Block javascript:, data: etc.
    SAFE_FOR_TEMPLATES: true, // Extra safe for template rendering
  });

  return cleanHTML;
}

/**
 * Sanitizes plain text by escaping HTML entities
 *
 * @param {string} text - Plain text to escape
 * @returns {string} - Text with HTML entities escaped
 */
export function escapeHTML(text) {
  if (typeof text !== 'string') return '';

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates and sanitizes Markdown-style formatting
 * Converts safe Markdown to HTML with sanitization
 *
 * @param {string} markdown - Markdown text
 * @returns {string} - Sanitized HTML
 */
export function sanitizeMarkdown(markdown) {
  if (typeof markdown !== 'string') return '';

  // Simple markdown conversion with proper handling
  let html = markdown
    // Remove markdown headers (###, ##, #) but keep the text
    .replace(/^###\s+(.+)$/gm, '$1')
    .replace(/^##\s+(.+)$/gm, '$1')
    .replace(/^#\s+(.+)$/gm, '$1')
    // Section headers: **Wizja:** -> styled section header with spacing
    .replace(/\*\*([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż\s&]+):\*\*/g,
      '<br><strong style="color:var(--accent-neon); font-size: 1.15em; display: block; margin-top: 1.5em; margin-bottom: 0.5em; letter-spacing: 0.5px;">$1:</strong>')
    // Bold (remaining): **text** -> <strong>
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--accent-neon)">$1</strong>')
    // Convert newlines to <br> tags
    .replace(/\n/g, '<br>');

  // Sanitize the converted HTML
  return sanitizeHTML(html);
}

export default {
  sanitizeHTML,
  escapeHTML,
  sanitizeMarkdown,
};
