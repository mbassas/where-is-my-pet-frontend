import * as React from "react";
import useAnimals, { IAnimalFilters } from "../../Hooks/useAnimals";
import AnimalList from "./AnimalList";

interface IProps {
    filters?: IAnimalFilters;
    limit?: number;
}

function AnimalListContainer({ filters, limit = 0 }: IProps) {
    const { animals, isLoading, getMoreAnimals, hasMore, setAnimalBookmark } = useAnimals(filters);

    let items = animals;

    if (limit) {
        items = items?.slice(0, limit);
    }

    const limitReached = Boolean(limit && animals && animals.length >= limit);
    return (
        <AnimalList 
            animals={animals}
            isLoading={isLoading}
            getMoreAnimals={getMoreAnimals}
            hasMore={hasMore && !limitReached} 
            setAnimalBookmark={setAnimalBookmark}
        />
    )
}

export default AnimalListContainer;
