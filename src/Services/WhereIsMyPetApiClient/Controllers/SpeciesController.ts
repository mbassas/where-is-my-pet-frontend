import BaseController from "./BaseController";

class SpeciesController extends BaseController {
    public Get() {
        return this.makeRequest<string[]>({
            method: "GET",
            url: "/Species",
        });
    }
}

export default SpeciesController;
