import React, { Component, FormEvent, ChangeEvent } from 'react';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import { TextField, Button, Grid, withStyles, WithStyles, createStyles, Snackbar } from '@material-ui/core';
import { Alert } from "@material-ui/lab"
import SignUpPagesLayout from '../Components/Layouts/SignUpPagesLayout';

interface IState {
    name: string;
    surname: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    isSubmitting: boolean;
    submitError: boolean;
}
class SignUp extends Component<WithStyles<typeof styles>, IState> {
    state: IState = {
        name: "",
        surname: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        isSubmitting: false,
        submitError: false
    }
    _onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // cancel automatic browser submit
        event.preventDefault();

        this.setState({ isSubmitting: true });
        try {
            await $WhereIsMyPetApiClient.Users.SignUp(this.state);
        } catch (e) {
            this.setState({ submitError: true })
        } finally {
            this.setState({ isSubmitting: false });
        }

    }
    _onChange = (event: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <SignUpPagesLayout info="Some information over here" isLoading={this.state.isSubmitting}>
                {this.state.submitError && (
                    <>
                        <Alert severity="error">Ups - Cannot create account!</Alert>
                        <br />
                    </>
                )}
                <form onSubmit={this._onSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField type="text" name="name" onChange={this._onChange} label="Name" variant="outlined" className={classes.input} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="text" name="surname" onChange={this._onChange} label="Surname" variant="outlined" className={classes.input} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="email" name="email" onChange={this._onChange} label="Email" variant="outlined" className={classes.input} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="tel" name="phone" onChange={this._onChange} label="Mobile phone" variant="outlined" className={classes.input} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="text" name="username" onChange={this._onChange} label="Username" variant="outlined" className={classes.input} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="password" name="password" onChange={this._onChange} label="Password" variant="outlined" className={classes.input} />
                        </Grid>
                        <hr />
                        <Grid item xs={12}>
                            <Button type="submit" value="SIGN UP" variant="contained" color="primary" disabled={this.state.isSubmitting}>
                                SIGN UP
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </SignUpPagesLayout>
        )
    }
}

const styles = createStyles({
    container: {
        minHeight: "100vh",
        background: "linear-gradient(rgba(167, 102, 10, 1), rgba(255, 136, 0, 1))",
    },
    wrapper: {
        padding: "1em 1.2rem",
    },
    input: {
        width: "100%",
    }

})

export default withStyles(styles)(SignUp);