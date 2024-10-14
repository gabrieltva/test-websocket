// src/socket.ts

import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  constructor(private url: string) {}

  connect(
    onConnect: () => void,
    onDisconnect: () => void,
    onMessage: (data: string) => void,
    onError?: (error: unknown) => void
  ) {
    this.socket = io(this.url, {
      autoConnect: false, // Controla quando a conexão deve ser iniciada
    });

    this.socket.on('connect', () => {
      console.log('Socket.io conectado');
      onConnect();
    });

    this.socket.on('disconnect', () => {
      console.log('Socket.io desconectado');
      onDisconnect();
    });

    this.socket.on('message', (data: string) => {
      onMessage(data);
    });

    if (onError) {
      this.socket.on('error', (error: unknown) => {
        console.error('Erro no Socket.io', error);
        onError(error);
      });
    }

    this.socket.connect();
  }

  send(event: string, data: unknown) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    } else {
      console.error('Socket.io não está conectado.');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default SocketService;
