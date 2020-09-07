import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Landing() {
const classes = useStyles();

    return (
        <div className = {classes.container} >
            <Link
                to={"/search"}
                className={`${classes.button} ${classes.lost}`}
            >
                I lost an animal
            </Link>

            <Link
                to={"/upload-animal"}
                className={`${classes.button} ${classes.found}`}
            >
                I found an animal
            </Link>
        </div>
    )
};
const useStyles = makeStyles((theme) => ({
    button: {
        display: "flex",
        textDecoration: "none",
        justifyContent: "center",
        alignItems: "center",
        height: "150px",
        textTransform: "uppercase",
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.h5.fontSize,
        borderRadius: theme.shape.borderRadius,
        cursor: "pointer",
        transition: "transform 250ms ease",
        "&:hover": {
            transform: "scale(1.1)",
        },
        [theme.breakpoints.up("sm")]: {
            height: "250px",
        }
    },
    lost: {
       background: theme.palette.primary.main,
       color: theme.palette.primary.contrastText,
    },
    found :{
       background: theme.palette.secondary.main,
       color: theme.palette.secondary.contrastText,
    },
    container: {
        minHeight: "100%",
        display: "grid",
        placeContent: "center",
        gridTemplateColumns: "repeat(1, 250px)",
        gap: "50px",
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            gap: "100px",
            gridTemplateColumns: "repeat(2, 250px)",

        }
    }
}))

export default Landing;