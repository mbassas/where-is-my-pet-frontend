import BaseController from "./BaseController";
import $WhereIsMyPetApiClient from "../WhereIsMyPetApiClient";

interface ISignUpParams {
    name: string;
    surname: string;
    email: string;
    phone: string;
    username: string;
    password: string;
}

export interface IUser {
    username: string;
    name: string;
    surname: string;
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

}

export default UsersController;
