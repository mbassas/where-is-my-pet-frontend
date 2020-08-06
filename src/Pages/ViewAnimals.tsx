import React from 'react';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import { IAnimal } from '../Services/WhereIsMyPetApiClient/Controllers/AnimalController';
import AnimalCard from '../Components/AnimalCard';
import { makeStyles, Tooltip, Fab } from '@material-ui/core';
import CameraOutlined from "@material-ui/icons/AddAPhotoOutlined";
import { Link } from 'react-router-dom';

function ViewAnimals() {
    const classes = useStyles();
    const [animals, setAnimals] = React.useState<IAnimal[]>();
    React.useEffect(() => {
        $WhereIsMyPetApiClient.Animals.GetAnimals()
            .then(({ data }) => setAnimals(data));
    }, []);

    if (!animals) {
        return null;
    }

    return (
        <>
            <div className={classes.list}>
                {
                    animals.map(((animal) => <AnimalCard key={`animal_${animal.id}`} {...animal} />))
                }
            </div>
            <Tooltip title="Upload an animal" aria-label="Upload an animal">
                <Fab color="primary" className={classes.fab} component={Link} to="/upload-animal">
                    <CameraOutlined />
                </Fab>
            </Tooltip>
        </>
    )
};

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
    fab: {
        position: "fixed",
        bottom: 5,
        right: 5
    }
}))

export default ViewAnimals;