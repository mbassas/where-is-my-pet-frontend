import React from 'react';
import { TextFieldProps, IconButton, InputAdornment, TextField, Tooltip } from '@material-ui/core';
import GpsFixed from '@material-ui/icons/GpsFixed'
import Axios from 'axios';
import { getLocation, getAddress, getLatLon } from '../../Services/Geolocation/GeolocationService';
interface IOwnProps {
    inputProps: TextFieldProps;
    onChange?: (lat: number | null, lng: number | null) => void;
}

function LocationInput({ onChange = () => { }, inputProps }: IOwnProps) {
    const [value, setValue] = React.useState("");

    async function locateUser() {
        const currentLocation = await getLocation();
        const location = await getAddress(currentLocation.coords.latitude, currentLocation.coords.longitude);
        if (!location) {
            return;
        }
        console.log(location);
        const { address, lat, lon } = location;
        setValue(`${address.postcode} ${address.town}`);

        onChange(parseFloat(lat), parseFloat(lon));
    }

    async function locateUsingValue() {
        if (!value) {
            onChange(null, null);
            return;
        }
        const location = await getLatLon(value);
        if (!location) {
            return;
        }

        const { lat, lon, display_name } = location;
        setValue(display_name.split(',')[0]);

        onChange(parseFloat(lat), parseFloat(lon));
    }

    React.useEffect(() => { locateUser(); }, []);


    const locationButton = (
        <InputAdornment position="end">
            <Tooltip title="Auto locate" aria-label="add" placement="right">

                <IconButton
                    aria-label="toggle password visibility"
                    onClick={locateUser}
                    onMouseDown={(e) => { e.preventDefault(); }}
                >
                    <GpsFixed />
                </IconButton>
            </Tooltip>
        </InputAdornment>
    )

    return (
        <TextField
            type={"text"}
            InputProps={{ endAdornment: locationButton }}
            {...inputProps}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onBlur={locateUsingValue}
            variant="outlined"
        />
    )
}



export default LocationInput;