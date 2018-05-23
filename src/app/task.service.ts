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

  constructor(private httpService: HttpService) {  }



    getProjects() {
        this.httpService.getProjects().subscribe(projects => {
            this.projects = projects.PROJECT_OVERVIEW;
        });
    }

    getWorkPacks(selectedProj: number) {
      this.workPacks = [];
        this.httpService.getWorkPacks().subscribe(workPacks => {
            for (const wp of workPacks.WORKING_PACKAGE_OVERVIEW) {
                if (wp.PROJ_ID === selectedProj) { this.workPacks.push(wp); }
            }
            console.log(this.workPacks);
        });
    }

    getTasks(selectedWP) {
        this.httpService.getTasks().subscribe(tasks => {
            for (const t of tasks.TASK_OVERVIEW) {
                if (t.PACK_ID === selectedWP) { this.tasks.push(t); }
            }
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
