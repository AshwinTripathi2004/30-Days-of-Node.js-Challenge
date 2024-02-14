const WebSocket = require('ws');
const express = require('express');
const http = require('http');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message) {
      console.log('Received: %s', message);
      ws.send(message); // Echo back the message to the client
    });

    ws.on('close', function close() {
      console.log('Client disconnected');
    });
  });
}

const app = express();
const server = http.createServer(app);

setupWebSocket(server);

app.get('/websocket', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});