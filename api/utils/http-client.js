/**
 * ===========================================
 * HTTP CLIENT WITH TIMEOUT & ABORT CONTROLLER
 * ===========================================
 *
 * Wrapper for fetch with built-in timeout and error handling.
 * Prevents hanging requests and provides consistent error responses.
 */

/**
 * Fetch with automatic timeout using AbortController
 *
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} timeout - Timeout in milliseconds (default: 30000)
 * @returns {Promise<Response>} - Fetch response
 * @throws {Error} - On timeout or network error
 *
 * @example
 * try {
 *   const response = await fetchWithTimeout('https://api.example.com', {
 *     method: 'POST',
 *     body: JSON.stringify(data)
 *   }, 5000);
 *   const data = await response.json();
 * } catch (error) {
 *   console.error('Request failed:', error.message);
 * }
 */
export async function fetchWithTimeout(url, options = {}, timeout = 30000) {
  // Create AbortController for timeout
  const controller = new AbortController();
  const { signal } = controller;

  // Set timeout
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    // Merge abort signal with options
    const response = await fetch(url, {
      ...options,
      signal,
    });

    // Clear timeout on success
    clearTimeout(timeoutId);

    return response;
  } catch (error) {
    // Clear timeout on error
    clearTimeout(timeoutId);

    // Check if error was caused by abort (timeout)
    if (error.name === 'AbortError') {
      const timeoutError = new Error(
        `Request timeout after ${timeout}ms: ${url}`
      );
      timeoutError.code = 'TIMEOUT';
      throw timeoutError;
    }

    // Re-throw other errors
    throw error;
  }
}

/**
 * POST JSON with timeout and error handling
 *
 * @param {string} url - The URL to POST to
 * @param {Object} data - JSON data to send
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Object>} - Parsed JSON response
 */
export async function postJSON(url, data, timeout = 30000) {
  const response = await fetchWithTimeout(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
    timeout
  );

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
    error.status = response.status;
    error.statusText = response.statusText;

    // Try to get error details from response body
    try {
      error.details = await response.json();
    } catch {
      error.details = await response.text();
    }

    throw error;
  }

  return response.json();
}

/**
 * Retry mechanism for failed requests
 *
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise<any>} - Result of successful request
 */
export async function retryRequest(fn, maxRetries = 3, delay = 1000) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt}/${maxRetries} failed:`, error.message);

      // Don't retry on client errors (4xx) except 429 (rate limit)
      if (error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const backoffDelay = delay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
    }
  }

  throw lastError;
}

export default {
  fetchWithTimeout,
  postJSON,
  retryRequest,
};
