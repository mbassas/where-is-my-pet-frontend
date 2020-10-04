import React from 'react';
import { makeStyles} from '@material-ui/core';

import AnimalListContainer from '../Components/Animals/AnimalListContainer';
import AnimalFilters from '../Components/Animals/AnimalFilters/AnimalFilters';
import { IAnimalFilters } from '../Hooks/useAnimals';

function ViewAnimals() {
    const [filters, setFilters] = React.useState<IAnimalFilters>();
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <AnimalFilters onChange={(newFilters) => setFilters(newFilters)}/>
            <AnimalListContainer filters={filters}/>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%"
    }
}))

export default ViewAnimals;