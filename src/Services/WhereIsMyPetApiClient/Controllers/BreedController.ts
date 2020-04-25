import BaseController from "./BaseController";

class BreedsController extends BaseController {
    public Get(species: string) {
        return this.makeRequest<string[]>({
            method: "GET",
            url: `/Breeds/${species}`,
            
        });
    }
}

export default BreedsController;
