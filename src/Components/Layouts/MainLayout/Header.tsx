import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Theme, createStyles, Badge } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import UserInfoButton from './UserInfoButton';
import { Link } from 'react-router-dom';
import useAuthentication from '../../../Hooks/useAuthentication';

interface IProps {
    openSidebar: () => void;
}

function Header({openSidebar}: IProps) {
    const classes = useStyles();
    const {notifications} = useAuthentication();

    const numUnread = notifications.filter(({read}) => !read).length;
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={openSidebar}>
                        <Badge badgeContent={numUnread} color="secondary">
                            <MenuIcon />
                        </Badge>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} component={Link} to ="/">
                        Where is my pet
                    </Typography>
                    <UserInfoButton />
                </Toolbar>
            </AppBar>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            textDecoration: "none",
            color: theme.palette.secondary.contrastText
        },
    }),
);

export default Header;