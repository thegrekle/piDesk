import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { $WebSocket, WebSocketSendMode, WebSocketConfig } from 'angular2-websocket/angular2-websocket';
import { MatSliderModule } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  volume: Number = 0;
  power: boolean = false;
  mute: boolean = false;
  ws: $WebSocket;

  constructor() { }

  ngOnInit(): void {
    this.ws = new $WebSocket("ws://deskpi:8080");

    this.ws.onMessage(
      (msg: MessageEvent) => {
        //console.log("onMessage ", msg.data);
        if(msg.data.startsWith('volumeSet')) {
          //console.log("showing volume as ", msg.data.split(':')[1]);
          this.volume = msg.data.split(':')[1];
        }
        if(msg.data.startsWith('powerState')) {
          console.log("showing power as ", msg.data.split(':')[1]);
          this.power = (msg.data.split(':')[1] == 'true');
        }
        if(msg.data.startsWith('muteState')) {
          console.log("showing mute as ", msg.data.split(':')[1]);
          this.mute = (msg.data.split(':')[1] == 'true');
        }
      },
      { autoApply: false }
    );
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
