import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {TaskTime} from '../../models/TaskTime';
import {TaskService} from '../task.service';
import {Task} from '../../models/task';
import {FormControl} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material";
import {TimeTrackDetailComponent} from "./time-track-detail/time-track-detail.component";
import {MessageService} from "../message.service";

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
              public dialog: MatDialog,
              private messageService: MessageService) { }

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

  private log(m: string) {
      this.messageService.add(m);
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
            if (b) { this.log('Successfully entered time'); this.ngOnInit(); }
        }, _ => { this.log('Could not submit time entry'); });
    }

    openDialog(timeTrack) {
      const dialogRef = this.dialog.open(TimeTrackDetailComponent, {data: timeTrack});
      dialogRef.afterClosed().subscribe(x => {
        if (x) { this.httpService.deleteTimeTrack(timeTrack.TRACK_ID).subscribe(b => {
            if (b) { this.log('Successfully deleted the entry'); this.ngOnInit(); }
        }, _ => { this.log('Could not delete the entry'); }); }
      });
    }
}
