import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

const navStack = [
    '/pick-activity',
    '/predict',
    '/reflect'
];

interface NavContextType {
    prevPath: string | undefined;
    nextPath: string | undefined;
}

export const NavContext = React.createContext<NavContextType | null>(null);

const NavContextProvider = ({ children } : { children: ReactNode }) => {
    const [navigation, setNavigation] = useState<NavContextType>({
        prevPath: undefined,
        nextPath: undefined
    });
    const location = useLocation();

    useEffect(() => {
        const pathName = location.pathname;

        const navStackPosition = navStack.indexOf(pathName);
        if (navStackPosition === -1) {

            return;
        } else {
            setNavigation({
                prevPath: navStack[navStackPosition - 1] ?? undefined,
                nextPath: navStack[navStackPosition + 1]
            });
        }
    }, [location]);

    return (
        <NavContext.Provider value={navigation}>
            {children}
        </NavContext.Provider>
    )
}

export const useNavContext = () => useContext(NavContext);
export default NavContextProvider;