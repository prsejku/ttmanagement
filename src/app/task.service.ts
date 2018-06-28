import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import { Task } from '../models/task';
import {isNullOrUndefined} from 'util';

@Injectable()
export class TaskService {

  projects: Task[] = [];
  archProjs: Task[] = [];
  workPacks: Task[] = [];
  archWorkPacks: Task[] = [];
  tasks: Task[] = [];
  archTasks: Task[] = [];

  list: Task[];

  constructor(private timerService: HttpService) {  }

    getProjects() {
      let projs = [];
      let archProjs = [];
        this.timerService.getProjects().subscribe(projects => {
            for (let proj of projects.PROJECT_OVERVIEW) {
                if (proj.ARCHIVED == 1) { projs.push(proj); }
                else if (proj.ARCHIVED == 0) { archProjs.push(proj); }
            }
            this.projects = projs;
            this.archProjs = archProjs;
        });
    }

    getWorkPacks(selectedProj: number) {
      console.log(selectedProj);
      let wrkPck = [];
      let archWrkPck = [];
        if (!isNullOrUndefined(selectedProj)) {
            this.timerService.getWorkPacks().subscribe(workPacks => {
                for (const wp of workPacks.WORKING_PACKAGE_OVERVIEW) {
                    if (wp.PROJ_ID == selectedProj) {
                        if (wp.ARCHIVED == 1) { wrkPck.push(wp); }
                        else if (wp.ARCHIVED == 0) { archWrkPck.push(wp); }
                    }
                }
                this.workPacks = wrkPck;
                this.list = wrkPck;
                this.archWorkPacks = archWrkPck;
            });
        }
    }

    getTasks(selectedWP: number) {
      let tsks = [];
      let archTsks = [];
        if (!isNullOrUndefined(selectedWP)) {
            this.timerService.getTasks().subscribe(tasks => {
                for (const t of tasks.TASK_OVERVIEW) {
                    if (t.PACK_ID == selectedWP) {
                      if (t.ARCHIVED == 1) { tsks.push(t); }
                      else if (t.ARCHIVED == 0) { archTsks.push(t); }
                    }
                }
                this.tasks = tsks;
                this.list = tsks;
                this.archTasks = archTsks;
            });
            console.log(this.tasks);
        }
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
