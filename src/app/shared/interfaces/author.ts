import { Book } from "./book";

export interface Author {
    id: number,
    firstname: string,
    lastname: string,
    biography: string,
    books: Book[];
}

export interface AuthorRegister {
    id: number,
    firstname: string,
    lastname: string,
    biography: string,
}
