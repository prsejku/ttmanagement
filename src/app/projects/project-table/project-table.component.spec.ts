import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTableComponent } from './project-table.component';
import {TaskService} from "../../task.service";
import {HttpService} from "../../http.service";
import {TimerHistoryComponent} from "../../timer-history/timer-history.component";
import {MatDialog} from "@angular/material";
import {} from 'jasmine';

describe('ProjectTableComponent', () => {
  let component: ProjectTableComponent;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
      const taskSpy = jasmine.createSpyObj('TaskService', ['getProjects']);
      const httpSpy = jasmine.createSpyObj('HttpService', ['enterTime']);
      const dialog = jasmine.createSpyObj('MatDialog', ['close']);
      TestBed.configureTestingModule({
          providers: [
              ProjectTableComponent,
              {provide: TaskService, useValue: taskSpy},
              {provide: HttpService, useValue: httpSpy},
              {provide: MatDialog, useValue: dialog}
          ]});

      component = TestBed.get(ProjectTableComponent);
      taskServiceSpy = TestBed.get(TaskService);
      httpServiceSpy = TestBed.get(HttpService);
      dialogSpy = TestBed.get(MatDialog);
    });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(taskServiceSpy).toBeTruthy();
    expect(httpServiceSpy).toBeTruthy();
    expect(dialogSpy).toBeTruthy();
  });
});
