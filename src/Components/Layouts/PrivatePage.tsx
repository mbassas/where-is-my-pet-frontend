import React from 'react';
import { RouteProps, Route } from 'react-router-dom';
import useAuthentication from '../../Hooks/useAuthentication';
import LoginModal from '../LoginModal/LoginModal';

function PrivatePage ({children, ...props}: RouteProps) {
    
    const {userInfo, userLoading, loadUserData} = useAuthentication();

    return (
        <Route {...props}>
            <LoginModal 
                isOpen={!userInfo && !userLoading}
                onClose={loadUserData}
            />
            {children}
        </Route>
    )

}

export default PrivatePage;