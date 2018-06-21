import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.css']
})
export class ProjectReportComponent implements OnInit {

  //subprojects: <number, number> = new Map();
  subprojects: Map<number, number> = new Map();
  workpacks: Map<number, number> = new Map();
  tasks: Map<number, number> = new Map();
  taskNames: Map<number, string> = new Map();
  subprojectsArray: Array<number> = new Array();
  workpacksArray: Array<number> = new Array();
  tasksArray: Array<number> = new Array();
  loaded: boolean = false;

  keySubproject: number;
  keyWorkpack: number;
  keyTask: number;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getProjectReportElements();
  }

  resetKeySubproject(){
      this.keySubproject = 0;
  }

  resetWorkpack () {
      this.keyWorkpack = 0;
  }

  resetKeyTask() {
      this.keyTask = 0;
  }

  getProjectReportElements() {
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
          for (const i of element['report']) {
              //this.test.push(i['PROJ_ID']);
              //console.log(i['PROJ_ID']);
              if (isNullOrUndefined(i['PROJ_ID']) && isNullOrUndefined(i['PACK_ID'])) {
                //console.log(i['TASK_NR']);
                this.subprojects.set(parseInt(i['TASK_NR']), parseInt(i['TASK_NR']));
              } else if (!isNullOrUndefined(i['PROJ_ID']) && isNullOrUndefined(i['PACK_ID'])) {
                this.workpacks.set(parseInt(i['TASK_NR']), parseInt(i['PROJ_ID']));
              } else if (!isNullOrUndefined(i['PROJ_ID']) && !isNullOrUndefined(i['PACK_ID'])) {
                this.tasks.set(parseInt(i['TASK_NR']), parseInt(i['PACK_ID']));
              }
              //this.subprojects.set(100, 100);
              //this.workingPackageDetailChartLabels.push(i['NAME'] + " (h)");
              //this.workingPackageDetailChartData.push(Math.round(i['SEC'] / 3600));
              this.taskNames.set(parseInt(i['TASK_NR']), i['NAME']);
          }

          this.tasks.forEach((value: number, key: number) => {
            console.log(key + " " + value);
            //console.log(typeof key);
          });

          for(let key of Array.from( this.workpacks.keys()) ) {
              console.log(key);
          }



          this.subprojectsArray = Array.from(this.subprojects.keys());
          this.workpacksArray = Array.from(this.workpacks.keys());
          this.tasksArray = Array.from(this.tasks.keys());

          this.loaded = true;

      });
  }

}
