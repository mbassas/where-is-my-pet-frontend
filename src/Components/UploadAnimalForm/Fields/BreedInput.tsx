import React from "react";
import $WhereIsMyPetApiClient from "../../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";
import { Select, FormControl, InputLabel, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useFormikContext } from "formik";
import { IAnimalFormValues } from "../UploadAnimalForm";

interface IProps {
    species: string;
}
function BreedInput({species}: IProps) {
    const [breeds, setBreeds] = React.useState<string[]>([]);
    const {values, handleChange} = useFormikContext<IAnimalFormValues>();
    const inputRef = React.useRef<HTMLInputElement>();
    const classes = useStyles();
    
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
                value={breeds.length > 0 ? values.breed : ""}
                onChange={handleChange}
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
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

export default BreedInput;