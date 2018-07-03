import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../task.service";
import {MatDialog} from "@angular/material";
import {TaskDetailComponent} from "../task-detail/task-detail.component";
import {HttpService} from "../../http.service";
import {Task} from "../../../models/task";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {MessageService} from "../../message.service";

@Component({
  selector: 'app-work-pack-table',
  templateUrl: './work-pack-table.component.html',
  styleUrls: ['./work-pack-table.component.css']
})
export class WorkPackTableComponent implements OnInit {

    dC = ['name', 'description', 'delete'];

  constructor(public taskService: TaskService, public httpService: HttpService, private dialog: MatDialog, private messageService: MessageService) { }

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
          if (b) { this.log('Successfully updated the Work Package'); }
        }, _ => { this.log('Could not update Work Package'); });
      }
    });
  }

  openDeleteDialog(taskId: number, project: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(x => {
      if (x) { this.httpService.archiveTask(taskId, 2).subscribe(b => {
        if (b) {
          this.log('Successfully deleted Work Package');
          this.taskService.getWorkPacks(project);
        }
        }, () => { this.log('Could not delete Work Package'); });
      }
    });
  }

}
