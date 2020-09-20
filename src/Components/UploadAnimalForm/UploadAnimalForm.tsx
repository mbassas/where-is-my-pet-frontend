import React from 'react';
import { Formik, FormikHelpers, Form, useFormikContext, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, makeStyles } from '@material-ui/core';
import LocationInput from '../Inputs/LocationInput';
import SpeciesInput from './Fields/SpeciesInput';
import AnimalStatusInput from './Fields/StatusInput';
import BreedInput from './Fields/BreedInput';
import SizeInput from './Fields/SizeInput';
import AnimalGenderInput from './Fields/AnimalGenderInput';
import $WhereIsMyPetApiClient from '../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import { Redirect } from 'react-router-dom';
import AnimalImagePreview from './AnimalImagePreview';
import Loader from '../Loader';

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
    location: string;
    images?: File;
}

const defaultInitialValues: IAnimalFormValues = {
    status: EAnimalStatus.LOST,
    species: "",
    breed: "",
    size: EAnimalSize.EMPTY,
    color: "",
    name: "",
    gender: EAnimalGender.EMPTY,
    age: "",
    lat: undefined,
    lng: undefined,
    location: "",
    images: undefined,
}

interface IProps {
    initialValues: Partial<IAnimalFormValues>;
}

function UploadAnimalFormContainer({initialValues}: IProps) {
    const [createdAnimalId, setCreatedAnimalId] = React.useState(-1);
    async function onSubmit(values: IAnimalFormValues, { setSubmitting }: FormikHelpers<IAnimalFormValues>) {
        try {
            const response = await $WhereIsMyPetApiClient.Animals.UploadAnimal(values);
            setCreatedAnimalId(response.data.id);
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
        if(!values.lat || !values.lng) {
            // @ts-ignore
            errors.lat = "Location is required";
            // @ts-ignore
            errors.lng = "Location is required";
        }
        return errors;
    }

    return (
        <>
        <Formik
            initialValues={{...defaultInitialValues, ...initialValues}}
            onSubmit={onSubmit}
            validate={validate}
        >
            <UploadAnimalForm />
        </Formik>
        {createdAnimalId !== -1 && (
            <Redirect to={`/view-animal/${createdAnimalId}`}/>
        )}
        </>
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
            <AnimalImagePreview className={classes.animalImageInput} />
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
                onChange={(lat, lng, location) => {
                    setFieldValue("lat", lat);
                    setFieldValue("lng", lng);
                    setFieldValue("location", location);
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
            {isSubmitting && <Loader />}
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
    }
}))
export default UploadAnimalFormContainer;