import React from "react";
import { Container, Grid, Paper, makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import SignUpMenu from "../SignupMenu";

interface IProps {
    info?: string;
    isLoading?: boolean;
    children: React.ReactNode;
}

function SignUpPagesLayout({ children, info, isLoading }: IProps) {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <h1 className={classes.title}>Welcome to Where is my pet?</h1>
            <Grid container justify="center">
                <Grid component={Paper} xs={12} sm={10} md={6} item className={classes.wrapper}>
                    <SignUpMenu />
                    {isLoading && (
                        <div className={classes.backdrop}>
                            <CircularProgress />
                        </div>
                    )}
                    <p>{info}</p>
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
        position: "relative"
    },
    backdrop: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.5)",
        zIndex: 1
    }
})

export default SignUpPagesLayout;
