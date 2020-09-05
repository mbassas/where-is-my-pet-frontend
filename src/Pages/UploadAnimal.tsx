import React from 'react';
import AnimalImageInput from '../Components/UploadAnimalForm/Fields/AnimalImageInput';
import UploadAnimalFormContainer, { IAnimalFormValues } from '../Components/UploadAnimalForm/UploadAnimalForm';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import { CircularProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import AnimalList from '../Components/Animals/AnimalList';
import useAnimals from '../Hooks/useAnimals';

function UploadAnimal() {
    const [formInitialValues, setFormInitialValues] = React.useState<Partial<IAnimalFormValues>>();
    const [isSubmitting, setIsSubmitting]= React.useState(false);
    const [showUploadForm, setShowUploadForm] = React.useState(false);
    const {animals, isLoading} = useAnimals(formInitialValues);
    const classes = useStyles();

    async function onChange(image: File) {
        setIsSubmitting(true);
        try {
            const response = await $WhereIsMyPetApiClient.ImageRecognition.UploadAnimalImage(image);
            setFormInitialValues({
                ...response.data,
                images: image
            });
        } catch{

        } finally {
            setIsSubmitting(false);
        }          
    }
    if (!formInitialValues || !animals || isLoading) {
        return (
            <>
                <AnimalImageInput
                    onChange={onChange}
                />
                {(isSubmitting || isLoading) && (
                    <div className={classes.backdrop}>
                        <CircularProgress />
                    </div>
                )}
            </>
        );
    }

    if (showUploadForm || (animals?.length === 0 && !isLoading)) {
        return (
            <UploadAnimalFormContainer initialValues={formInitialValues} />
        )
    }

    return (
        <>
            <div>
                Es alguno de estos?

                <Button 
                    color="primary"
                    variant="contained"
                    onClick={()  => setShowUploadForm(true)}
                >
                    No
                </Button>

            </div>
            <AnimalList 
                filters={{
                    breed: formInitialValues.breed,
                    species: formInitialValues.species
                }}
            />
        </>
    )
}

const useStyles = makeStyles(() => ({
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
    },
}))

export default UploadAnimal;