import React from 'react';
import { Link } from "react-router-dom";
import { IAnimal } from '../Services/WhereIsMyPetApiClient/Controllers/AnimalController';
import { Card, CardActionArea, CardMedia, Chip, CardContent, makeStyles, Button } from '@material-ui/core';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import moment from 'moment';
import CalendarToday from '@material-ui/icons/CalendarTodayOutlined';
import LocationOn from '@material-ui/icons/LocationOnOutlined';
import Pets from '@material-ui/icons/Pets';
import { ReactComponent as CatIcon } from './Icons/cat.svg';
import { ReactComponent as DogIcon } from './Icons/dog.svg';
import { ReactComponent as PawsIcon } from './Icons/paws.svg';
import ImagePreviewModal from './ImagePreviewModal';
import AnimalLocationMap from './AnimalLocationMap';
import useAuthentication from '../Hooks/useAuthentication';
import ContactUserModalContainer from '../Pages/ContactUserModal';

interface IProps extends IAnimal {
    showDetails?: boolean;
    loadAnimal?: () => void;
};

function AnimalCard(props: IProps) {
    const classes = useStyles();
    const [showImagePreviewModal, setShowImagePreviewModal] = React.useState(false);
    const [showContactModal, setShowContactModal] = React.useState(false);
    const { loadUserData, userInfo } = useAuthentication();

    return (
        <>
            <ContactUserModalContainer
                isOpen={showContactModal}
                onClose={() => setShowContactModal(false)}
                receiverId={props.user_id}
            />
            <Card className={classes.root}>
                {props.species === "CAT" && <CatIcon className={classes.animalBadge} />}
                {props.species === "DOG" && <DogIcon className={classes.animalBadge} />}
                {props.species === "OTHER" && <PawsIcon className={classes.animalBadge} />}
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={$WhereIsMyPetApiClient.Animals.Image(props.id, props.image_name)}
                        component={Link} to={`/view-animal/${props.id}`}
                        onClick={() => setShowImagePreviewModal(true)}
                    >
                        <div className={classes.chips}>
                            <Chip icon={<Pets />} label={props.status} color={props.status === "LOST" ? "secondary" : "primary"} />
                            <Chip icon={<CalendarToday />} label={moment(props.publication_date).local().fromNow()} />
                            <Chip icon={<LocationOn />} label={`${props.location} ${props.distance ? `(${props.distance.toFixed(1)}km)` : ""}`} />
                            {props.recovered && <Chip label={"RECOVERED"} />}
                        </div>
                    </CardMedia>
                </CardActionArea>
                {props.showDetails && (
                    <>
                        {showImagePreviewModal &&
                            <ImagePreviewModal onClose={() => setShowImagePreviewModal(false)}>
                                <img src={$WhereIsMyPetApiClient.Animals.Image(props.id, props.image_name)} />
                            </ImagePreviewModal>
                        }
                        <CardContent className={classes.content}>
                            <div>
                                <b className={classes.label}>Publication date:</b>
                                {moment(props.publication_date).local().format("DD/MM/YYYY HH:mm")}
                            </div>

                            <div className={classes.location}>
                                <AnimalLocationMap
                                    lat={props.lat}
                                    lng={props.lng}
                                    className={classes.map}
                                />
                                <div>
                                    {props.location}
                                </div>
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
                            <div className={classes.buttonsContainer}>
                                {!props.recovered && userInfo?.id === props.user_id && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        onClick={
                                            async () => {
                                                loadUserData();
                                                await $WhereIsMyPetApiClient.Animals.UpdateAnimal(props.id);
                                                if (props.loadAnimal) {
                                                    props.loadAnimal();
                                                }
                                            }
                                        }
                                    >
                                        Mark as recovered
                                    </Button>
                                )}
                                {props.user_id !== userInfo?.id && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        onClick={() => setShowContactModal(true)}
                                    >
                                        Contact User
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </>
                )}
            </Card>
        </>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        overflow: "visible",
        width: "100%",
        marginTop: "20px",
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
    },
    map: {
        height: "100%",
        minHeight: "250px",
    },
    buttonsContainer: {
        gridColumn: "1/-1",
    },
}));

export default AnimalCard;