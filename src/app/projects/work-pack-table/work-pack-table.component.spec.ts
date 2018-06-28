import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPackTableComponent } from './work-pack-table.component';
import {TaskService} from "../../task.service";

describe('WorkPackTableComponent', () => {
    let component: WorkPackTableComponent;
    let taskServiceSpy: jasmine.SpyObj<TaskService>;

    beforeEach(() => {
        const taskSpy = jasmine.createSpyObj('TaskService', ['getProjects']);
        TestBed.configureTestingModule({
            providers: [
                WorkPackTableComponent,
                {provide: TaskService, useValue: taskSpy}
            ]});

        component = TestBed.get(WorkPackTableComponent);
        taskServiceSpy = TestBed.get(TaskService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(taskServiceSpy).toBeTruthy();
    });
});