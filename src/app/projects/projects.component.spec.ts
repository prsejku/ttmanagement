import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from '../task.service';
import { HttpService} from '../http.service';

import { ProjectsComponent } from './projects.component';
import {Task} from "../../models/Task";
import {Observable} from "rxjs/Observable";

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let httpService: HttpService;
  let taskService: TaskService;

  beforeEach((() => {
      const spyHttpService = jasmine.createSpyObj('HttpService', ['addProject', 'archiveTask']);
      const spyTaskService = jasmine.createSpyObj('TaskService', ['getProjects', 'getWorkPacks', 'getTasks']);
      TestBed.configureTestingModule({
      providers: [
          ProjectsComponent,
          { provide: HttpService, useValue: spyHttpService},
          { provide: TaskService, useValue: spyTaskService}
      ]
    });
    component = TestBed.get(ProjectsComponent);
    httpService = TestBed.get(HttpService);
    taskService = TestBed.get(TaskService);
  }));

  it('should create', () => {
    expect(taskService).toBeTruthy();
    expect(httpService).toBeTruthy();
    expect(component).toBeTruthy();
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
      expect(taskService.getWorkPacks).toHaveBeenCalled();
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

   //deleteTask
   xit('should archive the task and call method getProjects() of taskService-Spy', () => {
       //Act
       component.taskType = 'Project';
       component.deleteTask(2);
       //Assert
       expect(httpService.archiveTask).toHaveBeenCalled();
   });

   xit('should call httpService-Spy to add a Project and taskService-Spy to get Projects, if taskType equals Project', () => {
       //Arrange
       component.ngOnInit();
       component.taskType = 'Project';
       component.toAdd.NAME = 'Neues Projekt';
       component.toAdd.DESCRIPTION = ' ';

       const projects: Task[] = [
           {
               TASK_NR: 1,
               TASK_TYPE:0,
               NAME: undefined,
               STATUS: 1,
               DESCRIPTION: 'SpyTestProjekt1',
               UNTIL_DATE: '14.05.2019',
               COMPLETION_DATE: '10.05.2018',
               PROJ_ID: null,
               PACK_ID: null,
               ARCHIVED: 1,
           }
       ];

       //Act
       component.addProject();

       //Assert
       expect(httpService.addProject).toHaveBeenCalled();
       //expect(component.getProjects).toHaveBeenCalled();
       //expect(taskService.getProjects).toHaveBeenCalled();
   });
});
