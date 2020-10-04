import BaseController from "./BaseController";
import $WhereIsMyPetApiClient from "../WhereIsMyPetApiClient";
import { IAnimal } from "./AnimalController";

class BookmarkController extends BaseController {

    public GetAnimalsByUserId() {
        return this.makeRequest<IAnimal[]>({
            method: "GET",
            url: "/bookmarks"
        });
    }

    public CreateBookmark (animalId: number) {
        const token = $WhereIsMyPetApiClient.getToken();

        if (!token) {
            return null;
        }
        return this.makeRequest<void>({
            method: "POST",
            url: `/bookmarks/${animalId}`
        });
    };

    public deleteBookmark (animalId: number) {
        const token = $WhereIsMyPetApiClient.getToken();

        if (!token) {
            return null;
        }
        return this.makeRequest<void>({
            method: "DELETE",
            url: `/bookmarks/${animalId}`
        });
    };
}

export default BookmarkController;