import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_URL } from '../constants/constants';


const LandingPage = (props) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [householdName, setHouseholdName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setUsername('');
        setPassword('');
        setHouseholdName('');
    };

    const resetAll = () => {
        setUsername('');
        setPassword('');
        setHouseholdName('');
    };

    // Store the token in AsyncStorage
    _storeToken = async (token) => {
        try {
            await AsyncStorage.multiSet([
                ['userToken', token],
                ['username', username],
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        if (!username || !password) {
            setErrorMessage('Username and password are required fields');
            return;
        }

        if (!isLogin && !householdName) {
            setErrorMessage('Household name is required');
            return;
        }

        try {
            let endpoint = '';
            let payload = {};
            if (isLogin) {
                endpoint = SERVER_URL + "/login";
                payload = { username, password };
            } else {
                endpoint = SERVER_URL + '/register';
                payload = { username, password, householdName };
            }
            const response = await axios.post(endpoint, payload);
            _storeToken(response.data.token);
            props.logInSuccess();
            resetAll();
        } catch (error) {
            Alert.alert('Error', error.response.data.error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Waste<Text style={styles.logoInnerText}>Not</Text></Text>
            <Text>{isLogin ? 'Login' : 'Register'}</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Username... your email address"
                    autoCapitalize='none'
                    autoCorrect={false}
                    inputMode='email'
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
                {!isLogin && (
                    <TextInput
                        style={styles.input}
                        placeholder="Household name"
                        value={householdName}
                        onChangeText={text => setHouseholdName(text)}
                    />
                )}
                {errorMessage.length > 0 && (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                )}
                <Button style={styles.button} title="Submit" onPress={handleSubmit} />
                <Button style={styles.toggleButton} title={isLogin ? 'Need to register?' : 'Already have an account?'} onPress={toggleForm} />
            </View>
        </View>
    );
};

export default LandingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    form: {
        width: '100%',
        marginVertical: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        width: '100%'
    },
    button: {
        width: '100%',
        marginVertical: 10,

    },
    toggleButton: {
        width: '100%',
        marginVertical: 10,
        alignSelf: 'center'
    },
    logo: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#698834'
    },
    logoInnerText: {
        color: '#000000'
    },
    errorMessage: {
        color: 'red'
    }
});
