import BaseController from "./BaseController";

interface ISignUpParams {
    name: string;
    surname: string;
    email: string;
    phone: string;
    username: string;
    password: string;
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

}

export default UsersController;
