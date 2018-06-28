import {TestBed, fakeAsync, tick} from '@angular/core/testing';

import { HttpService } from './http.service';
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

describe('HttpService', () => {
    let httpService: HttpService;
    let messageServiceSpy: jasmine.SpyObj<MessageService>;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MessageService', ['add']);
        const spyHttp = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [
                HttpService,
                {provide: MessageService, useValue: spy},
                {provide: HttpClient, useValue: spyHttp}
            ]
        });
        //Inject both the service-to-test and its (spy) dependencies
        httpService = TestBed.get(HttpService);
        messageServiceSpy = TestBed.get(MessageService);
        httpClientSpy = TestBed.get(HttpClient);
    });

    it('should be created', () => {
        expect(httpService).toBeTruthy();
        expect(messageServiceSpy).toBeTruthy();
        expect(httpClientSpy).toBeTruthy();
    });

    //Test, if fakeAsync works or not
    it('fakeAsync works', fakeAsync(() => {
        let promise = new Promise((resolve) => {
            setTimeout(resolve, 10)
        });
        let done = false;
        promise.then(() => done = true);
        tick(50);
        expect(done).toBeTruthy();
    }));

    //parseTime()
    it('should return null, if the input string is not valid (input string to long)', () => {
        //Arrange
        //const input = "[0]4:[1]2:[2]5:[1]3";
        const input = "14:25:30:14";
        //Act
        const output = HttpService.parseTime(input);
        //Assert
        expect(output).toBeNull();
    });

    //parseTime()
    it('should return null, if the input string is not valid (input string empty)', () => {
        //Arrange
        const input = " ";
        //Act
        const output = HttpService.parseTime(input);
        //Assert
        expect(output).toBeNull();
    });


    //parseTime()-Seconds
    it('should return null, if the input string is not a valid time(seconds are to high)', () => {
        //Arrange
        const input = "04:12:65";
        //Act
        const output = HttpService.parseTime(input);
        //Assert
        expect(output).toBeNull();
    });

    //parseTime()- Seconds -fails if input is "04:12:5A"
    it('should return null, if the input string is not a valid time(seconds are NaN)', () => {
        //Arrange
        const input = "04:12:A5";
        //Act
        const output = HttpService.parseTime(input);
        //Assert
        expect(output).toBeNull();
    });

    //parseTime()-Minutes
    it('should return null, if the input string is not a valid time(minutes are to high)', () => {
        //Arrange
        const input = "04:72";
        //Act
        const output = HttpService.parseTime(input);
        //Assert
        expect(output).toBeNull();
    });

    //parseTime() -Minutes - fails if input is "04:7B"
    it('should return null, if the input string is not a valid time(minutes are NaN)', () => {
        //Arrange
        const input = "04:B7";
        //Act
        const output = HttpService.parseTime(input);
        //Assert
        expect(output).toBeNull();
    });

    //parseTime()-Hours
    it('should return null, if the input string is not a valid time(hours are to high)', () => {
        //Arrange
        const input = "85:14";
        //Act
        const output = HttpService.parseTime(input);
        //Assert
        expect(output).toBeNull();
    });

    //parseTime() -Hours - fails if input is "0B:17"
    it('should return null, if the input string is not a valid time(hours are NaN)', () => {
        //Arrange
        const input = "B0:17";
        //Act
        const output = HttpService.parseTime(input);
        //Assert
        expect(output).toBeNull();
    });

    //parseTime()
    it('should return Time like this "HH:MI:SS"', () => {
        //Arrange
        const input1 = "14:30:25";
        const input2 = "14:30";
        const input3 = "1:2:4";
        const input4 = "01:02:5";
        //Act
        const output1 = HttpService.parseTime(input1);
        const output2 = HttpService.parseTime(input2);
        const output3 = HttpService.parseTime(input3);
        const output4 = HttpService.parseTime(input4);
        //Assert
        expect(output1).toEqual('14:30:25');
        expect(output2).toEqual('14:30:00');
        expect(output3).toEqual('01:02:04');
        expect(output4).toEqual('01:02:05');
    });

    //getTimeTracks()
    it('should set timeTracks property with the items returned', fakeAsync(() => {
        //Arrange Setup - Constant, which our spy will deliver
        const taskTime = {
            TASK_TIME:
                [
                    {
                        TRACK_ID: 1,
                        START_TIME: "14:25:30",
                        END_TIME: "16:24:25",
                        PROJ_ID: 1,
                        PACK_ID: 2,
                        TASK_ID: 1,
                        DIFF_IN_SEC: 405
                    }

                ]
        };

        httpClientSpy.get.and.callFake(() => {
            return Observable.from([taskTime]);
        });

        httpService.user = {
            USER_ID: 1,
            USERNAME: "verenau",
            FIRSTNAME: "Verena",
            LASTNAME: "Auberger",
            PW: "test123",
            PERSON_TYPE: 1,
            MAIL: "v.auberger@aon.at"
        };

        //Act-calling the methode/function
        httpService.getTimeTracks();
        tick();

        //Assert-Check and report whether the test passed or failed
        expect(httpService.timeTracks).toEqual(taskTime.TASK_TIME);
    }));

    //getTimeTrack()
        it('should return TIME-TRACKS from a specific TIME_ID', fakeAsync(() => {
            //Arrange Setup - Constant, which our spy will deliver
            const timeTracks = {
                TASK_TIME:
                    [
                        {
                            TRACK_ID: 1,
                            START_TIME: "14:25:30",
                            END_TIME: "16:24:25",
                            PROJ_ID: 1,
                            PACK_ID: 2,
                            TASK_ID: 1,
                            DIFF_IN_SEC: 405
                        },
                    ]
            };

            httpClientSpy.get.and.callFake(() => {
                return Observable.from([timeTracks]);
            });

            //Calling the Methode with subscribe
            httpService.getTimeTrack(1).subscribe(tt => {
                expect(tt).toEqual(timeTracks);
            });
    }));

    //getWorkPacks()
    it('should return WorkPacks', fakeAsync(() => {

        //Arrange Setup - Constant, which our spy will deliver
        const workPacks = {
            WORKING_PACKAGE_OVERVIEW:
                [
                    {
                        TASK_NR: 1,
                        TASK_TYPE: 2,
                        NAME: "Testen1 getWorkPacks()",
                        STATUS: 1,
                        DESCRIPTION: "Erstes Work-Package",
                        UNTIL_DATE: "14.05.2019",
                        COMPLETION_DATE: "14.06.2018",
                        PROJ_ID: 1,
                        PACK_ID: null,
                        ARCHIVED: 1
                    },
                    {
                        TASK_NR: 2,
                        TASK_TYPE: 2,
                        NAME: "Testen2 getWorkPacks()",
                        STATUS: 1,
                        DESCRIPTION: "Zweites Work-Package",
                        UNTIL_DATE: "14.05.2019",
                        COMPLETION_DATE: "14.06.2018",
                        PROJ_ID: 1,
                        PACK_ID: null,
                        ARCHIVED: 1
                    }
                ]
        };

        httpClientSpy.get.and.callFake(() => {
            return Observable.from([workPacks]);
        });

        //Calling the Methode with subscribe
        httpService.getWorkPacks().subscribe(tt => {
            expect(tt).toEqual(workPacks);
        });

    }));

    //getTasks()
    it('should return Tasks', fakeAsync(() => {
        //{"TASK_OVERVIEW":[{"TASK_NR":"18","TASK_TYPE":"0","NAME":"Projekt erstellen","STATUS":"0","DESCRIPTION":" ","PROJ_ID":"2","PACK_ID":"10","ARCHIVED":"1"},{"TASK_NR":"19","TASK_TYPE":"0","NAME":"Projekt bearbeiten","STATUS":"0","DESCRIPTION":" ","PROJ_ID":"2","PACK_ID":"10","ARCHIVED":"1"},
        //Arrange Setup - Constant, which our spy will deliver
        const tasks = {
            TASK_OVERVIEW:
                [
                    {
                        TASK_NR: 1,
                        TASK_TYPE: 0,
                        NAME: "Testen1 getTasks()",
                        STATUS: 1,
                        DESCRIPTION: "Erster Task",
                        UNTIL_DATE: "14.05.2019",
                        COMPLETION_DATE: "25.07.2018",
                        PROJ_ID: 1,
                        PACK_ID:2,
                        ARCHIVED: 1
                    },
                    {
                        TASK_NR: 2,
                        TASK_TYPE: 0,
                        NAME: "Testen2 getTasks()",
                        STATUS: 1,
                        DESCRIPTION: "Zweiter Task",
                        UNTIL_DATE: "24.05.2018",
                        COMPLETION_DATE: "14.05.2018",
                        PROJ_ID: 1,
                        PACK_ID:2,
                        ARCHIVED: 1
                    }
                ]
        };

        httpClientSpy.get.and.callFake(() => {
            return Observable.from([tasks]);
        });

        //Calling the Methode with subscribe
        httpService.getTasks().subscribe(tt => {
            expect(tt).toEqual(tasks);
        });

    }));

});