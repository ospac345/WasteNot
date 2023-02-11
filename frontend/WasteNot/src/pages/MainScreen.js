import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from '../components/BottomTabs';
import ListContextProvider from '../context/ListContext';



const MainScreen = () => {
    return (
        <ListContextProvider>
            <NavigationContainer>
                <BottomTabs />
            </NavigationContainer>
        </ListContextProvider>
    );
};


export default MainScreen;