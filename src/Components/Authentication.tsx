import React from "react";
import $WhereIsMyPetApiClient from "../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";
import { IUser } from "../Services/WhereIsMyPetApiClient/Controllers/UserController";
import { INotification } from "../Services/WhereIsMyPetApiClient/Controllers/NotificationController";

interface IAuthenticationContextValues {
    userLoading: boolean;
    userInfo: IUser | null;
    loadUserData: () => void;
    logout: () => void;
    notifications: INotification[];
    loadNotifications: () => void;
}

export const AuthenticationContext = React.createContext<IAuthenticationContextValues>({
    userInfo: null,
    loadUserData: () => {},
    logout: () => {},
    userLoading: true,
    notifications: [],
    loadNotifications: () => {},
});

function AuthenticationProvider ({children}: {children: React.ReactNode}) {
    const [userLoading, setUserLoading] = React.useState(!!$WhereIsMyPetApiClient.getToken());
    const [userInfo, setUserInfo] = React.useState<IUser | null>(null);
    const [notifications, setNotifications] = React.useState<INotification[]>([]);

    React.useEffect(() => {
        loadUserData();
        const interval = setInterval(loadNotifications, 15 * 60 * 1000); //15' 60'' 1000 to miliseconds

        return () => {
            clearInterval(interval);
        }
    }, []);

    async function loadNotifications() {
        try {
            const newNotifications = await $WhereIsMyPetApiClient.Notifications.GetNotifications();
            if (!newNotifications?.data) {
                return;
            }
            setNotifications(newNotifications.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function loadUserData() {
        setUserLoading(true);
        const [userInfo, notifications] = await Promise.all([
            $WhereIsMyPetApiClient.Users.GetUserInfo(),
            $WhereIsMyPetApiClient.Notifications.GetNotifications(),
        ]);
        setUserInfo(userInfo?.data || null);
        setNotifications(notifications?.data || []);
        setUserLoading(false);
    }
    function logout() {
        $WhereIsMyPetApiClient.clearToken();
        setUserInfo(null);
        setNotifications([]);
    }
    return (
        <AuthenticationContext.Provider 
            value={{
                userLoading,
                userInfo,
                loadUserData,
                logout,
                notifications,
                loadNotifications,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )

}


export default AuthenticationProvider;


