import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, makeStyles, ListSubheader, Badge } from "@material-ui/core";
import Settings from "@material-ui/icons/SettingsOutlined";
import Help from "@material-ui/icons/HelpOutlined";
import Home from "@material-ui/icons/HomeOutlined";
import SupervisorAccount from "@material-ui/icons/SupervisorAccountOutlined";
import Email from "@material-ui/icons/EmailOutlined";
import AccountCircle from "@material-ui/icons/AccountCircleOutlined";
import Search from "@material-ui/icons/SearchOutlined";
import CloudUpload from "@material-ui/icons/CloudUploadOutlined";
import Exit from "@material-ui/icons/ExitToAppOutlined";
import Input from "@material-ui/icons/InputOutlined";
import Notifications from "@material-ui/icons/NotificationsOutlined";
import useAuthentication from '../../../Hooks/useAuthentication';
import { Link } from 'react-router-dom';
import LoginModal from '../../LoginModal/LoginModal';

interface IProps {
    isOpen: boolean;
    close: () => void;
}

function Sidebar({close, isOpen}: IProps) {
    const classes = useStyles();
    const [showLoginModal, setShowLoginModal] = React.useState(false);
    const {userInfo, notifications, logout} = useAuthentication();
    
    const numUnread = notifications.filter(({read}) => !read).length;
    return (
        <>
            <LoginModal 
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
            <Drawer anchor={"left"} open={isOpen} onClose={close}>
                <div
                    className= {classes.list}
                    role="presentation"
                    onClick={close}
                >
                    {userInfo && (
                        <List>
                            <SidebarLink to="/user/animals" label="My Profile" Icon={<AccountCircle />} />
                            <SidebarLink to="/user/notifications" label="Notifications" Icon={<Badge badgeContent={numUnread} color="primary"><Notifications /></Badge>} />
                            <SidebarLink label="Logout" Icon={<Exit />} onClick={logout} />
                        </List>
                    )}
                    {!userInfo && (
                        <List>
                            <SidebarLink label="Sign up or Sign in" Icon={<Input />} onClick={() => setShowLoginModal(true)} />
                        </List>
                    )}
                    <Divider />
                    <List>
                        <SidebarLink to="/" label="Home" Icon={<Home />} />
                        <SidebarLink to="/upload-animal" label="Upload Animal" Icon={<CloudUpload />} />
                        <SidebarLink to="/search" label="Find Animals" Icon={<Search />} />
                    </List>
                    {userInfo?.roles.includes("Admin") && (
                        <>
                            <Divider />
                            <List subheader={<ListSubheader>Admin Panel</ListSubheader>}>
                                <SidebarLink to="/admin/users" label="Review Users" Icon={<SupervisorAccount />} />
                            </List>
                        </>
                    )}
                    <Divider />
                    <List>
                        <SidebarLink to="" label="Settings" Icon={<Settings />} disabled/>
                        <SidebarLink to="/about" label="About" Icon={<Help />} />
                        <SidebarLink label="Contact" Icon={<Email />} onClick={() => window.open("mailto://whereismypetproject@gmail.com")} />
                    </List>
                </div>
            </Drawer>
        </>
    )
};


interface ISidebarLinkProps {
    to?: string;
    Icon: React.ReactElement;
    label: string;
    disabled?: boolean;
    onClick?: () => void;
}

function SidebarLink({to, Icon, label, disabled = false, onClick}: ISidebarLinkProps) {
    return  (
        <ListItem 
            component={to ? Link : ListItem}
            to={to}
            button 
            key={label} 
            disabled={disabled}
            onClick={onClick}
        >
            <ListItemIcon>{Icon}</ListItemIcon>
            <ListItemText primary={label} />
        </ListItem>
    );
}

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default Sidebar;