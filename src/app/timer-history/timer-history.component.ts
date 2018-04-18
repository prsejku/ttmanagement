import { Component, OnInit } from '@angular/core';
import {TimerService} from "../timer.service";

@Component({
  selector: 'app-timer-history',
  templateUrl: './timer-history.component.html',
  styleUrls: ['./timer-history.component.css']
})
export class TimerHistoryComponent implements OnInit {

  constructor(private timerService: TimerService) { }

  ngOnInit() {
  }
}
