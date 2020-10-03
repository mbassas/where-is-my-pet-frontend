import React from "react";
import { List, ListItem, ListItemSecondaryAction, IconButton, ListItemText, makeStyles, ListItemIcon } from "@material-ui/core";
import useAuthentication from "../../Hooks/useAuthentication";
import OpenIcon from "@material-ui/icons/OpenInBrowser";
import NewIcon from "@material-ui/icons/FiberNew";
import { Link } from "react-router-dom";
import moment from "moment";
import $WhereIsMyPetApiClient from "../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";

function NotificationsPage() {
    const { notifications, loadNotifications } = useAuthentication();
    const classes = useStyles();

    React.useEffect(() => {
        const timer = setTimeout(async () => {
            const notificationsToUpdate = notifications.filter(n => !n.read);

            if (!notificationsToUpdate.length) {
                return;
            }

            await Promise.all(notificationsToUpdate.map(n => $WhereIsMyPetApiClient.Notifications.UpdateNotification(n.id)));

            loadNotifications();
        }, 5000);

        return () => {
            clearTimeout(timer);
        }
    }, [notifications]);

    if (notifications.length === 0) {
        return (
            <div className={classes.notFound}>
                <h3>
                    Notifications about your activity will be displayed here.
                </h3>
            </div>
        )
    }
    return (
        <List className={classes.list}>
            {notifications.map((n) => {
                const linkProps: any = Boolean(n.link)
                    ? {
                        component: Link,
                        to: n.link,
                        onClick: async () => {
                            await $WhereIsMyPetApiClient.Notifications.UpdateNotification(n.id);
                            loadNotifications();
                        }
                    }
                    : {};
                return (
                    <ListItem key={n.id} className={n.read ? classes.read : classes.unread} {...linkProps}>
                        <ListItemIcon>
                            <NewIcon className={n.read ? classes.hidden : ""} color="primary" fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary={n.message} secondary={moment(n.publication_date).local().fromNow()} />
                        <ListItemSecondaryAction>
                            {n.link && (
                                <IconButton edge="end" aria-label="comments">
                                    <OpenIcon />
                                </IconButton>
                            )}
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}

const useStyles = makeStyles((theme) => ({
    list: {
        flexGrow: 1,
        "& > li": {
            border: "1px solid #ccc",
            marginBottom: "5px",
            borderRadius: theme.shape.borderRadius,
            cursor: "pointer",
            "&:hover": {
                background: theme.palette.grey[200],
            }
        }
    },
    hidden: {
        display: "none"
    },
    read: {
        background: theme.palette.grey[200],
        color: theme.palette.text.primary
    },
    unread: {
        color: theme.palette.text.primary
    },
    notFound: {
        textAlign: "center",
        marginTop: "100px",
        gridColumn: "1/-1",
    }
}));

export default NotificationsPage;
