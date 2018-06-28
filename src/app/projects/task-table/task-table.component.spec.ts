import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTableComponent } from './task-table.component';
import {TaskService} from "../../task.service";
import {HttpService} from "../../http.service";
import {MatDialog} from "@angular/material";

describe('TaskTableComponent', () => {
    let component: TaskTableComponent;
    let taskServiceSpy: jasmine.SpyObj<TaskService>;
    let httpServiceSpy: jasmine.SpyObj<HttpService>;
    let matDialogSpy: jasmine.SpyObj<MatDialog>;

    beforeEach(() => {
        const taskSpy = jasmine.createSpyObj('TaskService', ['getProjects']);
        const httpService = jasmine.createSpyObj('HttpService', ['enterTime']);
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['close']);
        TestBed.configureTestingModule({
            providers: [
                TaskTableComponent,
                {provide: TaskService, useValue: taskSpy},
                {provide: HttpService, useValue: httpService},
                {provide: MatDialog, useValue: dialogSpy}
            ]});

        component = TestBed.get(TaskTableComponent);
        taskServiceSpy = TestBed.get(TaskService);
        httpServiceSpy = TestBed.get(HttpService);
        matDialogSpy = TestBed.get(MatDialog);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(taskServiceSpy).toBeTruthy();
        expect(httpServiceSpy).toBeTruthy();
        expect(matDialogSpy).toBeTruthy();
    });
});