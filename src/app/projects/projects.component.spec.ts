import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from '../task.service';
import { HttpService} from '../http.service';

import { ProjectsComponent } from './projects.component';
import {Task} from "../../models/Task";
import {Observable} from "rxjs/Observable";
import {MessageService} from "../message.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User";

import 'rxjs/add/observable/from';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let httpService: HttpService;
  let taskService: TaskService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach((() => {
      //const spyHttpService = jasmine.createSpyObj('HttpService', ['addProject(string,string)', 'archiveTask', 'startTime']);
      const spyTaskService = jasmine.createSpyObj('TaskService', ['getProjects', 'getWorkPacks', 'getTasks']);
      const spyHttppClient = jasmine.createSpyObj('HttpClient', ['post', 'get']);
      TestBed.configureTestingModule({
      providers: [
          ProjectsComponent,
          //no spy on the HttpService
          { provide: HttpService, useValue: new HttpService(spyHttppClient,new MessageService())},
          { provide: TaskService, useValue: spyTaskService},
          { provide: HttpClient, useValue: spyHttppClient}
      ]
    });
    component = TestBed.get(ProjectsComponent);
    httpService = TestBed.get(HttpService);
    taskService = TestBed.get(TaskService);
    httpClientSpy = TestBed.get(HttpClient);
  }));

  it('should create', () => {
    expect(taskService).toBeTruthy();
    expect(httpService).toBeTruthy();
    expect(component).toBeTruthy();
    expect(httpClientSpy).toBeTruthy();
  });

  //ngOnInit
   it('ngOnInit should be executed', () => {
     //Arrange-Setup
       component.taskType = null;
       component.toAdd = null;

      //Act-make the actual call
       component.ngOnInit();

      //Assert-Check and report whether the test passed or failed
      expect(component.toAdd).toBeDefined();
      expect(component.taskType).toBe('Project');
      expect(component.toAdd.DESCRIPTION).toBe(' ');
      expect(taskService.getProjects).toHaveBeenCalled();
   });

   //addProject()
   it('if toAdd.Name is undefined then do nothing', () => {
       //Arrange
       component.ngOnInit();
       component.toAdd.NAME = undefined;

       //Act
       component.addProject();

       //Asset
       expect (component.toAdd.NAME).toBeUndefined();
       });

   //getProjects()
   it("should call taskService-Spy if the method getProjects() is called", () => {
       //Act
       component.getProjects();
       //Assert
       expect(taskService.getProjects).toHaveBeenCalled();
   });

   //getWorkPacks()
   it("should call taskService-Spy if the method getWorkPacks() is called", () => {
       //Act
       component.selectedProj = 1;
       component.getWorkPacks();
       //Assert
       expect(taskService.getWorkPacks).toHaveBeenCalled();
   });

   //getTasks()
   it("should call taskService-Spy if the method getTasks() is called", () => {//Act
       component.selectedWP = 1;
       component.getTasks();
       //Assert
       expect(taskService.getTasks).toHaveBeenCalled();
   });

   //setTaskType
   it("should set Property taskType and call method getProjects() of taskService-Spy", () => {
       //Arrange
       component.selectedProj = 1;
       component.selectedWP = 1;
       //Act
       component.setTaskType('Project');
       //Assert
       expect(component.selectedProj).toBeUndefined();
       expect(component.selectedWP).toBeUndefined();
       expect(component.taskType).toBe('Project');
       expect(taskService.getProjects).toHaveBeenCalled();
   });

   //setTaskType
   it("should set Property taskType and call method getWorkPacks() of taskService-Spy", () => {
       //Arrange
       component.selectedProj = 1;
       component.selectedWP = 1;
       //Act
       component.setTaskType('Work Package');
       //Assert
       expect(component.selectedProj).toBeDefined();
       expect(component.selectedWP).toBeUndefined();
       expect(component.taskType).toBe('Work Package');
       expect(taskService.getWorkPacks).toHaveBeenCalled();
    });

    //setTaskType
    it("should set Property taskType and call method getTasks() of taskService-Spy", () => {
        //Arrange
        component.selectedProj = 1;
        component.selectedWP = 1;
        //Act
        component.setTaskType('Task');
        //Assert
        expect(component.selectedProj).toBeDefined();
        expect(component.selectedWP).toBeDefined();
        expect(component.taskType).toBe('Task');
        expect(taskService.getTasks).toHaveBeenCalled();
    });


   //httpClientSpy to Server => taskServiceSpy gets all Project (Update)
   it('should call httpClient-Spy and taskService-Spy to get Projects, if taskType equals Project', () => {
       //Arrange
       component.taskType = 'Project';
       const toAdd = new Task();
       toAdd.NAME = 'Neues Projekt';
       toAdd.DESCRIPTION = 'SpyTestProjekt1';
       component.toAdd = toAdd;
       const user = new User();
       user.USER_ID = 1;
       httpService.user = user;

       const projects: Task[] = [
           {
               TASK_NR: 1,
               TASK_TYPE: 2,
               NAME: "Testen1 getWorkPacks()",
               STATUS: true,
               DESCRIPTION: "Erstes Work-Package",
               UNTIL_DATE: "2018-03-14",
               COMPLETION_DATE: "2018-04-15",
               PROJ_ID: 1,
               PACK_ID: 2,
               ARCHIVED: 1
           }
       ];
       //Spy auf HTTP-Client.post, which is called in the HttpService
       httpClientSpy.post.and.callFake(() => {
           return Observable.from([projects]);
       });

       //Act
       component.addProject();

       //Assert
       expect(httpClientSpy.post).toHaveBeenCalled();
       expect(taskService.getProjects).toHaveBeenCalled();
   });

   //httpClientSpy to Server => taskServiceSpy gets WorkPacks (Update)
   it('should call httpClient-Spy and taskService-Spy to get WorkPacks, if taskType equals Work Package', () => {
       //Arrange
       component.taskType = 'Work Package';
       const toAdd = new Task();
       toAdd.NAME = 'Neues Work Package';
       toAdd.DESCRIPTION = 'SpyTestWorkPackage';
       component.toAdd = toAdd;
       //WorkPackages with the PROJ_ID = 1
       component.selectedProj = 1;


       const workPackages: Task[] = [
           {
               TASK_NR: 1,
               TASK_TYPE: 2,
               NAME: "Testen1 getWorkPacks()",
               STATUS: true,
               DESCRIPTION: "Erstes Work-Package",
               UNTIL_DATE: "2018-03-14",
               COMPLETION_DATE: "2018-04-15",
               PROJ_ID: 1,
               PACK_ID: 2,
               ARCHIVED: 1
           }
       ];
       //Spy auf HTTP-Client.post, which is called in the HttpService
       httpClientSpy.post.and.callFake(() => {
           return Observable.from([workPackages]);
       });

       //Act
       component.addProject();

       //Assert
       expect(httpClientSpy.post).toHaveBeenCalled();
       expect(taskService.getWorkPacks).toHaveBeenCalled();
   });

   //httpClientSpy to Server => taskServiceSpy gets all Tasks (Update)
   it('should call httpClient-Spy and taskService-Spy to get Tasks, if taskType equals Task', () => {
       //Arrange
       component.taskType = 'Task';
       const toAdd = new Task();
       toAdd.NAME = 'Neuer Task';
       toAdd.DESCRIPTION = 'SpyTestTasks';
       component.toAdd = toAdd;
       //WorkPackages with the PACK_ID = 1
       component.selectedWP = 1;


       const tasks: Task[] = [
           {
               TASK_NR: 1,
               TASK_TYPE: 2,
               NAME: "Testen1 getWorkPacks()",
               STATUS: true,
               DESCRIPTION: "Erstes Work-Package",
               UNTIL_DATE: "2018-03-14",
               COMPLETION_DATE: "2018-04-15",
               PROJ_ID: 1,
               PACK_ID: 2,
               ARCHIVED: 1
           }
       ];
       //Spy auf HTTP-Client.post, which is called in the HttpService
       httpClientSpy.post.and.callFake(() => {
           return Observable.from([tasks]);
       });

       //Act
       component.addProject();

       //Assert
       expect(httpClientSpy.post).toHaveBeenCalled();
       expect(taskService.getTasks).toHaveBeenCalled();
   });
});
