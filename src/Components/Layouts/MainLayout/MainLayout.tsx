import React from "react";
import { Container, Grid, makeStyles, Snackbar } from "@material-ui/core";
import Header from "./Header";
import Sidebar from "./Sidebar";
import useAuthentication from "../../../Hooks/useAuthentication";
import { Alert } from "@material-ui/lab";

interface IProps {
    children: React.ReactNode;
}
function MainLayout({children}: IProps) {
    const classes = useStyles();
    const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
    const [showBannedMessage, setShowBannedMessage] = React.useState(true);
    const {userInfo} = useAuthentication();
    return (
        <>
            <Header 
                openSidebar={() => setSidebarOpen(true)}
            />
            <Container>
                <Grid container justify="center" className={classes.container}>
                    {children}
                </Grid>
            </Container>
            <Sidebar 
                isOpen={sidebarOpen}
                close={() => setSidebarOpen(false)}
            />
            <Snackbar open={showBannedMessage &&  Boolean(userInfo && userInfo.status !== "Trusted")} anchorOrigin={{horizontal: "center", vertical: "bottom"}}>
                <Alert severity="warning" onClose={() => setShowBannedMessage(false)}>
                    {`Your account has been marked as ${userInfo?.status}. Some features may not work as expected.`}
                </Alert>
            </Snackbar>
        </>
        
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: 60,
        minHeight: "80vh",
        marginBottom: "60px",
        [theme.breakpoints.up("sm")]: {
            paddingTop: 70
        }
    }
}))

export default MainLayout;
