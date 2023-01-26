import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
    }
});

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setName('');
    };

    const handleSubmit = () => {
        if (isLogin) {
            // perform login logic here
        } else {
            // perform registration logic here
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Waste<Text style={styles.logoInnerText}>Not</Text></Text>
            <Text>{isLogin ? 'Login' : 'Register'}</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
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
                        placeholder="Name"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                )}
                <Button style={styles.button} title="Submit" onPress={handleSubmit} />
                <Button style={styles.toggleButton} title={isLogin ? 'Need to register?' : 'Already have an account?'} onPress={toggleForm} />
            </View>
        </View>
    );
};

export default LandingPage;
