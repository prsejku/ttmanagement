import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TaskDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Task) { }

  status: string;

  resolveStatus(status: boolean): string {
    if (status) { return 'Completed'; } else { return 'Open'; }
  }

  formatDate(uglyDate: string): string {
    return uglyDate;
  }

    ngOnInit(): void {
      this.status = this.resolveStatus(this.data.STATUS);
    }
}
