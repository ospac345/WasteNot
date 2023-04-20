import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const ListContext = createContext();


const ListContextProvider = (props) => {
    const [lists, setLists] = useState([]);
    const [username, setUsername] = useState('');

    const _retrieveUsername = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            if (username !== null) {
                setUsername(username);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        _retrieveUsername();
    }, [addItem, removeItems, updateItem]);

    //SERVER_URL = 'http://localhost:3001' | 'http://192.168.1.143:3001';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post(SERVER_URL + '/api', { username: username });
                setLists(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (username) {
            fetchData();
        }
    }, [username]);


    const addItem = async (item, username) => {
        try {
            await axios.post(SERVER_URL + '/api/addNewEntry', { ...item, username });
            const result = await axios.post(SERVER_URL + '/api', { username: username });
            setLists(result.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const removeItems = async (username, itemIds) => {
        try {
            await axios.post(SERVER_URL + '/api/remove', { username, itemIds });
            const result = await axios.post(SERVER_URL + '/api', { username: username });
            setLists(result.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const updateItem = async (username, item) => {
        try {
            await axios.post(SERVER_URL + '/api/update', { username, item });
            const result = await axios.post(SERVER_URL + '/api', { username: username });
            setLists(result.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return (
        <ListContext.Provider value={{ lists, addItem, removeItems, updateItem, username }}>
            {props.children}
        </ListContext.Provider>
    );
};

export default ListContextProvider;



