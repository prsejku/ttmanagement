export class Task {
    TASK_NR: number;​​
    TASK_TYPE: number;​​
    NAME: string;​​
    STATUS: number;​​
    DESCRIPTION: string;​​
    UNTIL_DATE: string;
    COMPLETION_DATE: string;​​
    PROJ_ID: number;
    PACK_ID: number;
    ARCHIVED: number;

    constructor() { }

    static get(array: Task[], nr: number): Task {
        for (let task of array) {
            if (task.TASK_NR == nr) return task;
        }
        return undefined;
    }
}

export class WorkPackJson {
    WORKING_PACKAGE_OVERVIEW: Task[];
}

export class TaskJson {
    TASK_OVERVIEW: Task[];
}

export class ProjectJson {
    PROJECT_OVERVIEW: Task[];
}
