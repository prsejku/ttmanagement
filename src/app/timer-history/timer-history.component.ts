import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {TaskTime} from '../../models/TaskTime';
import {TaskService} from '../task.service';
import {Task} from '../../models/Task';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-timer-history',
  templateUrl: './timer-history.component.html',
  styleUrls: ['./timer-history.component.css']
})
export class TimerHistoryComponent implements OnInit {

    date: FormControl;
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
    dC = ["startTime", "endTime", "desc", "projName", "packName", "taskName"];

  constructor(public httpService: HttpService, public taskService: TaskService) { }

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
        this.httpService.enterTime(this.date.value, this.startTime, this.endTime, this.task).subscribe(b => {
            console.log(b);
            this.ngOnInit();
        });
    }

    /*formatTime(timeString: string) {
      let time = new Date(timeString);
      //if (new Date().getMilliseconds() - time.getMilliseconds() < 24 * 3600000) return time.toLocaleTimeString();
      //return time.toLocaleString();
      return Date.now() - time.getMilliseconds();
    }*/

    formatDesc() {

    }
}
