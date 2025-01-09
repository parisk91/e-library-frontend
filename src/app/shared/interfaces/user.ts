export interface User {
    id: number,
    username: string,
    password: string,
    email: string,
    role: string
}

export interface Credentials {
    username: string;
    password: string;
}

export interface LoggedInUser {
    username: string;
    role: string;
}