import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
//@ts-ignore
import aboutImage from "../Images/about.JPG";

function About () {
    const classes = useStyles();

    React.useEffect(() => {
        const body = document.body;
        body.classList.add(classes.body);

        return () => {
            body.classList.remove(classes.body);
        }
    }, []);
    return (
        <>
            <Grid item xs={12} className={classes.about}>
                <div className={classes.textWrapper}>

                    <h2>
                        About
                    </h2>
                    <p>
                        This website has been developed as a final thesis for the Telecommunications Technologies and Services Engineering degree.
                    </p>

                </div>
                <div className={classes.iconsLink}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </Grid>
        </>
    );
};

const useStyles = makeStyles ((theme) => ({
    body: {
        backgroundImage: `url("${aboutImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",        
    },
    about : {
        textAlign: "center",
        minHeight: "80vh",
    },
    textWrapper: {
        background: "rgba(255, 255, 255, 0.5)",
        borderRadius: "5px",
        marginTop: "320px",
        maxWidth: "600px",
        margin: "0 auto",
        ...theme.typography.body1
    },
    iconsLink: {
        ...theme.typography.caption,
        position: "absolute",
        bottom: 15,
        left: 0,
        width: "100%",
        textAlign: "center"
    }
}));

export default About;