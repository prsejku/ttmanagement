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

export class TaskJson {
    PROJECT_OVERVIEW: Task[];
}