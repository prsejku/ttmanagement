
export class ProjectReport {
    PROJ_ID: number;
    PACK_ID: number;
    TASK_NR: number;
    NAME: string;
    START_DATE_SOLL: string;
    UNTIL_DATE_SOLL: string;
    START_TIME_IST: string;
    END_TIME_IST: string;


    constructor() {
    }

}

export class ProjectReportJson {
    report: ProjectReport[];
}
