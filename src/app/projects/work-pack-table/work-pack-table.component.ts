import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../task.service";

@Component({
  selector: 'app-work-pack-table',
  templateUrl: './work-pack-table.component.html',
  styleUrls: ['./work-pack-table.component.css']
})
export class WorkPackTableComponent implements OnInit {

  columnsToDisplay = ['name', 'description', 'delete'];

  constructor(private taskService: TaskService) { }

  ngOnInit() {  }
}
