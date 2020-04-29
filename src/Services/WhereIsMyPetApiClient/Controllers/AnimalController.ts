import BaseController from "./BaseController";
import { IAnimalFormValues, EAnimalStatus, EAnimalSize, EAnimalGender } from "../../../Components/UploadAnimalForm/UploadAnimalForm";
import Config from "../../../config";

export interface IAnimal {
    id: number;
    user_id:number;
    status: EAnimalStatus;
    species: string;
    breed: string;
    size: EAnimalSize;
    color: string;
    name: string;
    gender: EAnimalGender;
    age: string;
    publication_date: string;
    lat: number;
    lng: number;
    image_name: string;

}
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

    public GetAnimalDetails(id: number) {
        return this.makeRequest <IAnimal>({
             method: "GET",
             url: `/animals/${id}`,
         });
    }

    public Image(id: number, imageName: string): string {
        return `${Config.BASE_URL}/animals/${id}/${imageName}.png`;
    }

}

export default AnimalsController;
