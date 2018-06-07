import { Component, OnInit } from '@angular/core';
import {isNullOrUndefined} from "util";
import {ReportingService} from '../reporting.service';
import { ChartsModule } from 'ng2-charts';
import {HttpService} from '../http.service';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //project: string;
  currProjId: number;

  /* Variables for projectChart */
  projectChartLabels: string[] = [];
  projectChartData: number[] = [];
  projectChartType: string = 'pie';
  projectLoaded: boolean = false;

  /* Variables for projectDetailChart */
  projectDetailChartLabels: string[] = [];
  projectDetailChartData: number[] = [];
  projectDetailChartType: string = 'pie';
  projectDetailLoaded: boolean = false;

  constructor(private reportingService: ReportingService, private httpService: HttpService, private taskService: TaskService) { }

  ngOnInit() {
    this.getProjectReport(this.httpService.user.USER_ID);
  }

    getProjectReport(userId: number) {
        if (!isNullOrUndefined(userId)) {
            this.reportingService.getProjectsPerson(userId).subscribe(project => {
                for (const i of project['report']) {
                    this.projectChartLabels.push(i['NAME'] + " (h)");
                    this.projectChartData.push(Math.round(i['SEC']/3600));
                }
                this.projectLoaded = true;
            });
        }
    }

    getProjectDetailReport(userId: number, projId: number) {
        this.projectDetailChartLabels = [];
        this.projectDetailChartData = [];
        this.projectDetailLoaded = false;
        if (!isNullOrUndefined(userId)) {
            this.reportingService.getProjectsDetailPerson(userId, projId).subscribe(project => {
                //console.log(project);
                for (const i of project['report']) {
                    this.projectDetailChartLabels.push(i['PACK_DESC'] + " (h)");
                    this.projectDetailChartData.push(Math.round(i['TIME_SEC']/3600));
                }
                //console.log(this.projectDetailChartData);
                this.projectDetailLoaded = true;
            });
        }
    }

    setProjectId(projId: number) {
      //this.currProjId = projId;
    }

    /*

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    */

}
