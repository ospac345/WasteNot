
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


function ProfileScreen({ route }) {

    const logout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Log Out',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('userToken');
                            route.params.logOutSuccess();
                        } catch (error) {
                            console.error(error);
                        }
                    },
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, padding: 10 }}>Hi Test Household!</Text>
                <TouchableOpacity onPress={() => logout()}>
                    <Text style={{ color: 'green', padding: 10 }}>Logout</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 10, padding: 10, color: 'grey' }}>App developed for GCU by Syed Faisal Imam</Text>
            </View>
        </>

    );
}

export default ProfileScreen;