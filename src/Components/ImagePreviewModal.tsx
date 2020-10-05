import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { makeStyles } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';


interface IProps {
    children: React.ReactNode;
    onClose: () => void,
}

function ImagePreviewModal({ children, onClose }: IProps) {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <CloseIcon fontSize="large" className={classes.closeIcon} onClick={onClose}/>  
            <TransformWrapper >
                <TransformComponent>
                    {children}
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: "fixed",
        top: "0px",
        left: "0px",
        height: "100%",
        width: "100%",
        zIndex: 2000,
        background: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        alignItems: "center",   
        justifyContent: "center",     
        "& > div": {
            overflow: "visible"
        },
        "& div": {
            maxHeight: "100%",
            maxWidth: "100%",
            justifyContent: "center"
        },
        "& img": {
            maxHeight: "90%",
            maxWidth: "90%"
        }
    },
    closeIcon :{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 1,
        background: "rgba(255, 255, 255, .3)",
        borderRadius: "100%"
    }
}));

export default ImagePreviewModal;