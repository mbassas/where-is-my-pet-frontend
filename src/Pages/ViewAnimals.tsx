import React from 'react';
import { makeStyles} from '@material-ui/core';

import AnimalList from '../Components/Animals/AnimalList';
import AnimalFilters from '../Components/Animals/AnimalFilters/AnimalFilters';
import { IAnimalFilters } from '../Hooks/useAnimals';

function ViewAnimals() {
    const [filters, setFilters] = React.useState<IAnimalFilters>();
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <AnimalFilters onChange={(newFilters) => setFilters(newFilters)}/>
            <AnimalList filters={filters}/>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%"
    }
}))

export default ViewAnimals;