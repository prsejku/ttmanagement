import { Component, OnInit } from '@angular/core';
import {TimerService} from "../timer.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(public timerService: TimerService) { }

  projectName: string;
  projectDesc: string;
  projObj;
  projects = [];
  columnsToDisplay = ['name', 'description', 'delete'];

  ngOnInit() {
    this.timerService.getProjects().subscribe(pj => this.projObj = pj);
    setTimeout(()=> {
        this.projects = this.projObj.PROJECT_OVERVIEW;
        console.log(this.projects);
    }, 1000);
  }

  addProject() {
    if (this.projectName != undefined) this.timerService.addProject(this.projectName, this.projectDesc);
    setTimeout(()=> this.ngOnInit(), 500);
  }
}
