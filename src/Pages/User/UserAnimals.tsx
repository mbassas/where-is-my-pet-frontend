import React from "react";
import AnimalList from "../../Components/Animals/AnimalList";
import $WhereIsMyPetApiClient from "../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";
import { IAnimal } from "../../Services/WhereIsMyPetApiClient/Controllers/AnimalController";
import { Grid, makeStyles, Button, Tabs, Tab } from "@material-ui/core";
import AddPhotoIcon from "@material-ui/icons/AddAPhotoOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import { Link } from "react-router-dom";

function UserAnimals() {
    const [currentTab, setCurrentTab] = React.useState(0);
    const [animals, setAnimals] = React.useState<IAnimal[]>();
    const [isLoading, setIsLoading] = React.useState(true);
    const classes = useStyles();

    React.useEffect(() => {
        setIsLoading(true);
        setAnimals([]);

        const getAnimalsPromise = currentTab === 0
            ? $WhereIsMyPetApiClient.Animals.GetAnimalsByUserId()
            : $WhereIsMyPetApiClient.Bookmarks.GetAnimalsByUserId();

        getAnimalsPromise
            .then((response) => {
                setAnimals(response.data);
            })
            .catch(
                e => console.error(e)
            )
            .finally(() => {
                setIsLoading(false);
            });
    }, [currentTab]);

    async function setAnimalBookmark(animalId: number, value: boolean) {
        if (!animals) {
            return;
        }

        try {
            await $WhereIsMyPetApiClient.Bookmarks.deleteBookmark(animalId);

            setAnimals(animals.filter(a => a.id !== animalId));
        } catch(e) {

        }
    }

    return (
        <Grid item xs={12}>
             <Tabs value={currentTab} variant="fullWidth" indicatorColor="primary">
                <Tab label="Your animals" onClick={() => setCurrentTab(0)} />
                <Tab label="Your Bookmarks" onClick={() => setCurrentTab(1)} />
            </Tabs>
            {currentTab === 0 && (
                <>    
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
                </>
            )}
            {currentTab === 1 && (
                <>
                    {Boolean(isLoading || animals?.length) && (
                        <AnimalList
                            isLoading={isLoading}
                            animals={animals}
                            setAnimalBookmark={setAnimalBookmark}
                        />
                    )}
                    {!isLoading && !animals?.length && (
                        <div className={classes.notFound}>
                            <h3>
                                Looks like you don't have any bookmark yet!
                            </h3>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SearchIcon />}
                                component={Link}
                                to="/search"
                            >
                                Search Animals
                            </Button>
                        </div>
                    )}
                </>
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