import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('accessToken');
        //const userToken = JSON.parse(tokenString);
        return tokenString
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('accessToken', userToken);

        setToken(userToken.token);
    };

    const removeToken = () => {
        localStorage.removeItem('accessToken');
        setToken(null);
    };

    return {
        setToken: saveToken,
        token
    }
}