import { useState, createContext } from 'react';

interface IUserContext {
    email: string | null;
    isMfaEnabled?: boolean | null;
    issuer: string | null;
    phoneNumber: string | null;
    provider: any;
    publicAddress: string | null;
}
export type UserContextType = {
    user: IUserContext | null;
    setUser: (user: IUserContext) => void;
};
const defaultState = {
    user: null,
    setUser: (_user: IUserContext) => {},
};
export const UserContext = createContext<UserContextType>(defaultState);

function UserProvider({ children }: any) {
    const [user, _updateUser] = useState<IUserContext | null>(null);

    const setUser = (user: IUserContext| null) => {

        if (user) {
            const newUser: IUserContext = {
                email: user.email,
                isMfaEnabled: user.isMfaEnabled,
                issuer: user.issuer,
                phoneNumber: user.phoneNumber,
                provider: user.provider,
                publicAddress: user.publicAddress,
            };
            _updateUser(newUser);
        } else { 
            _updateUser(null);
        }
       
    };

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export default UserProvider;
