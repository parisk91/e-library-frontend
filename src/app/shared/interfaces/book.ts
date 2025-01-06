import { Author } from "./author"

export interface Book {
    id: number,
    title: string,
    description: string,
    quantity: number,
    author: Author
}
