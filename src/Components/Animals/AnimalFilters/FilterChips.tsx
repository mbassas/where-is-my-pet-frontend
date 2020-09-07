import React from "react";
import { Chip, makeStyles } from "@material-ui/core";
import { IAnimalFilters } from "../../../Hooks/useAnimals";


interface IProps {
  filters: IAnimalFilters;
  setFilters: (filters: IAnimalFilters) => void;
}

function FilterChips ({filters, setFilters}: IProps) {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            {filters.status && <Chip label={filters.status.toLocaleLowerCase()} onDelete={() => setFilters({...filters, status: undefined})} />}
            {filters.species && <Chip label={filters.species.toLocaleLowerCase()} onDelete={() => setFilters({...filters, species: undefined, breed: undefined})} />}
            {filters.breed && <Chip label={filters.breed} onDelete={() => setFilters({...filters, breed: undefined})} /> }
        </div>
    );

};

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        minWidth: "100%",
        padding: "10px 0",
        textTransform: "capitalize",
        "& > div:not(:first-child)": {
            marginLeft: "10px",
        }
    },
}))

export default FilterChips;