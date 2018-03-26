import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  hr: number;
  min: number;
  sek: number;
  running: boolean;
  interv;

  constructor() { }

  ngOnInit() {
    this.hr = 0;
    this.min = 0;
    this.sek = 1;
    this.running = false;
  }

  timer(): void {
    let sek = this.sek, hr = this.hr, min = this.min;
    let strSek, strMin;
    this.interv = setInterval(function() {
      this.hr = hr;
      this.min = min;
      this.sek = sek;
      if (sek < 10) strSek = '0'+sek;
      else strSek = sek.toString();
      if (min < 10) strMin = '0'+min;
      else strMin = min.toString();
      document.getElementById('time').innerHTML = hr+':'+strMin+':'+strSek;
      sek++;
      if (sek > 59) {
        sek = 0;
        min++;
        if (min > 59) {
          min = 0;
          hr++;
        }
      }
    }, 1000);
  }

  onSelect(): void {
    document.getElementById('startButton').innerText = 'Clicked';
    if (!this.running) {
      this.timer();
      document.getElementById('startButton').innerHTML = 'Stop';
      this.running = true;
    } else {
      document.getElementById('startButton').innerHTML = 'Start';
      clearInterval(this.interv);
      this.running = false;
    }
  }
}
