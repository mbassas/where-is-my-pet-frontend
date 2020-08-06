import React from 'react';
import { Link } from "react-router-dom";
import { IAnimal } from '../Services/WhereIsMyPetApiClient/Controllers/AnimalController';
import { Card, CardActionArea, CardMedia, Chip, CardContent, makeStyles, Button, CardActions } from '@material-ui/core';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import moment from 'moment';
import CalendarToday from '@material-ui/icons/CalendarTodayOutlined';
import LocationOn from '@material-ui/icons/LocationOnOutlined';
import Pets from '@material-ui/icons/Pets';
import { ReactComponent as CatIcon } from './Icons/cat.svg';
import { ReactComponent as DogIcon } from './Icons/dog.svg';
import { ReactComponent as PawsIcon } from './Icons/paws.svg';

interface IProps extends IAnimal {
    showDetails?: boolean,
};

function AnimalCard(props: IProps) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            {props.species === "CAT" && <CatIcon className={classes.animalBadge} />}
            {props.species === "DOG" && <DogIcon className={classes.animalBadge} />}
            {props.species === "OTHER" && <PawsIcon className={classes.animalBadge} />}
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={$WhereIsMyPetApiClient.Animals.Image(props.id, props.image_name)}
                    component={Link} to={`/view-animal/${props.id}`}
                >
                    <div className={classes.chips}>
                        <Chip icon={<Pets />} label={props.status} color={props.status == "LOST" ? "secondary" : "primary"} />
                        <Chip icon={<CalendarToday />} label={moment(props.publication_date).local().fromNow()} />
                        <Chip icon={<LocationOn />} label={props.location} />

                    </div>
                </CardMedia>
            </CardActionArea>
            {props.showDetails && (
                <CardContent className={classes.content}>
                    <div>
                        <b className={classes.label}>Publication date:</b>
                        {moment(props.publication_date).local().format("DD/MM/YYYY HH:mm")}
                    </div>

                    <div className={classes.location}>
                        <img
                            src={$WhereIsMyPetApiClient.Animals.LocationImage(props.id)} className={classes.locationImage}
                            onClick={() => {
                                window.open(`http://maps.google.com/maps?q=loc:${props.lat},${props.lng}`);
                            }}
                        />
                        <div>{props.location}</div>
                    </div>

                    <div>
                        <b className={classes.label}>Species:</b>{props.species}
                    </div>

                    {props.breed && (
                        <div>
                            <b className={classes.label}>Breed:</b> {props.breed}
                        </div>
                    )}

                    <div>
                        <b className={classes.label}>Status:</b> {props.status}
                    </div>

                    {props.size && (
                        <div>
                            <b className={classes.label}>Size:</b> {props.size}
                        </div>)
                    }

                    {props.color && (
                        <div>
                            <b className={classes.label}>Color:</b> {props.color}
                        </div>)
                    }

                    {props.age && (
                        <div>
                            <b className={classes.label}>Age:</b> {props.age}
                        </div>)
                    }

                    {props.gender && (
                        <div>
                            <b className={classes.label}>Gender:</b> {props.gender}
                        </div>)
                    }

                    {props.name && (
                        <div>
                            <b className={classes.label}>Name:</b> {props.name}
                        </div>)
                    }

                </CardContent>
            )}
        </Card>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        overflow: "visible",
        width: "100%"
    },
    animalBadge: {
        height: 64,
        width: 64,
        position: "absolute",
        zIndex: 1,
        top: -16,
        left: -16,
        transform: "rotate(-20deg)"
    },
    media: {
        height: 600,
        maxHeight: "50vh",
        transition: "height 250ms",
        position: "relative",
        cursor: "pointer"
    },
    chips: {
        position: "absolute",
        bottom: 0,
        left: 0,
        "& > div": {
            margin: 5,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    content: {
        display: "grid",
        gridRowGap: "5px",
        gridTemplateColumns: "1fr 2fr",
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr 1fr",
        }
    },
    label: {
        display: "block"
    },
    location: {
        gridRow: "span 8",
        [theme.breakpoints.down("sm")]: {
            order: 8,
            gridColumn: "span 2",
                borderTop: `1px solid ${theme.palette.divider}`,
                paddingTop: "10px",
        }
    },
    locationImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        cursor: "pointer"
    }
}));

export default AnimalCard;