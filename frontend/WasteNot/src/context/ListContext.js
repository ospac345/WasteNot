import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const ListContext = createContext();

const ListContextProvider = (props) => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:3001/api');
                setLists(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const addItem = async (item, username) => {
        try {
            await axios.post('http://localhost:3001/api/addNewEntry', { ...item, username });
            const result = await axios.get('http://localhost:3001/api');
            setLists(result.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const removeItems = async (username, itemIds) => {
        try {
            await axios.post('http://localhost:3001/api/remove', { username, itemIds });
            const result = await axios.get('http://localhost:3001/api');
            setLists(result.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const updateItem = async (username, item) => {
        try {
            await axios.post('http://localhost:3001/api/update', { username, item });
            const result = await axios.get('http://localhost:3001/api');
            setLists(result.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };



    return (
        <ListContext.Provider value={{ lists, addItem, removeItems, updateItem }}>
            {props.children}
        </ListContext.Provider>
    );
};

export default ListContextProvider;



