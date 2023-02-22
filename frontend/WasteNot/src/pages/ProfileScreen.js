
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
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Profile Page</Text>
                <TouchableOpacity onPress={() => logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </>

    );
}

export default ProfileScreen;