import React, {ReactNode, useContext, useEffect, useState} from 'react';

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

    useEffect(() => {
        const URL = window.location.href;
        const location = URL.substring(URL.lastIndexOf('/'));

        const navStackPosition = navStack.indexOf(location);
        if (navStackPosition === -1) {

            return;
        } else {
            setNavigation({
                prevPath: navStack[navStackPosition - 1] ?? undefined,
                nextPath: navStack[navStackPosition + 1]
            });
        }

    }, [window.location.href]);

    return (
        <NavContext.Provider value={navigation}>
            {children}
        </NavContext.Provider>
    )
}

export const useNavContext = () => useContext(NavContext);
export default NavContextProvider;