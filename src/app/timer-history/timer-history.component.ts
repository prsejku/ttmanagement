import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {TaskTime} from '../../models/TaskTime';
import {TaskService} from '../task.service';
import {Task} from '../../models/Task';

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
    allProjects: Task[];
    allWorkPacks: Task[];
    allTasks: Task[];

  constructor(private httpService: HttpService, private taskService: TaskService) { }

  ngOnInit() {
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
        this.httpService.enterTime(this.startTime, this.endTime, this.task);
    }
}
