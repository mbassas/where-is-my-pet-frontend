import React from "react";
import $WhereIsMyPetApiClient from "../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";
import { IUser } from "../Services/WhereIsMyPetApiClient/Controllers/UserController";

interface IAuthenticationContextValues {
    userLoading: boolean;
    userInfo: IUser | null;
    loadUserData: () => void;
}

export const AuthenticationContext = React.createContext<IAuthenticationContextValues>({
    userInfo: null,
    loadUserData: () => {},
    userLoading: false
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
        setUserLoading(false);
        setUserInfo(userInfo?.data || null)
    }
    return (
        <AuthenticationContext.Provider 
            value={{
                userLoading,
                userInfo,
                loadUserData,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )

}


export default AuthenticationProvider;


