import { useFormikContext } from "formik";
import { IAnimalFormValues, EAnimalSize } from "../UploadAnimalForm";
import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, useTheme, useMediaQuery } from "@material-ui/core";

function SizeInput(){
    const {values, handleChange} = useFormikContext<IAnimalFormValues>();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <FormControl component="fieldset" >
            <FormLabel component="legend" >Size</FormLabel>
            <RadioGroup 
                aria-label="Size"
                name="size"
                value={values.size}
                onChange={handleChange}
                row={isSmallScreen}
            >
                <FormControlLabel
                    value={EAnimalSize.SMALL}
                    control={< Radio />}
                    label="Small"
                />
                <FormControlLabel
                    value={EAnimalSize.MEDIUM}
                    control={< Radio />}
                    label="Medium"
                />
                <FormControlLabel
                    value={EAnimalSize.BIG}
                    control={< Radio />}
                    label="Big"
                />
            </RadioGroup>
        </FormControl>
    )
}

export default SizeInput;