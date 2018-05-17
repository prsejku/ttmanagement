export class Task {
    ARCHIVED: number;
    COMPLETION_DATE: string;​​
    DESCRIPTION: string;​​
    NAME: string;​​
    STATUS: number;​​
    TASK_NR: number;​​
    TASK_TYPE: number;​​
    UNTIL_DATE: string;
}

export class WorkPackJson {
    WORKING_PACKAGE_OVERVIEW: Task[];
}

export class TaskJson {
    TASK_OVERVIEW: Task[]
}

export class ProjectJson {
    PROJECT_OVERVIEW: Task[];
}