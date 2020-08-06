import React from "react";
import { Modal, Backdrop, createStyles, makeStyles, Theme, Fade, Tabs, Tab } from "@material-ui/core";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

interface IProps {
    isOpen: boolean,
    onClose: () => void,
}

function LoginModal(props: IProps) {
    const classes = useStyles();
    const [currentTab, setCurrentTab] = React.useState(0);

    return (
        <Modal
            open={props.isOpen}
            onClose={props.onClose}
            closeAfterTransition
            className={classes.modal}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.isOpen}>
                <div className={classes.paper}>
                    <Tabs value={currentTab} variant="fullWidth" indicatorColor="primary">
                        <Tab label="Sign In" onClick={() => setCurrentTab(0)}></Tab> />
                        <Tab label="Sign Up" onClick={() => setCurrentTab(1)}/>
                    </Tabs>
                    <div className={classes.paperContent}>
                        {currentTab === 0 && (
                            <SignIn 
                                onSuccess={props.onClose}
                            />
                        )}
                        {currentTab === 1 && (
                            <SignUp 
                                onSuccess={props.onClose}
                            />
                        )}
                    </div>
                </div>
            </Fade>
        </Modal>
    )

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2, 4, 3),
            borderRadius: theme.shape.borderRadius,
            width: "100vw",
            maxHeight: "90vh",
            marginTop: "5vh",
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            [theme.breakpoints.up("sm")]: {
                width: "70vw"
            },
            [theme.breakpoints.up("md")]: {
                width: "50vw"
            }
        },
        paperContent: {
            position: "relative",
            overflowY: "auto"
        }
    }),
);

export default LoginModal;