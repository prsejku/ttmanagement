import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {TaskTime} from '../../../models/TaskTime';

@Component({
  selector: 'app-time-track-detail',
  templateUrl: './time-track-detail.component.html',
  styleUrls: ['./time-track-detail.component.css']
})
export class TimeTrackDetailComponent implements OnInit {

  date: string;
  startTime: string;
  endTime: string;
  duration: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: TaskTime) { }

  ngOnInit() {

  }

}
