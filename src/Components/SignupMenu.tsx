import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { useLocation, Link } from 'react-router-dom';

function SignUpMenu() {
    const location = useLocation();

    const value = /sign-in/.test(location.pathname) ? 1 : 0;

    return (
        <Tabs value={value} variant="fullWidth" indicatorColor="primary">
            <Tab label="Sign Up" component={Link} to="/sign-up" />
            <Tab label="Sign In" component={Link} to="/sign-in" />
        </Tabs>
    )
}
export default SignUpMenu;