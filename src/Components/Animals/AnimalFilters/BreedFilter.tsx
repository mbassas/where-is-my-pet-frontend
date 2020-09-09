import React from "react";
import { makeStyles, createStyles, Theme, Select, FormControl, InputLabel } from "@material-ui/core";
import $WhereIsMyPetApiClient from "../../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";

interface IProps {
    species: string;
    value: string;
    onChange: (value: string) => void;
}

function BreedFilter({species, onChange, value}: IProps){
    const classes = useStyles();
    const [breeds, setBreeds] = React.useState<string[]>([]);
    const inputRef = React.useRef<HTMLInputElement>();    

    React.useEffect(() => {
        if (!species) {
            return;
        }
        
        $WhereIsMyPetApiClient.Breeds.Get(species)
            .then(({ data }) => setBreeds(data.sort()));            
    }, [species])

    return (
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Breed</InputLabel>
        <Select
            ref={inputRef}
            native
            value={breeds.length ? value : ""}
            onChange={(e) => {
                onChange(e.currentTarget.value as string);
            }}
            label="Breed"
            inputProps={{
                name: 'breed',
                id: 'outlined-age-native-simple',
            }}
            disabled={!species}
        >
            <option aria-label="None" value="" />
            {breeds.map((breed) => (
                <option value={breed}>{breed}</option>
            ))}
        </Select>
    </FormControl>
    );

};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {            
            margin: `${theme.spacing(1)}px 0`,
            width: "100%"
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);


export default BreedFilter;