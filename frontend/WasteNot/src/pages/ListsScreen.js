import React, { useContext, useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomButtonLists from '../components/BottomButtonLists';
import ListsStyleSheet from '../styleSheet/ListsStyleSheet';
import ListsTopFilter from '../components/ListsTopFilter';
import { ListContext } from '../context/ListContext';
import ItemDetailView from '../components/ItemDetailView';
import ComponentsStyleSheet from '../styleSheet/componentsStyleSheet';


const ListsScreen = () => {
    const { lists, removeItems, username } = useContext(ListContext);
    const [selectedValue, setSelectedValue] = useState('myKitchen');
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [filteredItems, setFilteredItems] = useState();
    const [currentSortType, setCurrentSortType] = useState('date');



    useEffect(() => {
        if (lists) {
            filteredList();
        }

    }, [lists, selectedValue]);

    const filteredList = () => {
        if (lists) {
            if (selectedValue === 'myKitchen') {
                setFilteredItems(lists.items);
            } else {
                setFilteredItems(lists.items.filter(item => item.location === selectedValue));
            }
        }
    };

    const Capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

    const DaysCalculator = date => {
        const dateObj = new Date(date);
        return Math.round((dateObj - Date.now()) / (1000 * 60 * 60 * 24));
    };

    const handleSelectedValue = value => setSelectedValue(value);


    const handleRemoveItems = () => {
        removeItems(username, selectedIds);
        setSelectedIds([]);
    };

    const sortList = (sortBy) => {
        if (sortBy === 'date') {
            setFilteredItems([...filteredItems].sort((a, b) => new Date(...a.expiration_date.split('/').reverse()) - new Date(...b.expiration_date.split('/').reverse())));
        } else if (sortBy === 'name') {
            setFilteredItems([...filteredItems].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (sortBy === 'added') {
            setFilteredItems([...filteredItems].sort((a, b) => new Date(...a.added_date.split('/').reverse()) - new Date(...b.added_date.split('/').reverse())));
        }
    };

    const handleSortTypeChange = (sortBy) => {
        setCurrentSortType(sortBy);
        sortList(sortBy);
    };



    return (
        <>

            <>
                <ListsTopFilter onValueChange={handleSelectedValue} />
                <FlatList
                    data={filteredItems}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                padding: 10,
                                margin: 10,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 2,
                                elevation: 2.5
                            }}
                            onPress={() => setSelectedItem(item)}

                        >

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={ListsStyleSheet.itemName}>{Capitalize(item.name)}</Text>
                                <Text style={ListsStyleSheet.itemLocation}>{item.location === 'pantry' ? 'My Pantry' : item.location === 'fridge' ? 'My Fridge' : item.location === 'freezer' ? 'My Freezer' : item.location}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={ListsStyleSheet.expirationDays}>
                                    {DaysCalculator(item.expiration_date) > 0
                                        ? `Expires in ${DaysCalculator(item.expiration_date)} days`
                                        : "Expired"}
                                </Text>


                            </View>

                            <View style={{ alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={() => {
                                    if (selectedIds.includes(item.id)) {
                                        setSelectedIds(selectedIds.filter(id => id !== item.id));
                                    } else {
                                        setSelectedIds([...selectedIds, item.id]);
                                    }
                                }}>
                                    <MaterialCommunityIcons
                                        style={ListsStyleSheet.listCheckCircleIcon}
                                        name={selectedIds.includes(item.id) ? "check-circle" : "checkbox-blank-circle-outline"}
                                        size={25}
                                    />
                                </TouchableOpacity>
                            </View>


                        </TouchableOpacity>

                    )} />

                {((lists.items === undefined) || (lists.items.length === 0)) && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No items in your kitchen...</Text>
                </View>}
                <BottomButtonLists username={username} handleSortTypeChange={handleSortTypeChange} currentSortType={currentSortType} />

                {selectedItem && (
                    <ItemDetailView
                        selectedItem={selectedItem}
                        username={username}
                        onClose={() => setSelectedItem(null)}

                    />
                )}
            </>

            {selectedIds.length > 0 && (
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#888334',
                    padding: 10,
                    elevation: 5,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.5,
                    shadowRadius: 5
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{selectedIds.length} item(s) selected</Text>
                        <TouchableOpacity style={[ComponentsStyleSheet.BottomButton]} onPress={() => setSelectedIds([])}>
                            <Text style={[{ color: '#696969' }]}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                        <TouchableOpacity style={[ComponentsStyleSheet.BottomButton]} onPress={() => handleRemoveItems()}>
                            <Text style={[{ color: 'green' }]}><MaterialCommunityIcons name={"check"} size={15} /> Consumed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[ComponentsStyleSheet.BottomButton]} onPress={() => handleRemoveItems()}>

                            <Text style={[{ color: 'red' }]}><MaterialCommunityIcons name={"delete"} size={15} /> Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

        </>
    );
};

export default ListsScreen;

