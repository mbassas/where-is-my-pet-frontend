import React from "react";
import BreedFilter from "./BreedFilter";
import { IAnimalFilters } from "../../../Hooks/useAnimals";
import SpeciesFilter from "./SpeciesFilter";
import FilterChips from "./FilterChips";
import { Dialog, DialogTitle, Button, Tooltip, Fab, makeStyles, DialogContent, DialogActions } from "@material-ui/core";
import FilterIcon from "@material-ui/icons/FilterListSharp";
import AnimalImageInput from "../../UploadAnimalForm/Fields/AnimalImageInput";
import $WhereIsMyPetApiClient from "../../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";
import StatusFilter from "./StatusFilter";
import LocationFilter from "./LocationFilter";
import { useLocation, useHistory } from "react-router-dom";
import Loader from "../../Loader";

interface IProps {
    onChange: (filters: IAnimalFilters) => void;
}

function getQueryString(filters: IAnimalFilters) {
    const params = new URLSearchParams();
    Object.entries(filters).map(([name, value]) => {
        if (name === "location" || !value) return;
        
        params.append(name, value);
    })
    return params.toString();
}

function getDefaultFilters(search: string): IAnimalFilters {

    //location is the entire URL and search is the part after ?
    const params = new URLSearchParams(search);

    return {
        status: params.get("status") as any || undefined,
        species: params.get("species") || undefined,
        breed: params.get("breed") || undefined,
        lat: parseFloat(params.get("lat") || "") || undefined,
        lng: parseFloat(params.get("lng") || "") || undefined,
    }
}

function AnimalFilters ({onChange}: IProps) {
    const location = useLocation();
    const [filters, setFilters] = React.useState<IAnimalFilters>(getDefaultFilters(location.search));
    const [showFilters, setShowFilters] = React.useState(false);
    const [showImageFilter, setShowImageFilter] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false)
    const classes = useStyles();
    
    const history = useHistory();

    React.useEffect(() => {
        onChange(filters);
        history.push(`/search?${getQueryString(filters)}`);
    }, [filters]);

    const onClose = () => setShowFilters(false);
    async function onChangeImage(image: File) {
        setIsLoading(true);
        try {
            const response = await $WhereIsMyPetApiClient.ImageRecognition.UploadAnimalImage(image);
            setFilters({status: filters.status, ...response.data});
            onClose();
            setShowImageFilter(false);
        } catch{

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Tooltip title="Filter" aria-label="Filter">
                <Fab color="primary" className={classes.fab} onClick={() => setShowFilters(true)}>
                    <FilterIcon />
                </Fab>
            </Tooltip>
            <Dialog
                open={showFilters}
                onClose={onClose}
                keepMounted
                scroll="body"
            >
                <DialogTitle>Search Animals</DialogTitle>
                <DialogContent className={classes.dialog}>
                    {isLoading && <Loader />}
                    {showImageFilter && (
                        <AnimalImageInput onChange={onChangeImage}/>
                    )}
                    {!showImageFilter && (
                        <>
                            <StatusFilter
                                value={filters.status}
                                onChange={(status) => setFilters({...filters, status})}
                            />
                            <SpeciesFilter
                                value={filters.species || ""}
                                onChange={(species) => setFilters({...filters, species, breed: undefined})}
                            />
                            <BreedFilter
                                species={filters.species || ""}
                                onChange={(breed) => setFilters({...filters, breed})}
                                value={filters.breed || ""}
                            />
                            <LocationFilter
                                value={(filters.lat && filters.lng) ? {lat: filters.lat, lng: filters.lng} : undefined}
                                onChange={(lat, lng, location) => setFilters({...filters, lat, lng, location})}
                            />
                        </>
                    )}

                </DialogContent>
                <DialogActions>
                    {!showImageFilter &&
                        (
                            <Button onClick={() => setShowImageFilter(true)} color="primary" variant="outlined">
                                Search by photo
                            </Button>
                    )}
                    {showImageFilter &&
                        (
                            <Button onClick={() => setShowImageFilter(false)} color="primary" variant="outlined">
                                Search by filters
                            </Button>
                    )}
                    <Button onClick={onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <FilterChips filters={filters} setFilters={setFilters} />
        </>
    );

};

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: 5,
        right: 5,
        zIndex: 1
    },
    dialog: {
        minWidth: "80vw",
        overflowY: "hidden",
        [theme.breakpoints.up("sm")]: {
            minWidth: "410px",
        }
    }
}))

export default AnimalFilters;