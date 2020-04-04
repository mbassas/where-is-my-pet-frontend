import React, { Component, FormEvent, ChangeEvent } from 'react';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import { TextField, Button, withStyles, WithStyles, createStyles, Snackbar, InputAdornment, IconButton, TextFieldProps } from '@material-ui/core';
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
            <SignUpPagesLayout isLoading={this.state.isSubmitting}>
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
                    <TextField margin={"normal"} type="text" name="name" onChange={this._onChange} label="Name" variant="outlined" className={classes.input} />
                    <TextField margin={"normal"} type="text" name="surname" onChange={this._onChange} label="Surname" variant="outlined" className={classes.input} />
                    <TextField margin={"normal"} type="email" name="email" onChange={this._onChange} label="Email" variant="outlined" className={classes.input} />
                    <TextField margin={"normal"} type="tel" name="phone" onChange={this._onChange} label="Mobile phone" variant="outlined" className={classes.input} />
                    <TextField margin={"normal"} type="text" name="username" onChange={this._onChange} label="Username" variant="outlined" className={classes.input} />
                    <PasswordInput margin={"normal"} name="password" onChange={this._onChange} label="Password" variant="outlined" className={classes.input} />
                    <Button type="submit" variant="contained" color="primary" disabled={this.state.isSubmitting} fullWidth>
                        SIGN UP
                    </Button>
                </form>
            </SignUpPagesLayout>
        )
    }
}

function PasswordInput(props: TextFieldProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    const showPasswordButton = (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => {e.preventDefault();}}
            >
                {/* {showPassword ? <Visibility /> : <VisibilityOff />} */}
                {showPassword ? "Hide" : "Show"}
            </IconButton>
        </InputAdornment>
    )
    
    return (
        <TextField type={showPassword ? "text" : "password"}  InputProps={{endAdornment: showPasswordButton}} {...props} />
    )
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