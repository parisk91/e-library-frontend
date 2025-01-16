import { Book } from "./book";

export interface User {
    id: number,
    username: string,
    password: string,
    email: string,
    role: string
}

export interface UserWithBooks {
    id: number,
    username: string,
    email: string,
    role: string, 
    books: Book[]
}

export interface Credentials {
    username: string;
    password: string;
}

export interface LoggedInUser {
    username: string;
    role: string;
}