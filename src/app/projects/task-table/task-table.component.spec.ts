import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTableComponent } from './task-table.component';
import {TaskService} from "../../task.service";

describe('TaskTableComponent', () => {
    let component: TaskTableComponent;
    let taskServiceSpy: jasmine.SpyObj<TaskService>;

    beforeEach(() => {
        const taskSpy = jasmine.createSpyObj('TaskService', ['getProjects']);
        TestBed.configureTestingModule({
            providers: [
                TaskTableComponent,
                {provide: TaskService, useValue: taskSpy}
            ]});

        component = TestBed.get(TaskTableComponent);
        taskServiceSpy = TestBed.get(TaskService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(taskServiceSpy).toBeTruthy();
    });
});