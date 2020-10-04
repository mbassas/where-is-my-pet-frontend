import * as React from "react";
import { IAnimal } from "../Services/WhereIsMyPetApiClient/Controllers/AnimalController";
import $WhereIsMyPetApiClient from "../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";
import { EAnimalStatus } from "../Components/UploadAnimalForm/UploadAnimalForm";

export interface IAnimalFilters {
    species?: string;
    breed?: string;
    status?: EAnimalStatus;
    lat?: number;
    lng?: number;
    location?: string;
}

function useAnimals(filters?: IAnimalFilters) {
    const [animals, setAnimals] = React.useState<IAnimal[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(false);

    const breed = filters?.breed;
    const species = filters?.species;
    const status = filters?.status;
    const lat = filters?.lat;
    const lng = filters?.lng;

    async function setAnimalBookmark(animalId: number, value: boolean) {
        if (!animals) {
            return;
        }

        try {
            if (value) {
                await $WhereIsMyPetApiClient.Bookmarks.CreateBookmark(animalId);
            } else {
                await $WhereIsMyPetApiClient.Bookmarks.deleteBookmark(animalId);
            }

            const animal = animals?.find(i => i.id === animalId);
            if (!animal) {
                return;
            }
            animal.bookmark = value;

            setAnimals([...animals]);
        } catch(e) {

        }
    }

    async function getMoreAnimals(emptyList = false) {
        setIsLoading(true);
        
        let currentAnimals = animals || [];
        if (emptyList) {
            currentAnimals = [];
        }

        const pageSize = 6;
        try {
            const {data} = await $WhereIsMyPetApiClient.Animals.GetAnimals({
                breed: breed,
                species: species,
                status: status,
                lat: lat,
                lng: lng,
                start: currentAnimals.length,
                count: pageSize,
            });
    
            setAnimals(currentAnimals.concat(data));
            setHasMore(data.length === pageSize);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        if (!filters) {
            return;
        }

        getMoreAnimals(true);
    }, [filters]);

    return {
        animals,
        isLoading,
        getMoreAnimals,
        hasMore,
        setAnimalBookmark
    };
}

export default useAnimals;
