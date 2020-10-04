import React from 'react';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import { IAnimal } from '../Services/WhereIsMyPetApiClient/Controllers/AnimalController';
import { useParams } from 'react-router-dom';
import AnimalCard from '../Components/AnimalCard';
import NotExists from './NotExists';


function ViewAnimal() {
    const {id} = useParams();
    const [notFound, setNotFound] = React.useState(false);
    const [animal, setAnimal] = React.useState<IAnimal>();
    
    function loadAnimal() {
        if (!id) {
            return;
        }
        $WhereIsMyPetApiClient.Animals.GetAnimalDetails(parseInt(id))
                .then(({ data }) => setAnimal(data))
                .catch(() => setNotFound(true))
    }

    async function setAnimalBookmark(animalId: number, value: boolean) {
        if (!animal) {
            return;
        }

        try {
            if (value) {
                await $WhereIsMyPetApiClient.Bookmarks.CreateBookmark(animalId);
            } else {
                await $WhereIsMyPetApiClient.Bookmarks.deleteBookmark(animalId);
            }

            setAnimal({
                ...animal,
                bookmark: value,
            });
        } catch(e) {

        }
    }
    
    React.useEffect(() => {
        loadAnimal();
    }, [id]); 
    
    if(notFound){
        return <NotExists/>;
    }

    if(!animal) {
        return null;
    }
  
    return (
        <AnimalCard showDetails {...animal} loadAnimal={loadAnimal} setAnimalBookmark={setAnimalBookmark}/>
    )
}

export default ViewAnimal;