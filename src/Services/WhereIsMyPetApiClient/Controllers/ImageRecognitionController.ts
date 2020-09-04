import BaseController from "./BaseController";
import { IAnimal} from "./AnimalController";

class ImageRecognitionController extends BaseController  {

    public UploadAnimalImage ( imageName: File) {
        const url = "/image-recognition";

        const data = new FormData();

        data.append("image", imageName);

        return this.makeRequest<Partial<IAnimal>>({
            method: "POST",
            url,
            params: data,
        });
    }

}

export default ImageRecognitionController;