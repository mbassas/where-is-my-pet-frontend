import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CircularProgress } from "@material-ui/core";
import { useFormikContext } from "formik";
import { IAnimalFormValues} from "../UploadAnimalForm";
import $WhereIsMyPetApiClient from "../../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";

const Labels = {
    CAT: "Cat",
    DOG: "Dog",
    OTHER: "Others"
};

function SpeciesInput() {
    const { handleChange, values } = useFormikContext<IAnimalFormValues>();

    const [species, setSpecies] = React.useState<string[]>([]);

    React.useEffect(() => {
        $WhereIsMyPetApiClient.Species.Get()
            .then(({data}) => setSpecies(data));
    }, [])


    return (
        <FormControl component="fieldset" >
            <FormLabel component="legend" >Species</FormLabel>
            <RadioGroup row aria-label="Species" name="species" value={values.species} onChange={handleChange} >
                {species.map((specie) => (
                    <FormControlLabel 
                        value={specie}
                        control={< Radio />}
                        // @ts-ignore
                        label={Labels[specie] || ""} 
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default SpeciesInput;