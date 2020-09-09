import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

interface IProps {
    position?: "absolute" | "fixed";
}

function Loader({position = "absolute"}: IProps) {
    const classes = useStyles(position)();
    return (
        <div className={classes.loader}>
            <CircularProgress />
        </div>
    )
};

const useStyles = (position: "absolute" | "fixed") => makeStyles(
    {
        loader: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.7)",
            zIndex: 10
        }
    }
);

export default Loader;