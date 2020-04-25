import React from 'react';
import { Formik, FormikBag, FormikHelpers, FormikConfig, Form, FormikProps, useFormikContext, Field, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, makeStyles } from '@material-ui/core';
import LocationInput from '../Inputs/LocationInput';
import SpeciesInput from './Fields/SpeciesInput';
import AnimalStatusInput from './Fields/StatusInput';
import BreedInput from './Fields/BreedInput';
import SizeInput from './Fields/SizeInput';
import AnimalImageInput from './Fields/AnimalImageInput';
import AnimalGenderInput from './Fields/AnimalGenderInput';
import $WhereIsMyPetApiClient from '../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';

export enum EAnimalStatus {
    LOST = "LOST",
    FOUND = "FOUND",
}

export enum EAnimalSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    BIG = "BIG",
    EMPTY = "",
}

export enum EAnimalGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    EMPTY = "",
}

export interface IAnimalFormValues {
    status: EAnimalStatus;
    species: string;
    breed: string;
    size: EAnimalSize;
    color: string;
    name: string;
    gender: EAnimalGender;
    age: string;
    lat?: number;
    lng?: number;
    images?: File;
}

const initialValues: IAnimalFormValues = {
    status: EAnimalStatus.FOUND,
    species: "",
    breed: "",
    size: EAnimalSize.EMPTY,
    color: "",
    name: "",
    gender: EAnimalGender.EMPTY,
    age: "",
    lat: undefined,
    lng: undefined,
    images: undefined,
}

function UploadAnimalFormContainer() {
    async function onSubmit(values: IAnimalFormValues, { setSubmitting }: FormikHelpers<IAnimalFormValues>) {
        try {
            await $WhereIsMyPetApiClient.Animals.UploadAnimal(values);
        } catch{

        } finally {
            setSubmitting(false);
        }
    }

    function validate(values: IAnimalFormValues) {
        let errors = {};
        if (!values.status) {
            // @ts-ignore
            errors.status = "You must enter the status for the animal";
        }
        if (!values.species) {
            // @ts-ignore
            errors.species = "You must enter the species for the animal";
        }
        return errors;
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
        >
            <UploadAnimalForm />
        </Formik>
    );
}

function UploadAnimalForm(/* {handleChange, handleBlur, values}: FormikProps<IAnimalFormValues> */) {
    const { isSubmitting, isValid, setFieldValue, values } = useFormikContext<IAnimalFormValues>();
    const classes = useStyles();
    return (
        <Form className={classes.form}>
            <AnimalStatusInput className={classes.statusInput} />
            <SpeciesInput />
            <BreedInput species={values.species} />
            <AnimalImageInput className={classes.animalImageInput} />
            <SizeInput />
            <Field
                component={TextField}
                name="color"
                label="Color"
                variant="outlined"
            />
            {values.status === EAnimalStatus.LOST && (
                <>
                    <Field
                        component={TextField}
                        name="age"
                        label="Pet Age"
                        variant="outlined"
                    />
                    <AnimalGenderInput />
                    <Field
                        component={TextField}
                        name="name"
                        label="Pet name"
                        variant="outlined"
                    />
                </>
            )}
            <LocationInput
                inputProps={{
                    label: "Enter your town or postcode",
                    className: classes.locationInput
                }}
                onChange={(lat, lng) => {
                    setFieldValue("lat", lat);
                    setFieldValue("lng", lng);
                }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || !isValid}
                className={classes.uploadButton}
            >
                UPLOAD
            </Button>
        </Form>
    );
}

const useStyles = makeStyles((theme) => ({
    form: {
        display: "grid",
        gridGap: "15px",
        width: "100%",
        justifyContent: "center",
        [theme.breakpoints.up("sm")]: {
            gridTemplateColumns: "1fr 1fr",
        }
    },
    statusInput: {
        [theme.breakpoints.up("sm")]: {
            gridColumn: "span 2",
        }
    },
    uploadButton: {
        [theme.breakpoints.up("sm")]: {
            gridColumn: "span 2",
        }
    },
    locationInput: {
        [theme.breakpoints.up("sm")]: {
            gridColumn: "span 2",
        }
    },
    animalImageInput: {
        [theme.breakpoints.up("sm")]: {
            gridRow: "span 5",
        }
    },

}))
export default UploadAnimalFormContainer;