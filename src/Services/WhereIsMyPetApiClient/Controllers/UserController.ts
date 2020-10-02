import BaseController from "./BaseController";
import $WhereIsMyPetApiClient from "../WhereIsMyPetApiClient";

export interface ISignUpParams {
    name: string;
    surname: string;
    email: string;
    phone: string;
    username: string;
    password: string;
}

export interface IUser {
    id: number;
    username: string;
    name: string;
    surname: string;
    roles: string[];
    status: string;
}

class UsersController extends BaseController {
    public ResetPassword(token: string, password: string) {
        const url = "/users/reset-password";

        return this.makeRequest<void>({
            method: "POST",
            url,
            params: {token, newPassword: password}
        })
    }

    public SendResetPassword( usernameOrEmail: string) {
        const url = "/users/reset-password-email";

        return this.makeRequest<void>({
            method: "POST",
            url,
            params: { usernameOrEmail: usernameOrEmail }
        })
    }

    public SignUp(user: ISignUpParams) {
        const url = "/users/sign-up";

        return this.makeRequest<{ token: string }>({
            method: "POST",
            url,
            params: user
        });
    }

    public SignIn(username: string, password: string) {
        const url = "/users/sign-in";

        return this.makeRequest<{ token: string }>({
            method: "POST",
            url,
            params: { username, password }
        });
    }

    public async GetUserInfo() {
        const token = $WhereIsMyPetApiClient.getToken();

        if (!token) {
            return null;
        }

        return this.makeRequest<IUser>({
            method: "GET",
            url: "/users"
        });

    }

    public async GetUsersByStatus(status: string[]) {
        const url = "/users/by-status";

        return this.makeRequest<IUser[]>({
            method: "GET",
            url,
            queryParams: {status}    
        })
    }

    public async UpdateUser(userId: number, user: Partial<IUser>) {

        return this.makeRequest<void>({
            method: "PATCH",
            url: `/users/${userId}`,
            params: user
        })
    }

    public async ContactUser(receiverId: number, message: string, phone: boolean, email: boolean) {

        return this.makeRequest<void>({
            method: "POST",
            url: `/users/${receiverId}/contact`,
            params: {
                message: message,
                phone: phone,
                email: email
            }
        })
    }

}

export default UsersController;
