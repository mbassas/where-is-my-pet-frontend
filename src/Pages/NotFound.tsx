import React from "react";
import { makeStyles } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

function NotFound () {
    const classes = useStyles();
    return (
        <div className={classes.notFound}>
            <SentimentVeryDissatisfiedIcon fontSize="large"/>
            <h2>
                Oops! 
            </h2>
            <h3>
                There is no animal with these characteristics.
            </h3>
        </div>
    );
};

const useStyles = makeStyles ({
    notFound : {
        textAlign: "center",
        marginTop: "100px",
        gridColumn: "1/-1",
    }
});

export default NotFound;