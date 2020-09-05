import * as React from "react";
import AnimalCard from "../AnimalCard";
import { makeStyles } from "@material-ui/core";
import { IAnimal } from "../../Services/WhereIsMyPetApiClient/Controllers/AnimalController";
import $WhereIsMyPetApiClient from "../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";
import useAnimals, { IAnimalFilters } from "../../Hooks/useAnimals";

interface IProps {
    filters?: IAnimalFilters;
}

function AnimalList({ filters = {} }: IProps) {
    const classes = useStyles();
    const {animals, isLoading} = useAnimals(filters); 

    if (!animals) {
        return null;
    }

    return (
        <div className={classes.list}>
            {
                animals.map(((animal) => <AnimalCard key={`animal_${animal.id}`} {...animal} />))
            }
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    list: {
        display: "grid",
        gridGap: 22,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            gridTemplateColumns: "1fr 1fr",
        },
        [theme.breakpoints.up("md")]: {
            gridTemplateColumns: "1fr 1fr 1fr",
        }
    },
}))

export default AnimalList;
