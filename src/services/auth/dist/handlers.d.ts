interface LoginParams {
    username: string;
    password: string;
}
interface GetUserParams {
    token: string;
}
export declare function login(params: LoginParams): Promise<{
    token: any;
}>;
export declare function getUser(params: GetUserParams): Promise<{}>;
export {};
