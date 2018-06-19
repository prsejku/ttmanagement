import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTableComponent } from './project-table.component';
import {TaskService} from "../../task.service";
import {HttpService} from "../../http.service";
import {TimerHistoryComponent} from "../../timer-history/timer-history.component";

describe('ProjectTableComponent', () => {
  let component: ProjectTableComponent;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
      const taskSpy = jasmine.createSpyObj('TaskService', ['getProjects']);
      TestBed.configureTestingModule({
          providers: [
              ProjectTableComponent,
              {provide: TaskService, useValue: taskSpy}
          ]});

      component = TestBed.get(ProjectTableComponent);
      taskServiceSpy = TestBed.get(TaskService);
    });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(taskServiceSpy).toBeTruthy();
  });
});
