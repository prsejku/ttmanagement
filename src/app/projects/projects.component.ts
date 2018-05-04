import { Component, OnInit } from '@angular/core';
import { TimerService } from "../timer.service";
import { Task } from "../../models/task";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(public timerService: TimerService) { }

  projectName: string;
  projectDesc: string;
  projects: Task[];
  columnsToDisplay = ['name', 'description', 'delete'];

  ngOnInit() {
      this.projectDesc = "";
      this.getProjects();
  }

    addProject() {
        if (this.projectName != undefined) {
            this.timerService.addProject(this.projectName, this.projectDesc).subscribe(b => {
                if (b) this.getProjects();
            });
            this.projectName = undefined;
            this.projectDesc = undefined;
        }
    }

  getProjects() {
      this.timerService.getProjects().subscribe(tasks => {
          this.projects = tasks.PROJECT_OVERVIEW;
      });
  }
}
