import {
    useGetListQuery
} from '..//redux/slices/listApi';

import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';



const ListsScreen = () => {

    const { data } = useGetListQuery('');
    const [list, setList] = useState([]);


    useEffect(() => {
        if (data && data.length > 0) {
            const items = data.map(list => list.items);
            setList(items[0]);
        }
    }, [data]);

    console.log('this log is from Lists Screen', list);

    return (
        <View>
            <Text>Test Text</Text>
            <FlatList
                data={list}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );

}

export default ListsScreen;

