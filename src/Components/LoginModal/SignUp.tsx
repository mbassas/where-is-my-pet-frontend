import React from 'react';
import $WhereIsMyPetApiClient from '../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import { Button, makeStyles } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import Loader from '../Loader';
import { Formik, FormikHelpers, Form, useFormikContext, Field, FieldProps } from 'formik';
import { ISignUpParams } from '../../Services/WhereIsMyPetApiClient/Controllers/UserController';
import PasswordInput from '../Inputs/PasswordInput';
import { Alert } from '@material-ui/lab';

const defaultInitialValues: ISignUpParams = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    username: "",
    password: ""
}
interface IProps {
    onSuccess: () => void;
}

function SignUpFormContainer(props: IProps) {
    const [submitError, setSubmitError] = React.useState("");

    async function onSubmit(values: ISignUpParams, { setSubmitting }: FormikHelpers<ISignUpParams>) {
        setSubmitError("");
        try {
            const response = await $WhereIsMyPetApiClient.Users.SignUp(values);
            $WhereIsMyPetApiClient.setToken(response.data.token);
            props.onSuccess();
        } catch (e) {
            setSubmitError(e.response.data);
        } finally {
            setSubmitting(false);
        }
    }
    function validate(values: ISignUpParams) {
        let errors: Partial<ISignUpParams> = {};
        if (!values.name) {
            errors.name = "You must enter a name";
        }
        if (!values.surname) {
            errors.surname = "You must enter a surname";
        }
        if (!values.email) {
            errors.email = "You must enter an email";
        }
        if (!values.phone) {
            errors.phone = "You must enter a phone number";
        }
        if (!values.username) {
            errors.username = "You must enter a username";
        }
        if (!values.password) {
            errors.password = "You must enter a password";
        }
        return errors;
    }

    return (
        <Formik
            initialValues={defaultInitialValues}
            onSubmit={onSubmit}
            validate={validate}
        >
            <SignUpForm submitError={submitError}/>
        </Formik>
    );
}


function SignUpForm({submitError}: {submitError: string}) {
    const { isSubmitting, isValid,  } = useFormikContext<ISignUpParams>();
    const classes = useStyles();
    return (
        <>
            {Boolean(submitError) && (
                <>
                    <br />
                    <Alert severity="error">{submitError}</Alert>
                </>
            )}
            <p>
                Sign up to upload an animal!
            </p>
            <Form>
                <Field
                    margin="normal"
                    className={classes.input}
                    component={TextField}
                    name="name"
                    // required
                    type="text"
                    label="Name"
                    variant="outlined"
                />
                <Field
                    margin="normal"
                    className={classes.input}
                    component={TextField}
                    name="surname"
                    // required
                    type="text"
                    label="Surname"
                    variant="outlined"
                />
                <Field
                    margin="normal"
                    className={classes.input}
                    component={TextField}
                    name="email"
                    // required
                    type="email"
                    label="Email"
                    variant="outlined"
                />
                <Field
                    margin="normal"
                    className={classes.input}
                    component={TextField}
                    name="phone"
                    // required
                    type="tel"
                    label="Phone"
                    variant="outlined"
                />
                <Field
                    margin="normal"
                    className={classes.input}
                    component={TextField}
                    name="username"
                    // required
                    type="text"
                    label="Username"
                    variant="outlined"
                />
                <Field name="password">
                    {({ field, form, meta }: FieldProps) => (
                        <PasswordInput
                            {...field}
                            margin="normal"
                            className={classes.input}
                            // required
                            label="Password"
                            variant="outlined"
                            error={Boolean(form.errors["password"]) && Boolean(form.touched["password"])}
                            helperText={Boolean(form.touched["password"]) ? form.errors["password"] : ""}
                        />
                    )}
                </Field>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={isSubmitting || !isValid}
                    fullWidth
                >
                    SIGN UP
                </Button>
                {isSubmitting && <Loader />}
            </Form>
        </>
    );

}



const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: "100vh",
        background: "linear-gradient(rgba(167, 102, 10, 1), rgba(255, 136, 0, 1))",
    },
    button: {
        marginTop: theme.spacing(2),
    },
    wrapper: {
        padding: "1em 1.2rem",
    },
    input: {
        width: "100%",
        marginBottom: "16px",
        "& > p": {
            marginBottom: "-22px"
        }
    }
}))

export default SignUpFormContainer;