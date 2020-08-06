import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Header from "./Header";

interface IProps {
    children: React.ReactNode;
}
function MainLayout({children}: IProps) {
    const classes = useStyles();
    return (
        <>
            <Header />
            <Container>
                <Grid container justify="center" className={classes.container}>
                    {children}
                </Grid>
            </Container>
        </>
        
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: 100,
    }
}))

export default MainLayout;
