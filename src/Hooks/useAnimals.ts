import * as React from "react";
import { IAnimal } from "../Services/WhereIsMyPetApiClient/Controllers/AnimalController";
import $WhereIsMyPetApiClient from "../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";
import { EAnimalStatus } from "../Components/UploadAnimalForm/UploadAnimalForm";

export interface IAnimalFilters {
    species?: string;
    breed?: string;
    status?: EAnimalStatus;
}

function useAnimals(filters?: IAnimalFilters) {
    const [animals, setAnimals] = React.useState<IAnimal[]>();
    const [isLoading, setIsLoading] = React.useState(false);

    const breed = filters?.breed;
    const species = filters?.species;
    React.useEffect(() => {
        if (!filters) {
            return;
        }
        setIsLoading(true);

        $WhereIsMyPetApiClient.Animals.GetAnimals({
            breed: breed,
            species: species,
        }).then(({ data }) => {
            setAnimals(data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [breed, species]);

    return {
        animals,
        isLoading
    };
}

export default useAnimals;
