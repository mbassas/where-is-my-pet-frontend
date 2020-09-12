import React from 'react';
import { TextFieldProps, IconButton, InputAdornment, TextField, Tooltip } from '@material-ui/core';
import GpsFixed from '@material-ui/icons/GpsFixed';
import { getLocation, getAddress, getLatLon } from '../../Services/Geolocation/GeolocationService';
interface IOwnProps {
    inputProps?: TextFieldProps;
    autolocate?: boolean;
    onChange?: (lat: number | null, lng: number | null, location: string) => void;
    value?: {lat: number, lng: number}; 
}

function LocationInput({ onChange = () => { }, inputProps, value, autolocate = true }: IOwnProps) {
    const [displayValue, setDisplayValue] = React.useState("");

    async function locateUser() {
        const currentLocation = await getLocation();
        if(!currentLocation) {
            return;
        }
        await locateCoord(currentLocation.coords.latitude, currentLocation.coords.longitude);
    }

    async function locateCoord(lat: number, lng: number) {
        const location = await getAddress(lat, lng);
        if (!location) {
            return;
        }
        console.log(location);

        const newValue = `${location.address.postcode || ""} ${location.address.town || ""}`.trim();
        setDisplayValue(newValue);

        onChange(lat, lng, newValue);
    }

    async function locateUsingValue() {
        if (!displayValue) {
            onChange(null, null, "");
            return;
        }
        const location = await getLatLon(displayValue);
        if (!location) {
            return;
        }

        const { lat, lon, display_name } = location;
        const newValue = display_name.split(',')[0];
        setDisplayValue(newValue);

        onChange(parseFloat(lat), parseFloat(lon), newValue);
    }

    React.useEffect(() => { 
        if (autolocate) {
            locateUser(); 
        }
    }, []);

    React.useEffect(() => {
        if (!value) {
            setDisplayValue("");
            return;
        }

        locateCoord(value.lat, value.lng);
    }, [value?.lat, value?.lng])


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
            value={displayValue}
            onChange={(e) => setDisplayValue(e.currentTarget.value)}
            onBlur={locateUsingValue}
            variant="outlined"
        />
    )
}



export default LocationInput;