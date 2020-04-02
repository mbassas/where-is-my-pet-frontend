import React, { Component, FormEvent } from 'react';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import SignUpPagesLayout from '../Components/Layouts/SignUpPagesLayout';
import { TextField, Button, withStyles, WithStyles, createStyles, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

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
            <SignUpPagesLayout isLoading={this.state.isSubmitting} info="Some information over here">
                {this.state.submitError && (
                    <>
                        <Alert severity="error">Ups - Cannot create account!</Alert>
                        <br />
                    </>
                )}
                <form onSubmit={this._onSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField type="text" name="username" label="username" variant="outlined" className={classes.input} onChange={(event) => this.setState({ username: event.currentTarget.value })} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="password" name="password" label="password" variant="outlined" className={classes.input} onChange={(event) => this.setState({ password: event.currentTarget.value })} />
                        </Grid>
                        <hr />
                        <Grid item xs={12}>
                            <Button type="submit" value="SIGN UP" variant="contained" color="primary" disabled={this.state.isSubmitting}>
                                SIGN IN
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </SignUpPagesLayout>
        )
    }
}

const styles = createStyles({
    input: {
        width: "100%",
    }

})

export default withStyles(styles)(SignIn);
