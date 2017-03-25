import { Component, OnInit } from '@angular/core';
import { GPIOService } from 'rpi-gpio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'piDesk';
  power = false;

  constructor(
    private gpio: GPIOService
  ) { }

  ngOnInit(): void {
    this.gpio.setMode(this.gpio.MODE_BCM);
  }

  onClickPower() {
    this.power = !this.power;

    this.gpio.setup(18, this.gpio.DIR_OUT, write);

    function write() {
        this.gpio.write(18, this.power, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });
    }
  }
}
