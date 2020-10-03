import UsersController from './Controllers/UserController';
import AnimalsController from './Controllers/AnimalController';
import SpeciesController from './Controllers/SpeciesController';
import BreedsController from './Controllers/BreedController';
import ImageRecognitionController from './Controllers/ImageRecognitionController';
import NotificationController from './Controllers/NotificationController';

class WhereIsMyPetApiClient {
    public Users = new UsersController();
    public Animals = new AnimalsController();
    public Species = new SpeciesController();
    public Breeds = new BreedsController();
    public ImageRecognition = new ImageRecognitionController();
    public Notifications = new NotificationController();

    private token = "";

    public getToken () {
        if(this.token) {
            return this.token;
        }
        this.token = localStorage.getItem("user_token") || "";
        return this.token;
    }

    public setToken (token: string) {
        this.token = token;

        localStorage.setItem("user_token", token);
    }

    public clearToken() {
        localStorage.removeItem("user_token");
        this.token = "";
    }
     
}

const $WhereIsMyPetApiClient = new WhereIsMyPetApiClient();

export default $WhereIsMyPetApiClient;
