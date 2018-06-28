import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {TaskTime} from '../../models/TaskTime';
import {TaskService} from '../task.service';
import {Task} from '../../models/task';
import {FormControl} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material";
import {TimeTrackDetailComponent} from "./time-track-detail/time-track-detail.component";

@Component({
  selector: 'app-timer-history',
  templateUrl: './timer-history.component.html',
  styleUrls: ['./timer-history.component.css']
})
export class TimerHistoryComponent implements OnInit {

    date: FormControl;
    description: string;
    curDate: string;
    curTime: string;
    startTime: string;
    endTime: string;
    project: number;
    workPack: number;
    task: number;
    allProjects: Task[];
    allWorkPacks: Task[];
    allTasks: Task[];
    dC = ["id", "date", "duration", "task"];

  constructor(public httpService: HttpService,
              public taskService: TaskService,
              public dialog: MatDialog) { }

  ngOnInit() {
      this.date = new FormControl(new Date());
      this.httpService.getProjects().subscribe(pr => {
          this.allProjects = pr.PROJECT_OVERVIEW;
      });
      this.httpService.getWorkPacks().subscribe(wp => {
          this.allWorkPacks = wp.WORKING_PACKAGE_OVERVIEW;
      });
      this.httpService.getTasks().subscribe(t => {
          this.allTasks = t.TASK_OVERVIEW;
      });
      this.curDate = new Date().toLocaleDateString('en');
      this.httpService.getTimeTracks();
      setInterval(_ => {
          this.curTime = new Date().toLocaleTimeString();
      }, 100);
  }

    getProject(id: number) {
      return Task.get(this.allProjects, id);
    }

    getWorkPack(id: number) {
      return Task.get(this.allWorkPacks, id);
    }

    getTask(id: number) {
      return Task.get(this.allTasks, id);
    }

    submit(): void {
        this.httpService.enterTime(this.date.value, this.startTime, this.endTime, this.description, this.task).subscribe(b => {
            console.log(b);
            this.ngOnInit();
        });
    }

    openDialog(timeTrack) {
      console.log(timeTrack.TRACK_ID);
      const dialogRef = this.dialog.open(TimeTrackDetailComponent, {data: timeTrack});
      dialogRef.afterClosed().subscribe(x => {
       // if (x) { this.httpService.deleteTimeTrack(timeTrack.TRACK_ID); }
      });
    }

    /*formatTime(timeString: string) {
      let time = new Date(timeString);
      //if (new Date().getMilliseconds() - time.getMilliseconds() < 24 * 3600000) return time.toLocaleTimeString();
      //return time.toLocaleString();
      return Date.now() - time.getMilliseconds();
    }*/
}
