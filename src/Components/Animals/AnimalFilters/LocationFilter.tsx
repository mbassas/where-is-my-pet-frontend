import React from "react";
import LocationInput from "../../Inputs/LocationInput";
import { makeStyles } from "@material-ui/core";

interface IProps {
    value?: {lat: number, lng: number};
    onChange: (lat: number, lng: number, location: string) => void;
}

function LocationFilter({onChange, value}: IProps) {
    const classes = useStyles();

    return (
        <LocationInput
            value={value}
            autolocate={false}
            inputProps={{
                label: "Enter your town or postcode",
                className: classes.input
            }}
            onChange={(lat, lng, location) => {
                if (!lat || !lng) {
                    return;
                }

                onChange(lat, lng, location);
            }}
        
        />
    )
}

const useStyles = makeStyles((theme) => ({
    input: {
        width: "100%",
    }
}))

export default LocationFilter;