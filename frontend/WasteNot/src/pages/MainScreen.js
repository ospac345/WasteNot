import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from '../components/BottomTabs';
import ListContextProvider from '../context/ListContext';



const MainScreen = (props) => {
    return (
        <ListContextProvider>
            <NavigationContainer>
                <BottomTabs logOutSuccess={props.logOutSuccess} />
            </NavigationContainer>
        </ListContextProvider>
    );
};


export default MainScreen;