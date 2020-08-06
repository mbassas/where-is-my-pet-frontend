import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import UserInfoButton from './UserInfoButton';

function Header() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
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
        },
    }),
);

export default Header;