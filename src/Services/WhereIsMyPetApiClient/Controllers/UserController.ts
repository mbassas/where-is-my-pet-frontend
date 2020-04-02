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
