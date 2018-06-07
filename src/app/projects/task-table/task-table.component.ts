import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../task.service';
import { Task } from '../../../models/task';
import {MatDialog, MatDialogRef} from '@angular/material';
import {TaskDetailComponent} from '../task-detail/task-detail.component';
import {HttpService} from '../../http.service';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {

  dC = ['name', 'description', 'delete'];

  constructor(private taskService: TaskService,
              private httpService: HttpService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDetailDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskDetailComponent, {data: task});

    dialogRef.afterClosed().subscribe(x => {
      if (!isNullOrUndefined(x)) { this.httpService.updateTask(x).subscribe(b => {
        console.log('Projekt upgedatet!');
      }); }
      console.log(x.NAME);
    });
  }

  openDeleteDialog(taskID: number, taskType: string) {
    // this.httpService.archiveTask(taskID, taskType);
    this.dialog.open(ConfirmationDialogComponent);
  }

}
