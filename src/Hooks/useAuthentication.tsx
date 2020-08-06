import { useContext } from 'react';
import { AuthenticationContext } from '../Components/Authentication';

function useAuthentication () {
    return useContext(AuthenticationContext);
}

export default useAuthentication;