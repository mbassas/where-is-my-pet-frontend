import React from 'react';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import { Card, CardActionArea, CardContent, CardMedia, Typography, CardActions, Button, makeStyles } from '@material-ui/core';
import { IAnimal } from '../Services/WhereIsMyPetApiClient/Controllers/AnimalController';
import { useParams } from 'react-router-dom';
import moment from "moment";

function ViewAnimal() {
    const classes = useStyles();
    const {id} = useParams();

    const [animal, setAnimal] = React.useState<IAnimal>();
    React.useEffect(() => {
        if (!id) {
            return;
        }

        $WhereIsMyPetApiClient.Animals.GetAnimalDetails(parseInt(id))
            .then(({ data }) => setAnimal(data));
    }, [id]); 
    
    if(!animal) {
        return null;
    }
    const dateOffset = new Date().getTimezoneOffset();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={$WhereIsMyPetApiClient.Animals.Image(animal.id, animal.image_name)}
                />
                <CardContent className={classes.content}>
                    <div>
                        <b>Publication date:</b>
                        <br />
                        {moment(animal.publication_date).local().format("DD/MM/YYYY HH:mm")}
                    </div>
                    <div className={classes.location}>
                        <div>{animal.lat}, {animal.lng}</div>
                        <div style={{ background: "lightgrey", height: "100%" }} />
                    </div>
                    <div>
                        <b>Species:</b> {animal.species}
                    </div>
                    
                    {animal.breed && (
                    <div>
                        <b>Breed:</b> {animal.breed}
                    </div>)
                    }

                    <div>
                        <b>Status:</b> {animal.status}
                    </div>

                    {animal.size && (
                    <div>
                        <b>Size:</b> {animal.size}
                    </div>)
                    }

                    {animal.color && (
                    <div>
                        <b>Color:</b> {animal.color}
                    </div>)
                    }

                    {animal.age && (
                    <div>
                        <b>Age:</b> {animal.age}
                    </div>)
                    }

                    {animal.gender && (
                    <div>
                        <b>Gender:</b> {animal.gender}
                    </div>)
                    }

                    {animal.name && (
                    <div>
                        <b>Name:</b> {animal.name}
                    </div>)
                    }
                    
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

const useStyles = makeStyles({
    root: {
        width: 620
    },
    media: {
        height: 160,
    },
    content: {
        display: "grid",
        gridRowGap: "10px",
        gridTemplateColumns: "1fr 2fr"
    },
    location: {
        gridRow: "span 8",
    }
});

export default ViewAnimal;