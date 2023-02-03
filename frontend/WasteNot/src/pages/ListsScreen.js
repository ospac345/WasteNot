import React, { useContext, useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomButtonLists from '../components/BottomButtonLists';
import ListsStyleSheet from '../styleSheet/ListsStyleSheet';
import ListsTopFilter from '../components/ListsTopFilter';
import { ListContext } from '../context/ListContext';

const ListsScreen = () => {
    const { lists } = useContext(ListContext);
    const [selectedValue, setSelectedValue] = useState('myKitchen');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!lists || !lists[0] || !lists[0].items) {
            setIsLoading(true);
            return;
        }

        setIsLoading(false);
    }, [lists]);

    const Capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

    const DaysCalculator = date => {
        const dateObj = new Date(date);
        return Math.round((dateObj - Date.now()) / (1000 * 60 * 60 * 24));
    };

    const handleSelectedValue = value => setSelectedValue(value);

    const filteredList = () => {
        if (selectedValue === 'myKitchen') {
            return lists[0].items;
        }

        return lists[0].items.filter(item => item.location === selectedValue);
    };

    return (
        <>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading...</Text>
                </View>
            ) : (
                <>
                    <ListsTopFilter onValueChange={handleSelectedValue} />
                    <FlatList
                        data={filteredList()}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <View style={{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                padding: 10,
                                margin: 10,
                            }}>
                                <Text style={ListsStyleSheet.itemName}>{Capitalize(item.name)}</Text>
                                <Text style={ListsStyleSheet.expirationDays} >Expires in {DaysCalculator(item.expiration_date)} days</Text>
                                <View style={{ alignItems: "flex-end" }}>
                                    <MaterialCommunityIcons style={ListsStyleSheet.listCheckCircleIcon} name="check-circle" size={20} />
                                </View>
                            </View>
                        )} />
                    <BottomButtonLists />
                </>
            )}
        </>
    );
};

export default ListsScreen;

