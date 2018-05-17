export class TaskTime {
    TRACK_ID: number;
    START_TIME: string;
    END_TIME: string;
    PROJ_ID: number;
    PACK_ID: number;
    TASK_ID: number;
    DIFF_IN_SEC: number;
}

export class TaskTimeJson {
    TASK_TIME: TaskTime[];
}