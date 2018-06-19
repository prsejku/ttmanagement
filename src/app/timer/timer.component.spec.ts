import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerComponent } from './timer.component';
import {HttpService} from "../http.service";
import {TaskService} from "../task.service";
import {AuthService} from "../auth.service";

describe('TimerComponent', () => {
  let component: TimerComponent;
  let httpService: HttpService;
  let taskService: TaskService;
  let authService: AuthService;

  beforeEach((() => {
      const spyHttpService = jasmine.createSpyObj('HttpService', ['addProject', 'archiveTask']);
      const spyTaskService = jasmine.createSpyObj('TaskService', ['getProjects', 'getWorkPacks', 'getTasks']);
      const spyAuthService = jasmine.createSpyObj('AuthService', ['login','logout']);
      TestBed.configureTestingModule({
          providers: [
              TimerComponent,
              { provide: HttpService, useValue: spyHttpService},
              { provide: TaskService, useValue: spyTaskService},
              { provide: AuthService, useValue: spyAuthService}
          ]
      });
      component = TestBed.get(TimerComponent);
      httpService = TestBed.get(HttpService);
      taskService = TestBed.get(TaskService);
      authService = TestBed.get(AuthService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(httpService).toBeTruthy();
    expect(taskService).toBeTruthy();
    expect(authService).toBeTruthy();
  });
});
