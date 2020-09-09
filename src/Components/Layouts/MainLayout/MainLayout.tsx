import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface IProps {
    children: React.ReactNode;
}
function MainLayout({children}: IProps) {
    const classes = useStyles();
    const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
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
