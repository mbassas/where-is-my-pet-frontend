import React from 'react';
import AnimalImageInput from '../Components/UploadAnimalForm/Fields/AnimalImageInput';
import UploadAnimalFormContainer, { IAnimalFormValues } from '../Components/UploadAnimalForm/UploadAnimalForm';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import { Button, makeStyles} from '@material-ui/core';
import AnimalList from '../Components/Animals/AnimalList';
import useAnimals from '../Hooks/useAnimals';
import Loader from '../Components/Loader';
import { getLocation } from '../Services/Geolocation/GeolocationService';
import useAuthentication from '../Hooks/useAuthentication';
import LoginModal from '../Components/LoginModal/LoginModal';

function UploadAnimal() {
    const [formInitialValues, setFormInitialValues] = React.useState<Partial<IAnimalFormValues>>();
    const [isSubmitting, setIsSubmitting]= React.useState(false);
    const [showUploadForm, setShowUploadForm] = React.useState(false);
    const {animals, isLoading} = useAnimals(formInitialValues);
    const {userInfo, loadUserData} = useAuthentication();
    const classes = useStyles();

    async function onChange(image: File) {
        setIsSubmitting(true);
        try {
            const response = await $WhereIsMyPetApiClient.ImageRecognition.UploadAnimalImage(image);
            const currentLocation = await getLocation();
            
            setFormInitialValues({
                ...response.data,
                lat: currentLocation?.coords.latitude,
                lng: currentLocation?.coords.longitude,
                images: image
            });
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }          
    }
    if (!formInitialValues || !animals || isLoading) {
        return (
            <div>
                <h3>
                    Upload/Take a photo of the animal you found:
                </h3>
                <AnimalImageInput
                    onChange={onChange}
                />
                {(isSubmitting || isLoading) && <Loader />}
            </div >
        );
    }

    if (showUploadForm || (animals?.length === 0 && !isLoading)) {
        return (
            <>  
                <LoginModal 
                    isOpen={!userInfo}
                    onClose={() => {
                        if($WhereIsMyPetApiClient.getToken()) {
                            loadUserData();
                        } else {
                            setFormInitialValues(undefined);
                        }
                    }} 
                />
                <UploadAnimalFormContainer initialValues={formInitialValues} />
            </>
        )
    }

    return (
        <>
            <div className={classes.anyOfThese}>
                <h3>
                    Is it any of these?
                </h3>
                <Button 
                    color="primary"
                    variant="contained"
                    onClick={()  => setShowUploadForm(true)}
                >
                    No
                </Button>
            </div>
            <div className={classes.spacer} />
            <AnimalList
                limit={3} 
                filters={{
                    breed: formInitialValues.breed,
                    species: formInitialValues.species,
                    lat: formInitialValues.lat,
                    lng: formInitialValues.lng
                }}
            />
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    spacer: {
        width: "100%",
        height: "56px"
    },
    anyOfThese: {
        display: "flex",
        width: "100vw",
        alignItems: "center",
        background: theme.palette.background.default,
        boxShadow: theme.shadows[3],
        position: "fixed",
        left: 0,
        top: "56px",
        placeContent: "center",
        zIndex: 2,
        "& > button": {
            marginLeft: "1ch",
            height: "2em"
        }
    }
}));

export default UploadAnimal;