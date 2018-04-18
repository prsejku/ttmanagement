import { Component, OnInit } from '@angular/core';
import {TimerService} from "../timer.service";
import {AuthService} from "../auth.service";

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
  date: Date;
  curDate: string;
  interv;

  constructor(private timerService: TimerService, private authService: AuthService) { }

  ngOnInit() {
    this.hr = 0;
    this.min = 0;
    this.sek = 1;
    this.input = "0:00:00";
    this.running = false;
    this.curDate = new Date(Date.now()).toLocaleDateString('en');
  }

  timer(): void {
    this.running = true;
    this.interv = setInterval(() => this.increment(), 1000);
  }

    increment(): void {
      let strSek, strMin;
        if (this.sek < 10) strSek = '0'+this.sek;
        else strSek = this.sek.toString();
        if (this.min < 10) strMin = '0'+this.min;
        else strMin = this.min.toString();
        this.input = this.hr+':'+strMin+':'+strSek;
        this.sek++;
        if (this.sek > 59) {
          this.sek = 0;
          this.min++;
          if (this.min > 59) {
            this.min = 0;
            this.hr++;
          }
        }
    }

    onSelect(): void {
        if (!this.running) {
          this.startDbTimer();
          this.timer();
          document.getElementById('startButton').innerHTML = 'pause';
        } else {
          this.stopDbTimer();
          document.getElementById('startButton').innerHTML = 'play_arrow';
          this.running = false;
          clearInterval(this.interv);
        }
    }

      submit(input: string): void {
        this.timerService.enterTime(input.split(':'));
        this.running = false;
        clearInterval(this.interv);
        this.reset();
      }

      reset(): void {
          this.input = "0:00:00";
          this.hr = 0;
          this.min = 0;
          this.sek = 0;
      }
  startDbTimer(): boolean {
    return this.timerService.startTime();
  }

  stopDbTimer(): boolean {
    return this.timerService.submitEndTime(new Date(Date.now()));
  }
}
