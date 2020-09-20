import React from "react";
import { makeStyles } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

function NotExists () {
    const classes = useStyles();
    return (
        <div className={classes.notExists}>
            <SentimentVeryDissatisfiedIcon fontSize="large"/>
            <h2>
                Oops! 
            </h2>
            <h3>
                We could not find this animal.
            </h3>
        </div>
    );
};

const useStyles = makeStyles ({
    notExists : {
        textAlign: "center",
        marginTop: "100px",
        gridColumn: "1/-1",
    }
});

export default NotExists;