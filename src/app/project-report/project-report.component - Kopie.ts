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

  graphData = {};
  public nodes: Node;
  public edges: Edge;
  public times: TimelineEvents;
  public network: Network;
  public timeline: Timeline;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getProjectReportElements();

      var nodes = new DataSet([
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
          {from: 2, to: 5},
          {from: 3, to: 3}
      ]);

      var times = new DataSet([
          {id: 1, content: 'item 1', start: '2013-04-20'}
      ]);

      // create a network
      var container = document.getElementById('mynetwork');
      var data = {
          nodes: nodes,
          edges: edges
      };

      var data2 = {
          times: times
      }

      var options = {};
      var network = new Network(container, data, options);
      var timeline = new Timeline(container, times, options);

  }

    ngAfterContentInit(){
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

        var items = new DataSet([
            {id: 1, content: 'item 1', start: '2013-04-20'},
            {id: 2, content: 'item 2', start: '2013-04-14'},
            {id: 3, content: 'item 3', start: '2013-04-18'},
            {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
            {id: 5, content: 'item 5', start: '2013-04-25'},
            {id: 6, content: 'item 6', start: '2013-04-27'}

        ]);

        // provide the data in the vis format
        //this.graphData["nodes"] = nodes;
        //this.graphData["edges"] = edges;
        this.graphData = items;
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
