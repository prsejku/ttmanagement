import { Component, OnInit } from '@angular/core';
import {TimerService} from "../timer.service";

@Component({
  selector: 'app-timer-history',
  templateUrl: './timer-history.component.html',
  styleUrls: ['./timer-history.component.css']
})
export class TimerHistoryComponent implements OnInit {

    date: Date;
    curDate: string;
    curTime: string;
    startTime: string;
    endTime: string;
    project: number;
    workPack: number;
    task: number;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
      this.curDate = new Date().toLocaleDateString('en');
      setInterval(_ => {
          this.curTime = new Date().toLocaleTimeString()
      }, 100);
  }

    submit(): void {
        this.timerService.enterTime(this.startTime, this.endTime);
    }
}
