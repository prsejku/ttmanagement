import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";

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

  constructor(private httpService: HttpService) { }

  ngOnInit() {
      this.curDate = new Date().toLocaleDateString('en');
      setInterval(_ => {
          this.curTime = new Date().toLocaleTimeString()
      }, 100);
  }

    submit(): void {
        this.httpService.enterTime(this.startTime, this.endTime, this.task);
    }
}
