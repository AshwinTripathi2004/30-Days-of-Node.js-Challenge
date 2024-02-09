const express = require('express');
const app = express();

// Define the route handler for the positive integer endpoint
function positiveIntegerHandler(req, res) {
  const number = parseInt(req.query.number);
  if (!isNaN(number) && number > 0) {
    res.send('Success! Number is a positive integer.');
  } else {
    throw new Error('Number must be a positive integer.');
  }
}

// Define the error handling middleware
function errorHandler(err, req, res, next) {
  if (err.message === 'Number must be a positive integer.') {
    res.status(400).send('Error: Number must be a positive integer.');
  } else {
    next(err); // Forward the error to the default error handler
  }
}

// Apply the error handling middleware
app.use(errorHandler);

// Define the route for the positive integer endpoint
app.get('/positive', positiveIntegerHandler);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/positive?number=780`);
});