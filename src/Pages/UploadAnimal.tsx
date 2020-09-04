import React from 'react';
import UploadAnimalFormContainer, { IAnimalFormValues } from '../Components/UploadAnimalForm/UploadAnimalForm';
import AnimalImageInput from '../Components/UploadAnimalForm/Fields/AnimalImageInput';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

function UploadAnimal() {
    const [formInitialValues, setFormInitialValues] = React.useState<Partial<IAnimalFormValues> | null>(null);
    const [isSubmitting, setIsSubmitting]= React.useState(false);
    const classes = useStyles();

    async function onChange(image: File) {
        setIsSubmitting(true);
        try {
            const response = await $WhereIsMyPetApiClient.ImageRecognition.UploadAnimalImage(image);
            setFormInitialValues({...response.data, images: image});
        } catch{

        } finally {
            setIsSubmitting(false);
        }        
    }
    if (!formInitialValues) {
        return (
            <>
            <AnimalImageInput
                onChange={onChange}
            />
            {isSubmitting && (
                <div className={classes.backdrop}>
                    <CircularProgress />
                </div>
            )}
            </>
        );
    }
    return (
        <UploadAnimalFormContainer initialValues={formInitialValues} />
    )
}

const useStyles = makeStyles({
    backdrop: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.5)",
        zIndex: 1
    }

})

export default UploadAnimal;