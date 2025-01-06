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
    //να δω τι στέλνει πίσω το backend όταν ο χρήστης γίνεται login
}