import React from 'react';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import { IAnimal } from '../Services/WhereIsMyPetApiClient/Controllers/AnimalController';
import { useParams } from 'react-router-dom';
import AnimalCard from '../Components/AnimalCard';


function ViewAnimal() {
    const {id} = useParams();
    
    const [animal, setAnimal] = React.useState<IAnimal>();
    
    function loadAnimal() {
        if (!id) {
            return;
        }
        $WhereIsMyPetApiClient.Animals.GetAnimalDetails(parseInt(id))
                .then(({ data }) => setAnimal(data));
    }
    
    React.useEffect(() => {
        loadAnimal();
    }, [id]); 
    
    if(!animal) {
        return null;
    }
  
    return (
        <AnimalCard showDetails {...animal} loadAnimal={loadAnimal}/>
    )
}

export default ViewAnimal;