import React from "react";
import useAuthentication from "../../Hooks/useAuthentication";
import Loader from "../../Components/Loader";
import { Redirect, Switch, Route } from "react-router-dom";
import NotificationsPage from "./Notifications";
import UserAnimals from "./UserAnimals";

function UserPages() {
    const {userInfo, userLoading} = useAuthentication();

    if (userLoading) {
        return (
            <Loader />
        );
    }

    if (!userInfo) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Switch>
            <Route path="/user/notifications">
              <NotificationsPage />
            </Route>
            <Route path="/user/animals">
              <UserAnimals />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default UserPages;
