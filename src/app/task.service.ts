import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import { Task } from '../models/Task';
import {isNullOrUndefined} from 'util';

@Injectable()
export class TaskService {

  projects: Task[] = [];
  workPacks: Task[] = [];
  tasks: Task[] = [];

  list: Task[];

  constructor(private timerService: HttpService) {  }



    getProjects() {
        this.timerService.getProjects().subscribe(projects => {
            this.projects = projects.PROJECT_OVERVIEW;
        });
    }

    getWorkPacks(selectedProj: number) {
      this.workPacks = [];
        if (!isNullOrUndefined(selectedProj)) {
            this.timerService.getWorkPacks().subscribe(workPacks => {
                for (const wp of workPacks.WORKING_PACKAGE_OVERVIEW) {
                    if (wp.PROJ_ID === selectedProj) { this.workPacks.push(wp); }
                }
            });
        }
    }

    getTasks(selectedWP: number) {
      this.tasks = [];
        if (!isNullOrUndefined(selectedWP)) {
            this.timerService.getTasks().subscribe(tasks => {
                for (const t of tasks.TASK_OVERVIEW) {
                    if (t.PACK_ID === selectedWP) { this.tasks.push(t); }
                }
            });
        }
        console.log(this.tasks);
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
