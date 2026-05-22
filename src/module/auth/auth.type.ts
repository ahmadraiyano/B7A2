export type SignUP = {
    name: string;
    email: string;
    password: string;
    role?: string
}
export type LogIn = {
    email: string;
    password: string
}