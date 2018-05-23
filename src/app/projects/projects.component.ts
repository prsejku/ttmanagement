import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {Task} from '../../models/Task';
import {isNullOrUndefined} from 'util';
import {TaskService} from "../task.service";

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    toAdd: Task;
    projects: Task[] = [];
    tasks: Task[] = [];
    selectedProj: number;
    selectedWP: number;
    taskType: string;
    columnsToDisplay = ['name', 'description', 'delete'];
    list: Task[];
    superTask: Task;

    constructor(public httpService: HttpService, private taskService: TaskService) {
    }

    ngOnInit() {
        this.toAdd = new Task();
        this.taskType = 'Project';
        this.toAdd.DESCRIPTION = ' ';
        this.getProjects();
    }

    addProject() {
        if (this.toAdd.NAME !== undefined) {
            switch (this.taskType) {
                case 'Project':
                    this.httpService.addProject(this.toAdd.NAME, this.toAdd.DESCRIPTION).subscribe(b => {
                        if (b) { this.getProjects(); }
                    });
                    break;
                case 'Work Package':
                    this.httpService.addWorkPack(this.toAdd.NAME, this.toAdd.DESCRIPTION, this.selectedProj).subscribe(b => {
                        if (b) { this.getWorkPacks(); }
                    });
                    break;
                case 'Task':
                    this.httpService.addTask(this.toAdd.NAME, this.toAdd.DESCRIPTION, this.selectedWP).subscribe(b => {
                        if (b) { this.getTasks(); }
                    });
                    break;
                /*case "Sub-Project":
                    this.httpService.addSubProject(this.toAdd.NAME, this.toAdd.DESCRIPTION, this.toAdd.PROJ_ID).subscribe(b => {
                        if (b) this.getProjects();
                    });*/
            }

            this.toAdd = new Task();
        }
    }

    deleteTask(taskNr: number) {
        this.httpService.archiveTask(taskNr, this.taskType).subscribe(b => {
            if (b) { this.getProjects(); }
        });
    }

    getProjects() {
        this.taskService.getProjects();
        if (this.taskType === 'Project') { this.list = this.taskService.projects; }
    }

    getWorkPacks() {
        if (!isNullOrUndefined(this.selectedProj)) {
            this.taskService.getWorkPacks(this.selectedProj);
        }
    }

    getTasks() {
        if (this.selectedWP) {
            this.httpService.getTasks().subscribe(tasks => {
                for (const t of tasks.TASK_OVERVIEW) {
                    if (t.PROJ_ID === this.selectedProj) { this.tasks.push(t); }
                }
                if (this.taskType === 'Task') {
                    this.list = this.tasks;
                }
            });
        }
    }

    getOptions() {
        if (this.taskType === 'Work Package') {
            this.httpService.getProjects().subscribe(x => this.list = x.PROJECT_OVERVIEW);
        } else {
            this.httpService.getWorkPacks().subscribe(x => this.list = x.WORKING_PACKAGE_OVERVIEW);
        }
    }

    setTaskType(type: string) {
        this.taskType = type;
        switch (type) {
            case 'Project':
                this.selectedProj = undefined;
                this.selectedWP = undefined;
                this.getProjects();
                break;
            case 'Work Package':
                this.selectedWP = undefined;
                this.getWorkPacks();
                break;
            case 'Task':
                this.getTasks();
        }
    }

    selectProject(id: number) {
        return Task.get(this.taskService.projects, id);
    }

    selectWorkPack(id: number) {
        return Task.get(this.taskService.workPacks, id);
    }

    selectTasks(id: number) {
        return Task.get(this.taskService.tasks, id);
    }
}
