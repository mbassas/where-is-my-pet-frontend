import React, { FormEvent } from 'react';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import { TextField, Button, makeStyles, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useLocation } from 'react-router-dom';


function RecoverPassword() {
    const query = new URLSearchParams(useLocation().search);
    const h = query.get("h");
    
    return (
        <>
            {!h && <RecoverPasswordWithoutToken />} 
            {h && <RecoverPasswordWithToken token={h} />}
        </>
    )
}

function RecoverPasswordWithoutToken () {
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = React.useState<boolean>(false);
    const [submitError, setSubmitError] = React.useState<boolean>(false);
    const [emptyField, setEmptyField] = React.useState<boolean>(false);
    const [invalidParams, setInvalidParams] = React.useState<boolean>(false);
    const [usernameOrEmail, setUsernameOrEmail] = React.useState<string>("");
    const classes = useStyles();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setSubmitError(false);
        setSubmitSuccess(false);
        setEmptyField(false);
        setInvalidParams(false);

        if(!usernameOrEmail) {
            setEmptyField(true);
            return;
        }

        try {
            setIsSubmitting(true);
            await $WhereIsMyPetApiClient.Users.SendResetPassword(usernameOrEmail);
            setSubmitSuccess(true);
        } catch (e) {
            if (/Invalid Username or Email/.test(e?.response?.data)){
                setInvalidParams(true);
                return;
            }
            setSubmitError(true);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className={classes.container}>
            <h2>
                Reset your password
            </h2>
            <p>
                Enter your username or email to recover your account:
            </p>
            {submitSuccess && <Alert severity="success">An email has been sent to your address. Please check your inbox.</Alert>}
            {submitError && <Alert severity="error">Ups - Something has gone wrong.</Alert>}
            {emptyField && <Alert severity="warning">Please, enter your username or email.</Alert>}
            {invalidParams && <Alert severity="warning">Invalid username or password.</Alert>}
            <form onSubmit={onSubmit}>
                <TextField
                    type="text"
                    label="Username or Email"
                    onChange={(e) => setUsernameOrEmail(e.currentTarget.value)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <br />
                <br />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Send recover email
                </Button>
            </form>
            {isSubmitting && (
                <div className={classes.backdrop}>
                    <CircularProgress />
                </div>
            )}
        </div>
    )
}

function RecoverPasswordWithToken({token}: {token: string}) {
    const [password, setPassword] = React.useState<string>("");
    const [password2, setPassword2] = React.useState<string>("");
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = React.useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = React.useState<boolean>(false);
    const [submitError, setSubmitError] = React.useState<boolean>(false);
    const classes = useStyles();
    
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setSubmitError(false);
        setSubmitSuccess(false);
        setPasswordsDoNotMatch(false);

        if (!password || password !== password2) {
            setPasswordsDoNotMatch(true);
            return;
        } else {
            setPasswordsDoNotMatch(false);
        }

        try {
            setIsSubmitting(true);
            await $WhereIsMyPetApiClient.Users.ResetPassword(token, password);
            setSubmitSuccess(true);
        } catch(e) {
            setSubmitError(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={classes.container}>
            <h2>
                Reset your password
            </h2>
            <p>
                Enter a new password for your account:
            </p>
            {submitSuccess && <Alert severity="success">Your password has been updated</Alert>}
            {submitError && <Alert severity="error">Ups - Something has gone wrong.</Alert>}
            {passwordsDoNotMatch && <Alert severity="warning">Passwords do not match</Alert>}
            <form onSubmit={onSubmit}>
                <TextField
                    type="password"
                    label="Password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    variant="outlined"
                    margin="normal"
                    fullWidth 
                />
                <TextField 
                    type="password"
                    label="Repeat your password"
                    onChange={(e) => setPassword2(e.currentTarget.value)}
                    variant="outlined"
                    margin="normal"
                    fullWidth 
                />
                <br />
                <br />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Reset Password
                </Button>
            </form>
            {isSubmitting && (
                <div className={classes.backdrop}>
                    <CircularProgress />
                </div>
            )}
        </div>
    )
}

const useStyles = makeStyles(() => ({
    container: {
        position: "relative",
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
}))


export default RecoverPassword;
