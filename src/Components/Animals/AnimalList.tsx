import * as React from "react";
import AnimalCard from "../AnimalCard";
import { makeStyles, Button } from "@material-ui/core";
import useAnimals, { IAnimalFilters } from "../../Hooks/useAnimals";
import Loader from "../Loader";
import NotFound from "../../Pages/NotFound";

interface IProps {
    filters?: IAnimalFilters;
    limit?: number;
}

function AnimalList({ filters, limit = 0 }: IProps) {
    const classes = useStyles();
    const { animals, isLoading, getMoreAnimals, hasMore } = useAnimals(filters);

    let items = animals;

    if (limit) {
        items = items?.slice(0, limit);
    }

    const limitReached = limit && animals && animals.length >= limit;
    return (
        <>
            <div className={classes.list}>
                {isLoading && <Loader position="fixed"/>}
                { !isLoading && !animals?.length && <NotFound />}
                {
                    items?.map(((animal) => <AnimalCard key={`animal_${animal.id}`} {...animal} />))
                }
            </div>
            {
                (hasMore && !limitReached) && (
                    <div className={classes.viewMoreButton}>
                        <Button variant="contained" color="primary" onClick={() => getMoreAnimals()}>
                            View more
                        </Button>
                    </div>
                )
            }
        </>
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
    viewMoreButton: {
        display: "flex",
        justifyContent: "center",
        margin: "25px 0 0 0"
    }
}))

export default AnimalList;
