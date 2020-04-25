import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { useFormikContext } from "formik";
import { IAnimalFormValues, EAnimalStatus } from "../UploadAnimalForm";



function AnimalStatusInput({className}: {className?: string}) {
    const {values, setFieldValue} = useFormikContext<IAnimalFormValues>();
    return (
        <Tabs 
            value={values.status}
            variant="fullWidth"
            indicatorColor="primary"
            onChange={(_, newValue) => setFieldValue("status", newValue)}
            className={className}
        >
            <Tab value={EAnimalStatus.LOST} label="Lost" />
            <Tab value={EAnimalStatus.FOUND} label="Found" />
        </Tabs>
    )
}

export default AnimalStatusInput;
