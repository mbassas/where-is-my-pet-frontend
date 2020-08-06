import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import $WhereIsMyPetApiClient from "../../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";

interface IProps {
    anchor: React.RefObject<HTMLElement>;
    onClose: () => void;
}

function UserMenu(props: IProps) {
    function logOut() {
        $WhereIsMyPetApiClient.clearToken();
        props.onClose();
    }
    return (
        <Menu
            anchorEl={props.anchor.current}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
            elevation={8}
            open={true}
            onClose={props.onClose}
        >
            <MenuItem onClick={logOut}>Log Out</MenuItem>
        </Menu>
    )
}

export default UserMenu;