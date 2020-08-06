import React, { Component, FormEvent } from 'react';
import $WhereIsMyPetApiClient from '../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import SignUpPagesLayout from '../Layouts/SignUpPagesLayout';
import { TextField, Button, withStyles, WithStyles, createStyles, Grid, Link as MuiLink, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';

interface IState {
    username: string,
    password: string,
    isSubmitting: boolean;
    submitError: boolean;
}

interface IProps extends WithStyles<typeof styles> {
    onSuccess: () => void;
}

class SignIn extends Component<IProps, IState> {
    state: IState = {
        username: "",
        password: "",
        isSubmitting: false,
        submitError: false,
    }
    _onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        this.setState({ isSubmitting: true });
        try {
            const response = await $WhereIsMyPetApiClient.Users.SignIn(this.state.username, this.state.password);
            $WhereIsMyPetApiClient.setToken(response.data.token);
            this.props.onSuccess()
        } catch (e) {
            this.setState({ submitError: true })
        } finally {
            this.setState({ isSubmitting: false });
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                {this.state.submitError && (
                    <>
                        <Alert severity="error">Ups - Cannot create account!</Alert>
                        <br />
                    </>
                )}
                <p>
                    Enter your username and password to sign in:
                </p>
                <form onSubmit={this._onSubmit}>
                    <TextField required margin="normal" type="text" name="username" label="Username" variant="outlined" className={classes.input} onChange={(event) => this.setState({ username: event.currentTarget.value })} />
                    <TextField required margin="normal" type="password" name="password" label="Password" variant="outlined" className={classes.input} onChange={(event) => this.setState({ password: event.currentTarget.value })} />

                    <Button type="submit" variant="contained" color="primary" disabled={this.state.isSubmitting} fullWidth>
                        SIGN IN
                    </Button>

                    <div className={classes.forgotPassword}>
                        <MuiLink component={Link} to="/recover-password" onClick={this.props.onSuccess}>
                            Forgot your password? Click here.
                        </MuiLink>
                    </div>
                </form>
                {this.state.isSubmitting && (
                    <div className={classes.backdrop}>
                        <CircularProgress />
                    </div>
                )}
            </>
        )
    }
}

const styles = createStyles({
    input: {
        width: "100%",
    },
    forgotPassword: {
        marginTop: "10px",
        textAlign: "center"
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

export default withStyles(styles)(SignIn);
