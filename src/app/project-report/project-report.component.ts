import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {isNullOrUndefined} from 'util';
import {ProjectReport} from '../../models/ProjectReport';
import {DataSet, Edge, Network, Node, Timeline, TimelineEvents, TimelineItem} from 'vis';

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

  public graphData = {};
  okay: boolean = false;

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

          this.subprojectsArray.sort((a, b) => {
              if (a < b) return -1;
              else if (a > b) return 1;
              else return 0;
          });

          var groups = new DataSet<any>();
          var items = new DataSet<any>();
          let oid: number = 0;

          for (let keySubproject of this.subprojectsArray) {
              // Project
              groups.add({id: this.subprojects.get(keySubproject).TASK_NR, content: this.subprojects.get(keySubproject).NAME,
                  orderId: ++oid, className: 'timeline-subprojects'});
              let startDatum: Date;
              let endDatum: Date;
              if (isNullOrUndefined(this.subprojects.get(keySubproject).START_TIME_IST)) {
                  startDatum = new Date(Date.now());
              } else {
                  startDatum = new Date(Date.parse(this.subprojects.get(keySubproject).START_TIME_IST));
              }
              if (isNullOrUndefined(this.subprojects.get(keySubproject).END_TIME_IST) || this.subprojects.get(keySubproject).STATUS == 0) {
                  endDatum = new Date(Date.now());
              } else {
                  endDatum = new Date(Date.parse(this.subprojects.get(keySubproject).END_TIME_IST));
              }
              items.add({group: this.subprojects.get(keySubproject).TASK_NR, content: this.subprojects.get(keySubproject).NAME,
                  start: startDatum, end: endDatum});
              for (let keyWorkpack of this.workpacksArray) {
                  // Workpack

                  let startDatum2: Date;
                  let endDatum2: Date;

                  if(this.workpacks.get(keyWorkpack).PROJ_ID === keySubproject) {
                      groups.add({id: this.workpacks.get(keyWorkpack).TASK_NR, content: this.workpacks.get(keyWorkpack).NAME,
                          orderId: ++oid, className: 'timeline-workpacks'});
                      if (isNullOrUndefined(this.workpacks.get(keyWorkpack).START_TIME_IST)) {
                          startDatum2 = new Date(Date.now());
                      } else {
                          startDatum2 = new Date(Date.parse(this.workpacks.get(keyWorkpack).START_TIME_IST));
                      }
                      if(isNullOrUndefined(this.workpacks.get(keyWorkpack).END_TIME_IST)  || this.workpacks.get(keyWorkpack).STATUS == 0) {
                          endDatum2 = new Date(Date.now());
                      } else {
                          endDatum2 = new Date(Date.parse(this.workpacks.get(keyWorkpack).END_TIME_IST));
                      }
                      items.add({group: this.workpacks.get(keyWorkpack).TASK_NR, content: this.workpacks.get(keyWorkpack).NAME,
                          start: startDatum2, end: endDatum2});
                  }
                  for (let keyTask of this.tasksArray) {
                      // Tasks
                      let startDatum3: Date;
                      let endDatum3: Date;

                      if(this.tasks.get(keyTask).PACK_ID == keyWorkpack && this.workpacks.get(keyWorkpack).PROJ_ID == keySubproject){
                          groups.add({id: this.tasks.get(keyTask).TASK_NR, content: this.tasks.get(keyTask).NAME,
                              orderId: ++oid, className: 'timeline-tasks'});
                          if(isNullOrUndefined(this.tasks.get(keyTask).START_TIME_IST)) {
                              startDatum3 = new Date(Date.now());
                          } else {
                              startDatum3 = new Date(Date.parse(this.tasks.get(keyTask).START_TIME_IST));
                          }
                          if(isNullOrUndefined(this.tasks.get(keyTask).END_TIME_IST)  || this.tasks.get(keyTask).STATUS == 0) {
                              endDatum3 = new Date(Date.now());
                          } else {
                              endDatum3 = new Date(Date.parse(this.tasks.get(keyTask).END_TIME_IST));
                          }
                          items.add({group: this.tasks.get(keyTask).TASK_NR, content: this.tasks.get(keyTask).NAME,
                              start: startDatum3, end: endDatum3});
                      }
                  }
              }
          }

        this.graphData["groups"] = groups;
        this.graphData["items"] = items;
        this.loaded = true;
      });

  }

}
