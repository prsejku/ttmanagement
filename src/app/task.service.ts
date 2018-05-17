import { Injectable } from '@angular/core';
import {TimerService} from './timer.service';
import { Task } from '../models/Task'

@Injectable()
export class TaskService {

  projects: Task[];
  workPacks: Task[];
  tasks: Task[];

  constructor(private timerService: TimerService) {  }

  getTasks() {
      this.timerService.getTasks().subscribe(t => {
          console.log(t);
          this.tasks = t.TASK_OVERVIEW;
      });
      this.timerService.getProjects().subscribe(p => {
          this.projects = p.PROJECT_OVERVIEW;
      });
      this.timerService.getWorkPacks().subscribe(wp => {
          this.workPacks = wp.WORKING_PACKAGE_OVERVIEW
      });
  }

  /*getProjectOf(task: Task): Task {
    if (task.TASK_TYPE == 1) return;
    if (task.TASK_TYPE == 2) {
      for (let project of this.projects) {
        if (task.)
      }
    }
  }*/
}
