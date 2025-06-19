declare namespace Express {
    export interface Request {
        currentUser: any;
    }
    export interface Response {
        currentUser: any;
    }
}

interface UserPayload {
    id: string;
    email: string;
    name: string;
    avatar: string;
    role: string;
}