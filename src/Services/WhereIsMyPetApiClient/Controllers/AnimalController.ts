import BaseController from "./BaseController";
import { IAnimalFormValues } from "../../../Components/UploadAnimalForm/UploadAnimalForm";

class AnimalsController extends BaseController {

    public UploadAnimal(animal: IAnimalFormValues) {
        const url = "/animals";

        const data = new FormData();

        Object.entries(animal).forEach(([key, value]) => {
            if(value) {
                data.append(key, value);
            }
        });


        return this.makeRequest<void>({
            method: "POST",
            url,
            params: data,
        });
    }

}

export default AnimalsController;
