/**
 * ===========================================
 * AI ATELIER ROUTES
 * ===========================================
 *
 * Endpoints for AI-powered architectural concept generation.
 * Integrates with Google Gemini API for content generation.
 */

import express from 'express';
import config from '../config/env.js';
import { postJSON } from '../utils/http-client.js';
import { sanitizeMarkdown } from '../utils/sanitizer.js';
import { aiGenerationLimiter } from '../middleware/rate-limiter.js';
import { validateConceptRequest, requireJSON } from '../middleware/validator.js';
import { asyncHandler } from '../middleware/error-handler.js';

const router = express.Router();

/**
 * POST /api/ai-atelier/generate-concept
 *
 * Generates an architectural concept using AI based on user input.
 *
 * Request Body:
 * {
 *   "projectType": string (required, max 100 chars) - Type of project
 *   "location": string (required, max 100 chars) - Project location
 *   "description": string (required, 10-1000 chars) - User's vision/requirements
 * }
 *
 * Response (Success):
 * {
 *   "success": true,
 *   "data": {
 *     "concept": string - Sanitized HTML concept
 *     "generatedAt": string - ISO timestamp
 *   }
 * }
 *
 * Response (Error):
 * {
 *   "success": false,
 *   "error": string - User-friendly error message
 * }
 */
router.post(
  '/generate-concept',
  aiGenerationLimiter, // Rate limiting
  requireJSON, // Validate content type
  validateConceptRequest, // Validate and sanitize input
  asyncHandler(async (req, res) => {
    const { projectType, location, description } = req.body;

    // Build user prompt
    const userPrompt = `Typ projektu: ${projectType}\nLokalizacja: ${location}\nWizja klienta: ${description}`;

    // System prompt - same as original, defines the AI's persona and output format
    const systemPrompt = `Jesteś architektem Neon.Estate, mistrzem stylu 'Quiet Luxury'.

Stwórz ekskluzywny, poetycki koncept architektoniczny. WAŻNE: Odpowiedź musi być zwięzła i malownicza, z subtelnymi akcentami technicznymi.

Format (Markdown **pogrubienia**):

**Wizja:**
Jedno poetyckie zdanie - metafora przestrzeni i emocji, które wzbudza.

**Palette:**
Wymień 3-4 luksusowe materiały z pełnymi nazwami (np. "marmur Calacatta Oro", "dąb wędzony bielony").
Dodaj JEDNO krótkie zdanie o tym, jak współgrają.

**Światło & Technologia:**
Maksymalnie 2 zdania: naturalne światło + oświetlenie architektoniczne + niewidzialna integracja smart home (BEZ szczegółów technicznych jak CCT, lux, Hz - tylko poetycki opis funkcji: "sterowanie scenami świetlnymi", "automatyka klimatu").

Ton: Elitarny, malowniczy, z subtelną wzmianką o technologii (NIE specyfikacja techniczna!).

${userPrompt}`;

    // Build Gemini API URL
    const apiUrl = `${config.gemini.baseUrl}/${config.gemini.model}:generateContent?key=${config.gemini.apiKey}`;

    console.log(`[AI Atelier] Generating concept for: ${projectType} in ${location}`);

    // Call Gemini API with timeout
    const data = await postJSON(
      apiUrl,
      {
        contents: [
          {
            parts: [{ text: systemPrompt }],
          },
        ],
      },
      config.gemini.timeout
    );

    // Extract AI response
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    // Sanitize response with DOMPurify (XSS protection)
    const sanitizedConcept = sanitizeMarkdown(aiResponse);

    console.log(`[AI Atelier] Concept generated successfully (${sanitizedConcept.length} chars)`);

    // Return sanitized response
    res.json({
      success: true,
      data: {
        concept: sanitizedConcept,
        generatedAt: new Date().toISOString(),
      },
    });
  })
);

/**
 * GET /api/ai-atelier/health
 *
 * Health check endpoint to verify API is working
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'operational',
    timestamp: new Date().toISOString(),
    geminiModel: config.gemini.model,
  });
});

export default router;
