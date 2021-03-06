import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerComponent } from './timer.component';
import {HttpService} from "../http.service";
import {TaskService} from "../task.service";
import {AuthService} from "../auth.service";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message.service";

describe('TimerComponent', () => {
  let component: TimerComponent;
  let httpService: HttpService;
  let taskService: TaskService;
  let authService: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach((() => {
      //const spyHttpService = jasmine.createSpyObj('HttpService', ['addProject', 'archiveTask', 'getRunningTimeUser', 'startTime']);
      const spyTaskService = jasmine.createSpyObj('TaskService', ['getProjects', 'getWorkPacks', 'getTasks']);
      const spyAuthService = jasmine.createSpyObj('AuthService', ['login','logout']);
      const spyHttppClient = jasmine.createSpyObj('HttpClient', ['post', 'get']);
      TestBed.configureTestingModule({
          providers: [
              TimerComponent,
              //no spy for the httpService
              { provide: HttpService, useValue:new HttpService(spyHttppClient,new MessageService())},
              { provide: TaskService, useValue: spyTaskService},
              { provide: AuthService, useValue: spyAuthService},
              { provide: HttpClient, useValue: spyHttppClient}
          ]
      });
      component = TestBed.get(TimerComponent);
      httpService = TestBed.get(HttpService);
      taskService = TestBed.get(TaskService);
      authService = TestBed.get(AuthService);
      httpClientSpy = TestBed.get(HttpClient);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(httpService).toBeTruthy();
    expect(taskService).toBeTruthy();
    expect(authService).toBeTruthy();
    expect(httpClientSpy).toBeTruthy();
  });


  //timer()
  it('should set Property running and Property interv', () => {
      //Arrange
      component.running = null;
      component.interv = null;
      //Act
      component.timer();
      //Assert
      expect(component.running).toBeTruthy();
      expect(component.interv).toBeDefined();
  });

  //increment()
  it('should set Property displayedTime correctly', () => {
      //Arrange
      component.sek = 4;
      component.min = 7;
      component.hr = 4;
      //Act
      component.increment();
      //Assert
      expect(component.displayedTime).toBe('4:07:04');
  });

  //reset()
  it('should reset displayed time, hours, minutes and seconds', () => {
      //Arrange
      component.displayedTime = "14:30:25";
      component.hr = 14;
      component.min = 30;
      component.sek = 25;

      //Act
      component.reset();

      //Assert
      expect(component.displayedTime).toBe("0:00:00");
      expect(component.hr).toBe(0);
      expect(component.min).toBe(0);
      expect(component.sek).toBe(0);
  });

});
