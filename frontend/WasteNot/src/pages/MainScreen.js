import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../components/BottomTabs';
import ListContextProvider from '../context/ListContext';




//const Stack = createNativeStackNavigator();

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