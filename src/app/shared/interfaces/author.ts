export interface Author {
    filter(arg0: (teacher: any) => boolean): Author;
    id: number,
    firstname: string,
    lastname: string,
    biography: string,
}
