import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../task.service';
import {Task} from '../../../models/task';
import {TaskDetailComponent} from '../task-detail/task-detail.component';
import {isNullOrUndefined} from 'util';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {HttpService} from '../../http.service';
import {MessageService} from "../../message.service";

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {

  dC = ['name', 'description', 'delete'];

  constructor(public taskService: TaskService,
              public dialog: MatDialog,
              public httpService: HttpService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  private log(m: string) {
      this.messageService.add(m);
  }

  openDetailDialog(task: Task) {
      const dialogRef = this.dialog.open(TaskDetailComponent, {data: task});

      dialogRef.afterClosed().subscribe(x => {
          if (typeof x == 'object') {
            this.httpService.updateTask(x).subscribe(b => {
              if (b) { this.log('Project updated'); }
          }/*, _ => {this.log('Could not update project'); }*/); }
      });
  }

  openDeleteDialog(taskID: number, taskType: number) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);

      dialogRef.afterClosed().subscribe(x => {
        if (x) { this.httpService.archiveTask(taskID, taskType).subscribe(b => {
          if (b) {
            this.log('Project deleted');
            this.taskService.getProjects(); }
        }); }
      });
  }

}
