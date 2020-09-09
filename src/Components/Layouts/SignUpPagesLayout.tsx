import React from "react";
import { Container, Grid, Paper, makeStyles } from "@material-ui/core";
import SignUpMenu from "../SignupMenu";
import Loader from "../Loader";

interface IProps {
    info?: string;
    isLoading?: boolean;
    showTabs?: boolean;
    children: React.ReactNode;
}

function SignUpPagesLayout({ children, isLoading, showTabs = true }: IProps) {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <h1 className={classes.title}>Welcome to Where is my pet?</h1>
            <Grid container justify="center">
                <Grid component={Paper} xs={12} sm={10} md={6} item className={classes.wrapper}>
                    {showTabs && <SignUpMenu />}
                    {isLoading && <Loader />}
                    {children}
                </Grid>
            </Grid>
        </Container>
    )
}

const useStyles = makeStyles({
    title: {
        marginTop: "0",
        marginBottom: "2rem",
        fontSize: "2rem",
        textAlign: "center",
        width: "100%"
    },
    container: {
        paddingTop: "3rem",
        minHeight: "100vh",
        background: "linear-gradient(rgba(167, 102, 10, 1), rgba(255, 136, 0, 1))",
    },
    wrapper: {
        padding: "1em 1.2rem",
        position: "relative",
        marginBottom: "50px"
    }
})

export default SignUpPagesLayout;
