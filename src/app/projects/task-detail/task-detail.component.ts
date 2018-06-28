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

  resolveStatus(status: number): string {
    if (status == 1) { return 'Completed'; } else { return 'Open'; }
  }

  changeStatus() {
    if (this.data.STATUS == 1) this.data.STATUS = 0; else this.data.STATUS = 1;
    this.status = this.resolveStatus(this.data.STATUS);
  }

  formatDate(uglyDate: string): string {
    return uglyDate;
  }

    ngOnInit(): void {
    console.log("status: "+this.data.STATUS);
      this.status = this.resolveStatus(this.data.STATUS);
    }
}
