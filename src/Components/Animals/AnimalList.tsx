import * as React from "react";
import AnimalCard from "../AnimalCard";
import { makeStyles, Button } from "@material-ui/core";
import Loader from "../Loader";
import NotFound from "../../Pages/NotFound";
import { IAnimal } from "../../Services/WhereIsMyPetApiClient/Controllers/AnimalController";

interface IProps {
    animals?: IAnimal[];
    isLoading: boolean;
    hasMore?: boolean;
    getMoreAnimals?: () => void;
}

function AnimalList({ animals, isLoading, hasMore = false, getMoreAnimals = () => {} }: IProps) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.list}>
                {isLoading && <Loader position="fixed" />}
                {!isLoading && !animals?.length && <NotFound />}
                {
                    animals?.map(((animal) => <AnimalCard key={`animal_${animal.id}`} {...animal} />))
                }
            </div>
            {
                hasMore && (
                    <div className={classes.viewMoreButton}>
                        <Button variant="contained" color="primary" onClick={() => getMoreAnimals()}>
                            View more
                    </Button>
                    </div>
                )
            }
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
    viewMoreButton: {
        display: "flex",
        justifyContent: "center",
        margin: "25px 0 0 0"
    }
}))

export default AnimalList;