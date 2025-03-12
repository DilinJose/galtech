
import React, { createContext, useState, ReactNode } from 'react';

interface UserType{
    username: string,
    email: string,
    mobile: string,
    gender:string,
    profileImage: string,
}

type AuthType = {
    user: UserType;
    role: string;
    authToken?: string;
};

type AuthContextType = {
    auth: AuthType | null;
    setAuth: (user: AuthType | null) => void; 
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, _setAuth] = useState<AuthType | null>(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : null;
    });

    const setAuth = (user: AuthType | null) => {
        if (user) {
            localStorage.setItem('auth', JSON.stringify(user)); 
        } else {
            localStorage.removeItem('auth'); 
        }
        _setAuth(user);
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
