import React from "react";
import { makeStyles, createStyles, Theme, Select, FormControl, InputLabel } from "@material-ui/core";
import $WhereIsMyPetApiClient from "../../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";

interface IProps {
    value: string;
    onChange: (value: string) => void;
}

function SpeciesFilter({onChange, value}: IProps){
    const classes = useStyles();
    const [species, setSpecies] = React.useState<string[]>([]);
    const inputRef = React.useRef<HTMLInputElement>();    

    React.useEffect(() => {        
        $WhereIsMyPetApiClient.Species.Get()
            .then(({ data }) => setSpecies(data.sort()));            
    }, [])

    return (
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Species</InputLabel>
        <Select
            ref={inputRef}
            native
            value={species.length ? value : ""}
            onChange={(e) => {
                onChange(e.currentTarget.value as string);
            }}
            label="Species"
            inputProps={{
                name: 'species',
                id: 'outlined-age-native-simple',
            }}
            disabled={!species}
        >
            <option aria-label="None" value="" />
            {species.map((species) => (
                <option value={species}>{species}</option>
            ))}
        </Select>
    </FormControl>
    );

};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: `${theme.spacing(1)}px 0`,
            width: "100%",
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);


export default SpeciesFilter;