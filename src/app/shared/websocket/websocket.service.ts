import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
@Injectable()
export class WebsocketService {
  // Here the client instance of socket.io
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io('http://localhost:5000');
  }

  consumeEventConnected(callback) {
    this.socket.on('connect', function(data) {
      console.log('Je suis connecté au serveur websocket');
      callback();
    });
  }

  consumeEventInit() {
    this.socket.on('init', function() {
      console.log('Server event :  init');
    });
  }

  // List of MongoDB databases
  consumeEventListdatabases(callback) {
    this.socket.on('listdatabases', function(list) {
      callback(list);
    });
  }

  // Export socket
  consumeSocket() {
    return this.socket;
  }
}
