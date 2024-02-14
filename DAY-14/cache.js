const cache = {}; // In-memory cache object

/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cachingMiddleware(req, res, next) {
  const { url } = req;
  const cachedResponse = cache[url];

  if (cachedResponse) {
    const { data, expirationTime } = cachedResponse;
    if (expirationTime > Date.now()) {
      // If cached response is not expired, return it
      res.send(data);
      return;
    } else {
      // If cached response is expired, remove it from cache
      delete cache[url];
    }
  }

  // If no cached response found or expired, proceed with normal route handling
  res.sendResponse = res.send;
  res.send = (body) => {
    // Cache the response with expiration time
    const expirationTime = Date.now() + (5 * 60 * 1000); // 5 minutes expiration time
    cache[url] = { data: body, expirationTime };
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
    res.send('Cached data!!!!');
  }, 1000);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});