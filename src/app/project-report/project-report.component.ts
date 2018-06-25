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


      var times = new DataSet([
          {id: 1, content: 'item 1', start: '2013-04-20'}
      ]);

      // create a network
      //var container = document.getElementById('mynetwork');


      var options = {};
     // var timeline = new Timeline(container, times, options);










      // create an array with nodes
      /*var nodes = new DataSet([
          {id: 1, label: 'Node 1'},
          {id: 2, label: 'Node 2'},
          {id: 3, label: 'Node 3'},
          {id: 4, label: 'Node 4'},
          {id: 5, label: 'Node 5'}
      ]);

      // create an array with edges
      var edges = new DataSet([
          {from: 1, to: 3},
          {from: 1, to: 2},
          {from: 2, to: 4},
          {from: 2, to: 5}
      ]);*/

      /*var items = new DataSet([
          {
              start: new Date(2010, 7, 15),
              end: new Date(2010, 12, 2),  // end is optional
              content: 'Trajectory A'
              // Optional: fields 'id', 'type', 'group', 'className', 'style'
          }
          // more items...
      ]); */





     /* var groups = new DataSet([
          {id: 0, content: 'First', value: 1},
          {id: 1, content: 'Second', value: 2},
          {id: 2, content: 'Third', value: 3}
      ]);

      groups.add({id: 3, content: 'NEU', value: 4});

      var items = new DataSet([
          {id: 1, group: 0, content: 'item 1', start: new Date(Date.parse('2013-04-20 15:00:00'))},
          {id: 2, group: 0, content: 'item 2', start: new Date(2013, 5, 4, 15, 0, 0), end: Date.now()}
      ]);

      this.graphData["items"] = items;
      this.graphData["groups"] = groups;
      this.okay = true; */
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


          //var groups = new DataSet = {};
          var groups = new DataSet<any>();
          var items = new DataSet<any>();

          for(let keySubproject of this.subprojectsArray) {
              // Project
              console.log("trefferproj: " + keySubproject + " " + this.subprojects.get(keySubproject).PROJ_ID + " " + this.subprojects.get(keySubproject).TASK_NR + " " + this.subprojects.get(keySubproject).NAME);
              groups.add({id: this.subprojects.get(keySubproject).TASK_NR, content: this.subprojects.get(keySubproject).NAME});
              let startDatum: Date;
              let endDatum: Date;
              if (isNullOrUndefined(this.subprojects.get(keySubproject).START_TIME_IST)) {
                  startDatum = new Date(Date.now());
              } else {
                  startDatum = new Date(Date.parse(this.subprojects.get(keySubproject).START_TIME_IST));
              }
              if(isNullOrUndefined(this.subprojects.get(keySubproject).END_TIME_IST)) {
                  endDatum = new Date(Date.now());
              } else {
                  endDatum = new Date(Date.parse(this.subprojects.get(keySubproject).END_TIME_IST));
              }
              items.add({group: this.subprojects.get(keySubproject).TASK_NR, content: this.subprojects.get(keySubproject).NAME, start: startDatum, end: endDatum});
              for(let keyWorkpack of this.workpacksArray) {
                  // Workpack

                  let startDatum2: Date;
                  let endDatum2: Date;

                  if(this.workpacks.get(keyWorkpack).PROJ_ID === keySubproject) {
                      console.log("trefferwrpck: " + keySubproject + " " + this.workpacks.get(keyWorkpack).PROJ_ID + " " + this.workpacks.get(keyWorkpack).TASK_NR + " " + this.workpacks.get(keyWorkpack).NAME);
                      groups.add({id: this.workpacks.get(keyWorkpack).TASK_NR, content: this.workpacks.get(keyWorkpack).NAME});
                      if (isNullOrUndefined(this.workpacks.get(keyWorkpack).START_TIME_IST)) {
                          startDatum2 = new Date(Date.now());
                      } else {
                          startDatum2 = new Date(Date.parse(this.workpacks.get(keyWorkpack).START_TIME_IST));
                      }
                      if(isNullOrUndefined(this.workpacks.get(keyWorkpack).END_TIME_IST)) {
                          endDatum2 = new Date(Date.now());
                      } else {
                          endDatum2 = new Date(Date.parse(this.workpacks.get(keyWorkpack).END_TIME_IST));
                      }
                      //items.add({group: this.workpacks.get(keyWorkpack).TASK_NR, content: this.workpacks.get(keyWorkpack).NAME, start: startDatum2, end: endDatum2});
                  }
                 // for(let keyTask of this.tasksArray) {
                      // Tasks
                 // }
              }
          }

        this.graphData["groups"] = groups;
        this.graphData["items"] = items;


        this.loaded = true;

/*

          var groups = new DataSet([
              {id: 0, content: 'First', value: 1},
              {id: 1, content: 'Second', value: 2},
              {id: 2, content: 'Third', value: 3}
          ]);

          groups.add({id: 3, content: 'NEU', value: 4});

          var items = new DataSet([
              {id: 1, group: 0, content: 'item 1', start: new Date(Date.parse('2013-04-20 15:00:00'))},
              {id: 2, group: 0, content: 'item 2', start: new Date(2013, 5, 4, 15, 0, 0), end: Date.now()}
          ]);

          this.graphData["items"] = items;
          this.graphData["groups"] = groups;

          this.loaded = true;

          */
      });

  }

}
