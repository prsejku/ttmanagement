import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';

import { TaskDetailComponent } from './task-detail.component';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {RegistrationComponent} from "../../registration/registration.component";
import {RegisterService} from "../../register.service";

describe('TaskDetailComponent', () => {
    let component: TaskDetailComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TaskDetailComponent,
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: []}
            ]
        });
        component = TestBed.get(TaskDetailComponent);
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
