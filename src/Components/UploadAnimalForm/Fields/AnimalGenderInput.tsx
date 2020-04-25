import React from 'react';
import { useFormikContext } from 'formik';
import { IAnimalFormValues, EAnimalGender } from '../UploadAnimalForm';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

function AnimalGenderInput() {
    const {values, handleChange} = useFormikContext<IAnimalFormValues>();

    return (
        <FormControl component="fieldset" >
            <FormLabel component="legend" >Gender</FormLabel>
            <RadioGroup
                aria-label="Gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                row
            >
                <FormControlLabel
                    value={EAnimalGender.MALE}
                    control={< Radio />}
                    label="Male"
                />
                <FormControlLabel
                    value={EAnimalGender.FEMALE}
                    control={< Radio />}
                    label="Female"
                />
            </RadioGroup>
        </FormControl>
    )
}

export default AnimalGenderInput;