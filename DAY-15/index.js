const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

function loggingMiddleware(req, res, next) {
    const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

    const timestamp = new Date().toISOString();

    logStream.write(`[${timestamp}] ${req.method} ${req.url}\n`);
    logStream.write(`Headers: ${JSON.stringify(req.headers)}\n`);
    
    logStream.end();

    next();
}

app.use(loggingMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});