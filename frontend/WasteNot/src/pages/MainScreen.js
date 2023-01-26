import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../components/BottomTabs';




const Stack = createNativeStackNavigator();

const MainScreen = () => {
    return (
        <NavigationContainer>
            <BottomTabs />
        </NavigationContainer>
    );
};


export default MainScreen;