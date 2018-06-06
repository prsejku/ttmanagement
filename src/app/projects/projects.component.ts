import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {Task} from '../../models/task';
import {isNullOrUndefined} from 'util';
import {TaskService} from "../task.service";


@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    toAdd: Task;
    selectedProj: number;
    selectedWP: number;
    taskType: string;
    columnsToDisplay = ['name', 'description', 'delete'];
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
        if (this.toAdd.NAME != undefined) {
            console.log(this.taskType);
            switch (this.taskType) {
                case 'Project':
                    console.log("case project");
                    this.httpService.addProject(this.toAdd.NAME, this.toAdd.DESCRIPTION).subscribe(b => {
                        if (b) { console.log ("added"); this.getProjects(); }
                    }, _ => console.log("error"));
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

    getProjects() {
        this.taskService.getProjects();
    }

    getWorkPacks() {

        this.taskService.workPacks = [];
        if (!isNullOrUndefined(this.selectedProj)) {
            this.taskService.getWorkPacks(this.selectedProj);
        }
    }

    getTasks() {
        if (!isNullOrUndefined(this.selectedWP)) {
            this.taskService.getTasks(this.selectedWP);
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
