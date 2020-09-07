import React from "react";
import BreedFilter from "./BreedFilter";
import { IAnimalFilters } from "../../../Hooks/useAnimals";
import SpeciesFilter from "./SpeciesFilter";
import FilterChips from "./FilterChips";
import { Dialog, DialogTitle, Button, Tooltip, Fab, makeStyles, DialogContent, DialogActions, CircularProgress } from "@material-ui/core";
import FilterIcon from "@material-ui/icons/FilterListSharp";
import AnimalImageInput from "../../UploadAnimalForm/Fields/AnimalImageInput";
import $WhereIsMyPetApiClient from "../../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";
import StatusFilter from "./StatusFilter";

interface IProps {
    onChange: (filters: IAnimalFilters) => void;
}

function AnimalFilters ({onChange}: IProps) {
    const [filters, setFilters] = React.useState<IAnimalFilters>({});
    const [showFilters, setShowFilters] = React.useState(false);
    const [showImageFilter, setShowImageFilter] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false)
    const classes = useStyles();

    React.useEffect(() => {
        onChange(filters);
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
            >
                <DialogTitle>Search Animals</DialogTitle>
                <DialogContent className={classes.dialog}>
                    {isLoading && (
                        <div className={classes.loader}>
                            <CircularProgress />
                        </div>
                    )}
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
                        </>
                    )}
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowImageFilter(true)} color="primary" variant="outlined">
                        Search by photo
                    </Button>
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
        zIndex: 100
    },
    dialog: {
        minWidth: "80vw",
        [theme.breakpoints.up("sm")]: {
            minWidth: "410px",
        }
    },
    loader: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        background: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1
    }
}))

export default AnimalFilters;