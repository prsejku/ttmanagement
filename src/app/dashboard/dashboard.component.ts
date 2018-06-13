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
  projectChartType = 'pie';
  projectLoaded = false;

  /* Variables for projectDetailChart */
  projectDetailChartLabels: string[] = [];
  projectDetailChartData: number[] = [];
  projectDetailChartType = 'pie';
  projectDetailLoaded = false;

    /* Variables for workingPackageDetailChart */
  workingPackageDetailChartLabels: string[] = [];
  workingPackageDetailChartData: number[] = [];
  workingPackageDetailChartType = 'pie';
  workingPackageDetailLoaded = false;
  workingPackageProjectSelected = false;
  selectedProj2 = false;

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
                    this.projectDetailChartData.push(Math.round(i['TIME_SEC'] / 3600));
                }
                //console.log(this.projectDetailChartData);
                this.projectDetailLoaded = true;
            });
        }
    }

    getWorkingPackageDetailReport(userId: number, workPackId: number) {
        this.workingPackageDetailChartLabels = [];
        this.workingPackageDetailChartData = [];
        this.workingPackageDetailLoaded = false;
        if (!isNullOrUndefined(userId)) {
            this.reportingService.getWorkingPackageDetailPerson(userId, workPackId).subscribe(workPack => {
                // console.log(project);
                for (const i of workPack['report']) {
                    this.workingPackageDetailChartLabels.push(i['NAME'] + " (h)");
                    this.workingPackageDetailChartData.push(Math.round(i['SEC'] / 3600));
                }
                // console.log(this.projectDetailChartData);
                this.workingPackageDetailLoaded = true;
            });
        }
    }

    setProjectId(projId: number) {
      // this.currProjId = projId;
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
