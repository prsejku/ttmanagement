import { Component, OnInit } from '@angular/core';
import {TimerService} from "../timer.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  hr: number;
  min: number;
  sek: number;
  input: string;
  running: boolean;
  interv;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.hr = 0;
    this.min = 0;
    this.sek = 1;
    this.running = false;
  }

  timer(): void {
    this.running = true;
    let sek = this.sek, hr = this.hr, min = this.min;
    let strSek: string, strMin: string;
    let input: string;
    this.interv = setInterval(() => {
      this.hr = hr;
      this.min = min;
      this.sek = sek;
      if (sek < 10) strSek = '0'+sek;
      else strSek = sek.toString();
      if (min < 10) strMin = '0'+min;
      else strMin = min.toString();
      input = hr+':'+strMin+':'+strSek
      document.getElementById('time').innerHTML = input;
      this.input = input
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
    if (!this.running) {
      this.timer();
      document.getElementById('startButton').innerHTML = 'Stop';
    } else {
      document.getElementById('startButton').innerHTML = 'Start';
      this.running = false;
      clearInterval(this.interv);
    }
  }

  submit(input: string): void {
    this.timerService.enterTime(input.split(':'));
    this.clear();
    this.running = false;
    clearInterval(this.interv);
  }

  clear(): void {
    this.input = null;
  }
}
