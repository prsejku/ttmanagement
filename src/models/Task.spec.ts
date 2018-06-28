import { Task } from './Task';

describe('Task', () => {

    //runs before every test
    beforeEach(() => {
        //set up

    });

    //runs after every test
    afterEach(() => {
        //tear down
        //perform clear up activity

    });

    //testing method get - Successful Test
    it('should return task with a given TASK_NR', () => {
        //Arrange
       let tasks = [{
            TASK_NR: 1,
            TASK_TYPE: 0,
            NAME: "Testen01",
            STATUS: 0,
            DESCRIPTION: "Testen Models Task",
            UNTIL_DATE: "14.05.2019",
            COMPLETION_DATE: "25.10.2017",
            PROJ_ID: 1,
            PACK_ID: 2,
            ARCHIVED: 1
        },
        {
            TASK_NR: 2,
            TASK_TYPE: 0,
            NAME: "Testen02",
            STATUS: 0,
            DESCRIPTION: "Testen Models Task",
            UNTIL_DATE: "14.07.2019",
            COMPLETION_DATE: "25.04.2017",
            PROJ_ID: 4,
            PACK_ID: 2,
            ARCHIVED: 1
        },
        {
            TASK_NR: 3,
            TASK_TYPE: 0,
            NAME: "Testen03",
            STATUS: 0,
            DESCRIPTION: "Testen Models Task",
            UNTIL_DATE: "23.07.2018",
            COMPLETION_DATE: "20.03.2017",
            PROJ_ID: 4,
            PACK_ID: 2,
            ARCHIVED: 1
           }];

       let returnValue = {
           TASK_NR: 1,
           TASK_TYPE: 0,
           NAME: "Testen01",
           STATUS: 0,
           DESCRIPTION: "Testen Models Task",
           UNTIL_DATE: "14.05.2019",
           COMPLETION_DATE: "25.10.2017",
           PROJ_ID: 1,
           PACK_ID: 2,
           ARCHIVED: 1
       };

        //Act
        let actualReturnValue = Task.get(tasks,1);

        //Assert
        expect(actualReturnValue).toEqual(returnValue);
    });

    //testing method get
    it('should return UNDEFINED because of invalid TASK_NR/empty Array', () => {
        //Arrange
        let tasks = [{
            TASK_NR: 1,
            TASK_TYPE: 0,
            NAME: "Testen01",
            STATUS: 0,
            DESCRIPTION: "Testen Models Task",
            UNTIL_DATE: "14.05.2019",
            COMPLETION_DATE: "25.10.2017",
            PROJ_ID: 1,
            PACK_ID: 2,
            ARCHIVED: 1
        },
        {
            TASK_NR: 2,
            TASK_TYPE: 0,
            NAME: "Testen02",
            STATUS: 0,
            DESCRIPTION: "Testen Models Task",
            UNTIL_DATE: "14.07.2019",
            COMPLETION_DATE: "25.04.2017",
            PROJ_ID: 4,
            PACK_ID: 2,
            ARCHIVED: 1
        },
        {
            TASK_NR: 3,
            TASK_TYPE: 0,
            NAME: "Testen03",
            STATUS: 0,
            DESCRIPTION: "Testen Models Task",
            UNTIL_DATE: "23.07.2018",
            COMPLETION_DATE: "20.03.2017",
            PROJ_ID: 4,
            PACK_ID: 2,
            ARCHIVED: 1
        }];

        let tasks1 = [];

        let returnValue = {
            TASK_NR: 1,
            TASK_TYPE: 0,
            NAME: "Testen01",
            STATUS: 0,
            DESCRIPTION: "Testen Models Task",
            UNTIL_DATE: "14.05.2019",
            COMPLETION_DATE: "25.10.2017",
            PROJ_ID: 1,
            PACK_ID: 2,
            ARCHIVED: 1
        };

        //Act
        let actualReturnValue = Task.get(tasks,4);
        let actualReturnValue1 = Task.get(tasks, -1);
        let actualReturnValue2 = Task.get(tasks1, 0);

        //Assert
        expect(actualReturnValue).toBeUndefined();
        expect (actualReturnValue1).toBeUndefined();
        expect (actualReturnValue2).toBeUndefined();
    });
});
