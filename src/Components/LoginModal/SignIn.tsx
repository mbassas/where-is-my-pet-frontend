import React, {  } from 'react';
import $WhereIsMyPetApiClient from '../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import { Button, Link as MuiLink, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { ISignUpParams } from '../../Services/WhereIsMyPetApiClient/Controllers/UserController';
import { FormikHelpers, Formik, useFormikContext, Field, FieldProps, Form } from 'formik';
import PasswordInput from '../Inputs/PasswordInput';
import { TextField } from 'formik-material-ui';

interface IFormValues {
    username: string;
    password: string;
}

const initialValues: IFormValues = {
    username: "",
    password: "",
}

interface IProps {
    onSuccess: () => void;
}

function SignInFormContainer(props: IProps) {
    const [submitError, setSubmitError] = React.useState("");

    async function onSubmit(values: IFormValues, { setSubmitting }: FormikHelpers<IFormValues>) {
        try {
            const response = await $WhereIsMyPetApiClient.Users.SignIn(values.username, values.password);
            $WhereIsMyPetApiClient.setToken(response.data.token);
            props.onSuccess()
        } catch (e) {
            setSubmitError(e.response.data);
        } finally {
            setSubmitting(false);
        }
    }

    function validate(values: IFormValues) {
        const errors: Partial<IFormValues> = {};

        if (!values.password) {
            errors.password = "You must enter a password";
        }

        if (!values.username) {
            errors.username = "You must enter a username";
        }
        return errors;
    }

    return (
        <Formik
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
        >
            <SignInForm submitError={submitError} onSuccess={props.onSuccess} />
        </Formik>
    )
}

function SignInForm({ submitError, onSuccess }: { submitError: string, onSuccess: () => void }) {
    const { isSubmitting, isValid } = useFormikContext<ISignUpParams>();
    const classes = useStyles();
    return (
        <>
            {submitError && (
                <>
                    <br />
                    <Alert severity="error">{submitError}</Alert>
                </>
            )}
            <p>
                Enter your username and password to sign in:
            </p>
            <Form>
                <Field
                    margin="normal"
                    fullWidth
                    component={TextField}
                    name="username"
                    label="Username"
                    variant="outlined"
                    className={classes.input}
                />

                <Field name="password"> 
                    {({ field, form }: FieldProps) => (
                        <PasswordInput
                            {...field}
                            margin="normal"
                            fullWidth
                            label="Password"
                            variant="outlined"
                            className={classes.input}
                            error={Boolean(form.errors["password"]) && Boolean(form.touched["password"])}
                            helperText={Boolean(form.touched["password"]) ? form.errors["password"] : ""}
                        />
                    )}
                </Field>

                <Button 
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                    fullWidth
                    className={classes.button}
                >
                    SIGN IN
                </Button>

                <div className={classes.forgotPassword}>
                    <MuiLink component={Link} to="/recover-password" onClick={onSuccess}>
                        Forgot your password? Click here.
                    </MuiLink>
                </div>
            </Form>
            {isSubmitting && <Loader />}
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    forgotPassword: {
        marginTop: theme.spacing(2),
        textAlign: "center"
    },
    button: {
        marginTop: theme.spacing(2),
    },
    input: {
        marginBottom: "16px",
        "& > p": {
            marginBottom: "-22px"
        }
    }
}))

export default SignInFormContainer;
