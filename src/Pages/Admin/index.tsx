import React from "react";
import useAuthentication from "../../Hooks/useAuthentication";
import Loader from "../../Components/Loader";
import { Redirect, Switch, Route } from "react-router-dom";
import AdminUsersPage from "./AdminUsersPage";

function AdminPages() {
    const {userInfo, userLoading} = useAuthentication();

    if (userLoading) {
        return (
            <Loader />
        );
    }

    if (!userInfo?.roles.includes("Admin")) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Switch>
            <Route path="/admin/users">
              <AdminUsersPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default AdminPages;
