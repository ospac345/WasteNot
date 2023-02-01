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

    return (
        <ListContext.Provider value={{ lists }}>
            {props.children}
        </ListContext.Provider>
    );
};

export default ListContextProvider;


