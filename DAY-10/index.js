const express = require('express');

const path = require('path');

const app = express();

const PORT = 3000; // You can choose any available port

// Set the public directory to serve static files
app.get("/",(req, res)=> {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
// Route for the root ("/") to return the "index.html" file
app.get("/styles/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public/styles/style.css"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});