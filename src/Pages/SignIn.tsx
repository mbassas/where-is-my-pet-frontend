import React, { Component, FormEvent } from 'react';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import SignUpPagesLayout from '../Components/Layouts/SignUpPagesLayout';
import { TextField, Button, withStyles, WithStyles, createStyles, Grid, Link as MuiLink } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';

interface IState {
    username: string,
    password: string,
    isSubmitting: boolean;
    submitError: boolean;
}

class SignIn extends Component<WithStyles<typeof styles>, IState> {
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

        } catch (e) {
            this.setState({ submitError: true })
        } finally {
            this.setState({ isSubmitting: false });
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <SignUpPagesLayout isLoading={this.state.isSubmitting} >
                {this.state.submitError && (
                    <>
                        <Alert severity="error">Ups - Cannot create account!</Alert>
                        <br />
                    </>
                )}
                <p>
                    Additional info here.
                </p>
                <form onSubmit={this._onSubmit}>
                    <TextField margin="normal" type="text" name="username" label="username" variant="outlined" className={classes.input} onChange={(event) => this.setState({ username: event.currentTarget.value })} />
                    <TextField margin="normal" type="password" name="password" label="password" variant="outlined" className={classes.input} onChange={(event) => this.setState({ password: event.currentTarget.value })} />

                    <Button type="submit" variant="contained" color="primary" disabled={this.state.isSubmitting} fullWidth>
                        SIGN IN
                    </Button>

                    <div className={classes.forgotPassword}>
                        <MuiLink component={Link} to="/recover-password">Forgot your password?</MuiLink>
                    </div>
                </form>
            </SignUpPagesLayout>
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
    }

})

export default withStyles(styles)(SignIn);
