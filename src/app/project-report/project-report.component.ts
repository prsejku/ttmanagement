import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {isNullOrUndefined} from "util";
import {ProjectReport} from '../../models/ProjectReport';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.css']
})
export class ProjectReportComponent implements OnInit {
  subprojects: Map<number, ProjectReport> = new Map();
  workpacks: Map<number, ProjectReport> = new Map();
  tasks: Map<number, ProjectReport> = new Map();
  taskNames: Map<number, string> = new Map();
  subprojectsArray: Array<number> = new Array();
  workpacksArray: Array<number> = new Array();
  tasksArray: Array<number> = new Array();
  loaded: boolean = false;
  projectsArray: ProjectReport[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getProjectReportElements();
  }


  getProjectReportElements() {

      let projectsArray: ProjectReport[] = [];

      if (!isNullOrUndefined(this.subprojects)) {
        this.subprojects.clear();
      }
      if (!isNullOrUndefined(this.workpacks)) {
          this.workpacks.clear();
      }
      if (!isNullOrUndefined(this.tasks)) {
          this.tasks.clear();
      }

      this.httpService.getProjectReportElements().subscribe(element => {
          for (let i of element.report) {
              projectsArray.push(i);
          }
          this.projectsArray = projectsArray;

          for (let i of this.projectsArray) {
              if (isNullOrUndefined(i.PROJ_ID) && isNullOrUndefined(i.PACK_ID)) {
                   this.subprojects.set((i.TASK_NR), i);
               } else if (!isNullOrUndefined(i.PROJ_ID) && isNullOrUndefined(i.PACK_ID)) {
                   this.workpacks.set(i.TASK_NR, i);
               } else if (!isNullOrUndefined(i.PROJ_ID) && !isNullOrUndefined(i.PACK_ID)) {
                   this.tasks.set(i.TASK_NR, i);
               }
          }

          this.subprojectsArray = Array.from(this.subprojects.keys());
          this.workpacksArray = Array.from(this.workpacks.keys());
          this.tasksArray = Array.from(this.tasks.keys());

          this.loaded = true;
      });

  }

}
