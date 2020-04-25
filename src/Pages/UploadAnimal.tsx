import React from 'react';
import UploadAnimalFormContainer from '../Components/UploadAnimalForm/UploadAnimalForm';
import MainLayout from '../Components/Layouts/MainLayout/MainLayout';

function UploadAnimal() {

    return (
        <MainLayout>
            <UploadAnimalFormContainer />
        </MainLayout>
    )
}

export default UploadAnimal;