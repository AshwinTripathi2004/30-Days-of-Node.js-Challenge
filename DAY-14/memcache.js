const cache = require('memory-cache');

/**
 * Caching middleware for Express using memory-cache
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cachingMiddleware(req, res, next) {
  const { url } = req;
  const cachedResponse = cache.get(url);

  if (cachedResponse) {
    res.send(cachedResponse);
    return;
  }

  // Override res.send to cache response before sending
  res.sendResponse = res.send;
  res.send = (body) => {
    // Cache the response with expiration time
    cache.put(url, body, 5 * 60 * 1000); // 5 minutes expiration time
    res.sendResponse(body);
  };

  next();
}

// Example usage:
const express = require('express');
const app = express();

app.use(cachingMiddleware);

app.get('/api/data', (req, res) => {
  // Simulate a delay in response
  setTimeout(() => {
    res.send('Here is the Cached data!!!!');
  }, 1000);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});