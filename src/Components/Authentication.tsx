import React from "react";
import $WhereIsMyPetApiClient from "../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";
import { IUser } from "../Services/WhereIsMyPetApiClient/Controllers/UserController";

interface IAuthenticationContextValues {
    userLoading: boolean;
    userInfo: IUser | null;
    loadUserData: () => void;
    logout: () => void;
}

export const AuthenticationContext = React.createContext<IAuthenticationContextValues>({
    userInfo: null,
    loadUserData: () => {},
    logout: () => {},
    userLoading: true
});

function AuthenticationProvider ({children}: {children: React.ReactNode}) {
    const [userLoading, setUserLoading] = React.useState(!!$WhereIsMyPetApiClient.getToken());
    const [userInfo, setUserInfo] = React.useState<IUser | null>(null);

    React.useEffect(() => {
        loadUserData();
    }, []);

    async function loadUserData() {
        setUserLoading(true);
        const userInfo = await $WhereIsMyPetApiClient.Users.GetUserInfo();
        setUserInfo(userInfo?.data || null)
        setUserLoading(false);
    }
    function logout() {
        $WhereIsMyPetApiClient.clearToken();
        loadUserData();
    }
    return (
        <AuthenticationContext.Provider 
            value={{
                userLoading,
                userInfo,
                loadUserData,
                logout,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )

}


export default AuthenticationProvider;


