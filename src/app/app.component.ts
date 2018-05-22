import { Component } from '@angular/core';
import { WebsocketService } from './shared/websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private socket: WebsocketService) {

    socket.consumeEventConnected(function() {
      console.log('Je suis le callback de connexion au socket');
    });
  }
}
