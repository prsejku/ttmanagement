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
  taskType: string;
  columnsToDisplay = ['name', 'description', 'delete'];
  dropdown: Task[];
  superTask: Task;

  ngOnInit() {
      this.taskType = "Project";
      this.projectDesc = " ";
      this.getProjects();
  }

    addProject() {
        if (this.projectName != undefined) {
            switch(this.taskType) {
                case "Project":
                    this.timerService.addProject(this.projectName, this.projectDesc).subscribe(b => {
                        if (b) this.getProjects();
                    });
                    break;
                case "Work Package":
                    this.timerService.addWorkPack(this.projectName, this.projectDesc, this.superTask.TASK_NR).subscribe(b => {
                        if (b) this.getProjects();
                    });
                    break;
                case "Task":
                    this.timerService.addTask(this.projectName, this.projectDesc, this.superTask.TASK_NR).subscribe(b => {
                        if (b) this.getProjects();
                    })
            }

            this.projectName = undefined;
            this.projectDesc = undefined;
        }
    }

  getProjects() {
      switch (this.taskType) {
          case "Project":
              this.timerService.getProjects().subscribe(projects => {
                  this.projects = projects.PROJECT_OVERVIEW;
              });
              break;
          case "Work Package":
              this.timerService.getWorkPacks().subscribe(workPacks => {
                  this.projects = workPacks.WORKING_PACKAGE_OVERVIEW;
              });
              break;
          case "Task":
              this.timerService.getTasks().subscribe(tasks => {
                  this.projects = tasks.TASK_OVERVIEW;
              });
              break;
      }
  }

  getOptions() {
      if (this.taskType == 'Work Package') this.timerService.getProjects().subscribe(x=>this.dropdown=x.PROJECT_OVERVIEW);
      else this.timerService.getWorkPacks().subscribe(x=>this.dropdown=x.WORKING_PACKAGE_OVERVIEW);
  }

  setTaskType(type: string) {
      this.taskType = type;
      this.getProjects();
      this.getOptions();
  }
}
