import React from "react";
import { Container, Grid } from "@material-ui/core";
import Header from "./Header";

interface IProps {
    children: React.ReactNode;
}
function MainLayout({children}: IProps) {
    return (
        <>
            <Header />
            <Container>
                <Grid container justify="center">
                    {children}
                </Grid>
            </Container>
        </>
        
    )
}

export default MainLayout;
