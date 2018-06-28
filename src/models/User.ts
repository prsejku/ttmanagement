export class User {
    USER_ID: number;
    USERNAME: string;
    FIRSTNAME: string;
    LASTNAME: string;
    PW: string;
    PERSON_TYPE: number;
    MAIL: string;
}

export class UserJson {
    users: User[];
}
