import UsersController from './Controllers/UserController';

class WhereIsMyPetApiClient {
    public Users = new UsersController();
}

const $WhereIsMyPetApiClient = new WhereIsMyPetApiClient();

export default $WhereIsMyPetApiClient;
