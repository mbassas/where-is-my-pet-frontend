import React from 'react';
import { makeStyles, Dialog, DialogContent, FormControlLabel, DialogTitle, DialogActions, Button, Snackbar } from '@material-ui/core';
import { TextField, Checkbox } from "formik-material-ui";
import SendIcon from "@material-ui/icons/Send";
import { Form, Formik, Field, FormikHelpers, useFormikContext } from 'formik';
import $WhereIsMyPetApiClient from '../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient';
import Loader from '../Components/Loader';
import { Alert } from '@material-ui/lab';
import useAuthentication from '../Hooks/useAuthentication';
import LoginModal from '../Components/LoginModal/LoginModal';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    receiverId: number;
}

interface IFormValues {
    message: string;
    phone: boolean;
    email: boolean;
}

const initialValues: IFormValues = {
    message: "",
    phone: false,
    email: false
}

function ContactUserModalContainer(props: IProps) {
    const classes = useStyles();
    const [submitError, setSubmitError] = React.useState(false);
    const [submitSuccess, setSubmitSuccess] = React.useState(false);
    const {userInfo, loadUserData} = useAuthentication();

    if (!userInfo) {
        return (
            <LoginModal isOpen={props.isOpen && !userInfo} onClose={() => {
                if($WhereIsMyPetApiClient.getToken()) {
                    loadUserData();
                } else {
                    props.onClose();
                }
            }} />
        );
    }

    return (
        <>
            <Snackbar open={submitError} autoHideDuration={6000} onClose={() => setSubmitError(false)}>
                <Alert onClose={() => setSubmitError(false)} severity="error">
                    Could not send your message. Please, try again!
                </Alert>
            </Snackbar>
            <Snackbar open={submitSuccess} autoHideDuration={6000} onClose={() => setSubmitSuccess(false)}>
                <Alert onClose={() => setSubmitSuccess(false)} severity="success">
                    Your message has been sent!
                </Alert>
            </Snackbar>
            <Dialog
                open={props.isOpen}
                onClose={props.onClose}
                scroll="body"
                fullWidth
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values: IFormValues, { setSubmitting }: FormikHelpers<IFormValues>) => {
                        try {
                            const response = await $WhereIsMyPetApiClient.Users.ContactUser(props.receiverId, values.message, values.phone, values.email);
                            setSubmitSuccess(true);
                            props.onClose();
                        } catch (e) {
                            setSubmitError(true);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    <ContactUserModal />
                </Formik>
            </Dialog>
        </>
    )

};

function ContactUserModal() {
    const { isSubmitting } = useFormikContext<IFormValues>()
    const classes = useStyles();
    return (
        <>
            {isSubmitting && <Loader />}
            <Form>
                <DialogTitle>
                    Contact User
                </DialogTitle>
                <DialogContent>

                    <div className={classes.paperContent}>
                        
                        
                        <div>
                            Write a message to send to the user:
                                </div>
                        <Field
                            component={TextField}
                            required
                            margin={"normal"}
                            type="text"
                            name="message"
                            label="Insert the message here"
                            variant="outlined"
                            rows={10}
                            fullWidth
                            multiline
                        />

                        <div className={classes.checkboxes}>
                            <FormControlLabel
                                control={
                                    <Field
                                        component={Checkbox}
                                        color="primary"
                                        name="email"
                                    />
                                }
                                label="Include email"
                            />
                            <FormControlLabel
                                control={
                                    <Field
                                        component={Checkbox}
                                        color="primary"
                                        name="phone"
                                    />
                                }
                                label="Include phone"
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        endIcon={<SendIcon />}
                    >
                        Send
                    </Button>
                </DialogActions>
            </Form>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    checkboxes: {
        display: "grid"
    },
    paperContent: {
        position: "relative",
        //overflowY: "auto"
    },
}))

export default ContactUserModalContainer;