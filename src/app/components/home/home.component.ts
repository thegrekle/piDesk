import { Component, OnInit } from '@angular/core';
import { $WebSocket, WebSocketSendMode, WebSocketConfig } from 'angular2-websocket/angular2-websocket';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  volume: Number = 50;
  power: boolean = false;
  mute: boolean = false;
  ws: $WebSocket;

  constructor() { }

  ngOnInit(): void {
    this.ws = new $WebSocket("ws://deskpi:8080");

  }

  onMute() {
    this.mute = !this.mute;
    this.ws.send("muteToggle", WebSocketSendMode.Direct);
  }

  onPower() {
    this.power = !this.power;
    this.ws.send("powerToggle", WebSocketSendMode.Direct);
  }

  onVolumeChange() {
    console.log(`volumeChange: ${this.volume}`);
    this.ws.send(`setVolume:${this.volume}`, WebSocketSendMode.Direct);
  }
}
