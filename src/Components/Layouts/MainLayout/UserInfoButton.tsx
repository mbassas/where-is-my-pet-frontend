import React from "react";
import LoginModal from "../../LoginModal/LoginModal";
import { Button } from "@material-ui/core";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import UserMenu from "./UserMenu";
import useAuthentication from "../../../Hooks/useAuthentication";


function UserInfoButton() {

    const [modalOpen, setModalOpen] = React.useState(false);
    const menuAnchorRef = React.useRef<HTMLButtonElement>(null);
    const [menuOpen, setMenuOpen] = React.useState(false);

    const {userInfo, userLoading, loadUserData} = useAuthentication();

    const showLoginButton = !userInfo && !userLoading;    
    return (
        <>
            {showLoginButton && (
                <Button color="inherit" onClick={() => setModalOpen(true)}>
                    Login
                </Button>
            )}
            {userInfo && (
                <>
                    <Button 
                        ref={menuAnchorRef}
                        color="inherit"
                        startIcon={<AccountCircleOutlined />}
                        onClick={() => setMenuOpen(true)}
                    >
                        {userInfo.username}
                    </Button>
                    {menuOpen && (
                        <UserMenu
                            anchor={menuAnchorRef}
                            onClose={() => {
                                setMenuOpen(false);
                                loadUserData();
                            }}
                        />
                    )}
                </>
            )}
            <LoginModal 
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    loadUserData();
                }}
            />
        </>
    );

}

export default UserInfoButton;
