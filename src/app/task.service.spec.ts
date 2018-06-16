import {TestBed, ComponentFixture, inject, fakeAsync, tick} from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpService} from './http.service';
import { Task } from '../models/Task';
import { Observable } from 'rxjs/Observable';
import'rxjs/add/observable/from';


describe('TaskService', () => {

  let masterService: TaskService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['getProjects', 'getWorkPacks', 'getTasks']);

    TestBed.configureTestingModule({
      //Provide both the service-to-test and its dependency
      providers: [
        TaskService,
        {provide: HttpService, useValue: spy}
      ]
    });

    masterService = TestBed.get(TaskService);
    httpServiceSpy = TestBed.get(HttpService);
  });

  //TaskService und HttpService should be created
  it('should be created',() => {
    expect(masterService).toBeTruthy();
    expect(httpServiceSpy).toBeTruthy();
  });

  //getProjects()
  it('should set project property with the items returned', fakeAsync(() => {
      //Arrange Setup
      const projects = {
          PROJECT_OVERVIEW:
              [
                  {
                      TASK_NR: 1,
                      TASK_TYPE: 1,
                      NAME: "Projektmanagement",
                      STATUS: 0,
                      DESCRIPTION: "Dokumentation,Qualit\u00e4t,Planung",
                      UNTIL_DATE: "1-1-18",
                      ARCHIVED: 0,
                      PROJ_ID: 2,
                      PACK_ID: 3,
                      COMPLETION_DATE: "1-1-16",
                  }
              ]
      };
      // httpServiceSpy.getProjects.and.returnValues([projects]);
      httpServiceSpy.getProjects.and.callFake(() => {
          return Observable.from([projects]);
      });

      //Act-calling the methode/function
      masterService.getProjects();
      tick();

      //Assert-Check and report whether the test passed or failed
      expect(masterService.projects).toEqual(projects.PROJECT_OVERVIEW);
  }));

  //getWorkPacks() - Successful Test
  //const value = {"WORKING_PACKAGE_OVERVIEW":[{"TASK_NR":"4","TASK_TYPE":"2","NAME":"Planung","STATUS":"0","DESCRIPTION":"Allgemeine Projektplanung","PROJ_ID":"1","ARCHIVED":"1"},{"TASK_NR":"5","TASK_TYPE":"2","NAME":"Qualit\u00e4tsmanagement","STATUS":"0","DESCRIPTION":"Code Review, Code-Qualit\u00e4t, UI-Qualit\u00e4t","PROJ_ID":"1","ARCHIVED":"1"};
    it('should set workPacks property with the items returned', fakeAsync(() => {
      //Arrange Setup - Constant, which our spy will deliver
      const workingPackages = {
          WORKING_PACKAGE_OVERVIEW:
              [
                  {
                      TASK_NR: 1,
                      TASK_TYPE: 2,
                      NAME: "Testen Working Package",
                      STATUS: 0,
                      DESCRIPTION: "Dokumentation,Qualit\u00e4t,Planung",
                      UNTIL_DATE: "1-1-18",
                      ARCHIVED: 0,
                      PROJ_ID: 1,
                      PACK_ID: null,
                      COMPLETION_DATE: "1-1-16",
                  },
                  {
                      TASK_NR: 2,
                      TASK_TYPE: 2,
                      NAME: "Testen Working Package1",
                      STATUS: 0,
                      DESCRIPTION: "Dokumentation,Qualit\u00e4t,Planung",
                      UNTIL_DATE: "1-1-18",
                      ARCHIVED: 1,
                      PROJ_ID: 3,
                      PACK_ID: null,
                      COMPLETION_DATE: "1-1-16",
                  }
              ]
      };

      //Value, which our function-to-test should deliver
      const returnValue = {
          WORKING_PACKAGE_OVERVIEW:
              [
                  {
                      TASK_NR: 1,
                      TASK_TYPE: 2,
                      NAME: "Testen Working Package",
                      STATUS: 0,
                      DESCRIPTION: "Dokumentation,Qualit\u00e4t,Planung",
                      UNTIL_DATE: "1-1-18",
                      ARCHIVED: 0,
                      PROJ_ID: 1,
                      PACK_ID: null,
                      COMPLETION_DATE: "1-1-16",
                  }
              ]
      };
     httpServiceSpy.getWorkPacks.and.callFake(() => {
        return Observable.from([workingPackages]);
     });

     //Act-calling the methode/function
     masterService.getWorkPacks(1);
     tick();

     //Assert-Check and report whether the test passed or failed
     expect(masterService.workPacks).toEqual(returnValue.WORKING_PACKAGE_OVERVIEW);
  }));

  //getWorkPacks() - should not set workPacks because of null/undefined Project_ID
  it('should set workPacks property to [] because of null/undefined Project-ID', fakeAsync(() => {
     //Arrange Setup
     const workingPackages = {
         WORKING_PACKAGE_OVERVIEW:
            [
                {
                    TASK_NR: 1,
                    TASK_TYPE: 2,
                    NAME: "Testen Working Package",
                    STATUS: 0,
                    DESCRIPTION: "Dokumentation,Qualit\u00e4t,Planung",
                    UNTIL_DATE: "1-1-18",
                    ARCHIVED: 0,
                    PROJ_ID: 1,
                    PACK_ID: null,
                    COMPLETION_DATE: "1-1-16",
                }
            ]
     };

     httpServiceSpy.getWorkPacks.and.callFake(() => {
        return Observable.from([workingPackages]);
     });

     //Act-calling the methode/function (Project_ID will be null)
     masterService.getWorkPacks(null);
     tick();

     //Assert-Check and report whether the test passed or failed
     expect(masterService.workPacks).toEqual([]);
  }));

  //getTasks() - Successful Test
  it('should set tasks property with the items returned', fakeAsync(() => {
     //Arrange Setup - Constant, which our spy will deliver
     //TASK_TYPE = 0 => TASK
     const tasks = {
         TASK_OVERVIEW:
            [
                {
                    TASK_NR: 1,
                    TASK_TYPE: 0,
                    NAME: "Testen Tasks",
                    STATUS: 0,
                    DESCRIPTION: "Task des WorkPacks NR. 3",
                    UNTIL_DATE: "1-1-18",
                    ARCHIVED: 0,
                    PROJ_ID: 1,
                    PACK_ID: 3,
                    COMPLETION_DATE: "1-1-16",
                },
                {
                    TASK_NR: 2,
                    TASK_TYPE: 0,
                    NAME: "Testen Task1",
                    STATUS: 0,
                    DESCRIPTION: "Task des WorkPacks NR. 4",
                    UNTIL_DATE: "1-1-18",
                    ARCHIVED: 1,
                    PROJ_ID: 1,
                    PACK_ID: 4,
                    COMPLETION_DATE: "1-1-16",
                }
            ]
     };

     //Value, which our function-to-test should deliver
     const returnValue = {
         TASK_OVERVIEW:
            [
                {
                    TASK_NR: 1,
                    TASK_TYPE: 0,
                    NAME: "Testen Tasks",
                    STATUS: 0,
                    DESCRIPTION: "Task des WorkPacks NR. 3",
                    UNTIL_DATE: "1-1-18",
                    ARCHIVED: 0,
                    PROJ_ID: 1,
                    PACK_ID: 3,
                    COMPLETION_DATE: "1-1-16",
                }
            ]
     };
     httpServiceSpy.getTasks.and.callFake(() => {
        return Observable.from([tasks]);
     });

     //Act-calling the methode/function
     masterService.getTasks(3);
     tick();

     //Assert-Check and report whether the test passed or failed
     expect(masterService.tasks).toEqual(returnValue.TASK_OVERVIEW);
  }));

  //getTasks() - should not set tasks because of null/undefined PACK_ID
  it('should set tasks property to [] because of null/undefined PACK_ID', fakeAsync(() => {
    //Arrange Setup
    //TASK_TYPE = 0
    const tasks = {
        TASK_OVERVIEW:
            [
                {
                    TASK_NR: 1,
                    TASK_TYPE: 0,
                    NAME: "Testen TASK with undefined PACK_ID",
                    STATUS: 0,
                    DESCRIPTION: "PACK_ID = 0",
                    UNTIL_DATE: "1-1-18",
                    ARCHIVED: 0,
                    PROJ_ID: 1,
                    PACK_ID: null,
                    COMPLETION_DATE: "1-1-16",
                }
            ]
    };

    httpServiceSpy.getTasks.and.callFake(() => {
        return Observable.from([tasks]);
    });

    //Act-calling the methode/function (Project_ID will be null)
    masterService.getTasks(null);
    tick();

    //Assert-Check and report whether the test passed or failed
    expect(masterService.tasks).toEqual([]);
  }));
});
