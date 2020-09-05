import * as React from "react";
import { IAnimal } from "../Services/WhereIsMyPetApiClient/Controllers/AnimalController";
import $WhereIsMyPetApiClient from "../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";

export interface IAnimalFilters {
    species?: string;
    breed?: string;
}

function useAnimals(filters?: IAnimalFilters) {
    const [animals, setAnimals] = React.useState<IAnimal[]>();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (!filters) {
            return;
        }
        setIsLoading(true);

        $WhereIsMyPetApiClient.Animals.GetAnimals({
            breed: filters.breed,
            species: filters.species,
        }).then(({ data }) => {
            setAnimals(data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [filters]);

    return {
        animals,
        isLoading
    };
}

export default useAnimals;
