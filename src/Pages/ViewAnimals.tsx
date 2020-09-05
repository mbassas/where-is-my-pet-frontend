import React from 'react';
import { makeStyles, Tooltip, Fab } from '@material-ui/core';
import CameraOutlined from "@material-ui/icons/AddAPhotoOutlined";
import { Link } from 'react-router-dom';
import AnimalList from '../Components/Animals/AnimalList';

function ViewAnimals() {
    const classes = useStyles();

    return (
        <>
            <AnimalList />
            <Tooltip title="Upload an animal" aria-label="Upload an animal">
                <Fab color="primary" className={classes.fab} component={Link} to="/upload-animal">
                    <CameraOutlined />
                </Fab>
            </Tooltip>
        </>
    )
};

const useStyles = makeStyles(theme => ({
    list: {
        display: "grid",
        gridGap: 22,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            gridTemplateColumns: "1fr 1fr",
        },
        [theme.breakpoints.up("md")]: {
            gridTemplateColumns: "1fr 1fr 1fr",
        }
    },
    fab: {
        position: "fixed",
        bottom: 5,
        right: 5
    }
}))

export default ViewAnimals;