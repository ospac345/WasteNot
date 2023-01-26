/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import LandingPage from './src/pages/LandingPage';
import MainScreen from './src/pages/MainScreen';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';


function App() {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (

        <><MainScreen /></>
    );
}


export default App;
