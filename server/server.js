const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  socket.emit('message', 'Bem-vindo ao servidor WebSocket via Socket.io!');

  socket.on('chat message', (msg) => {
    console.log('Mensagem recebida: ' + msg);

    io.emit('message', `${socket.id} disse: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket rodando na porta ${PORT}`);
});
