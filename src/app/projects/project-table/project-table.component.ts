import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../task.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {

    columnsToDisplay = ['name', 'description', 'delete'];

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.taskService.getProjects();
    }

}
