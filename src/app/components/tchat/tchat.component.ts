import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.css']
})
export class TchatComponent implements OnInit {

  displayTchat = 'none';

  constructor() { }

  ngOnInit() {
  }

  openTchat() {
    this.displayTchat = 'block';
  }

  closeTchat() {
    this.displayTchat = 'none';
  }
}
