import React, { useState, useEffect } from 'react';
import MainScreen from './src/pages/MainScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import LandingPage from './src/pages/LandingPage';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const logInSuccess = () => {
        setIsLoggedIn(true);
    };

    const logOutSuccess = () => {
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                setIsLoggedIn(true);
            }
            setIsLoading(false);
        };
        checkToken();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <>
            {isLoggedIn ? (
                <MainScreen logOutSuccess={logOutSuccess} />
            ) : (
                <LandingPage logInSuccess={logInSuccess} />
            )}
        </>
    );
}

export default App;
