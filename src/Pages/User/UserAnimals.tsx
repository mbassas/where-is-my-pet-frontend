import React from "react";
import AnimalList from "../../Components/Animals/AnimalList";
import $WhereIsMyPetApiClient from "../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";
import { IAnimal } from "../../Services/WhereIsMyPetApiClient/Controllers/AnimalController";
import { Grid, makeStyles, Button } from "@material-ui/core";
import AddPhotoIcon from "@material-ui/icons/AddAPhotoOutlined";
import { Link } from "react-router-dom";

function UserAnimals() {
    const [animals, setAnimals] = React.useState<IAnimal[]>();
    const [isLoading, setIsLoading] = React.useState(true);
    const classes = useStyles();

    React.useEffect(() => {
        setIsLoading(true);
        $WhereIsMyPetApiClient.Animals.GetAnimalsByUserId()
            .then((response) => {
                setAnimals(response.data);
            })
            .catch(
                e => console.error(e)
            )
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <Grid item xs={12}>
            <h2>
                Your animals
            </h2>
            <hr />
            {Boolean(isLoading || animals?.length) && (
                <AnimalList
                    isLoading={isLoading}
                    animals={animals}
                />
            )}
            {!isLoading && !animals?.length && (
                <div className={classes.notFound}>
                    <h3>
                        Looks like you don't have animals yet!
                    </h3>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddPhotoIcon />}
                        component={Link}
                        to="/upload-animal"
                    >
                        Upload an animal
                    </Button>
                </div>
            )}
        </Grid>
    )


};

const useStyles = makeStyles((theme) => ({
    notFound: {
        textAlign: "center",
        marginTop: "100px",
        gridColumn: "1/-1",
    }
}));

export default UserAnimals;