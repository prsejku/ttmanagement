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
           TASK_TYPE: 2,
           NAME: "Testen1 getWorkPacks()",
           STATUS: true,
           DESCRIPTION: "Erstes Work-Package",
           UNTIL_DATE: "2018-03-14",
           COMPLETION_DATE: "2018-04-15",
           PROJ_ID: 1,
           PACK_ID: 2,
           ARCHIVED: 1
        },
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
        },
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
           }];

       let returnValue = {
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
            TASK_TYPE: 2,
            NAME: "Testen1 getWorkPacks()",
            STATUS: true,
            DESCRIPTION: "Erstes Work-Package",
            UNTIL_DATE: "2018-03-14",
            COMPLETION_DATE: "2018-04-15",
            PROJ_ID: 1,
            PACK_ID: 2,
            ARCHIVED: 1
        },
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
        },
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
        }];

        let tasks1 = [];

        let returnValue = {
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
