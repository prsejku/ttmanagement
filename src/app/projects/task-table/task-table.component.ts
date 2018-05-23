import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../task.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {

  dC = ['name', 'description', 'delete'];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

}
