import React, { useState, useContext } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import styles from '../styleSheet/componentsStyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker'
import QuantityModal from './QuantityModal';
import CategoryModal from './CategoryModal';
import { ListContext } from '../context/ListContext';

const ItemDetailView = ({ selectedItem, username, onClose }) => {
    const { updateItem } = useContext(ListContext);
    const [text, setText] = useState(selectedItem ? selectedItem.name : '');
    const [selectedLocation, setSelectedLocation] = useState(selectedItem ? selectedItem.location : '');
    const [selectedExpirationDate, setSelectedExpirationDate] = useState(new Date(selectedItem.expiration_date ? selectedItem.expiration_date : new Date()));
    const [selectedCategory, setSelectedCategory] = useState(selectedItem ? selectedItem.category : '');
    const [selectedNumber, setSelectedNumber] = useState(selectedItem ? selectedItem.quantity : 1);
    const [selectedUnit, setSelectedUnit] = useState(selectedItem ? selectedItem.unit : 'piece(s)');
    const [dateOpen, setDateOpen] = useState(false);


    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let current = selectedExpirationDate;
    let date = `${current.getDate()}. ${current.getMonth() + 1}. ${current.getFullYear()}`;
    let dateWithDay = `${days[current.getDay()]}, ${months[current.getMonth()]} ${current.getDate()}, ${current.getFullYear()}`;

    const DaysCalculator = date => {
        const dateObj = new Date(date);
        return Math.round((dateObj - Date.now()) / (1000 * 60 * 60 * 24));
    };

    const updateSelectedValues = (number, unit) => {
        setSelectedNumber(number);
        setSelectedUnit(unit);
    };

    const updateSelectedCategory = (newCategory) => {
        setSelectedCategory(newCategory);
    };

    const item = { ...selectedItem, name: text, location: selectedLocation, expiration_date: selectedExpirationDate, category: selectedCategory, quantity: selectedNumber, unit: selectedUnit };

    return (
        <Modal animationType='fade' transparent={false} visible={!!selectedItem}>
            <View style={styles.modalContainer}>

                {selectedItem ? (
                    <>

                        <View>
                            <TextInput
                                style={[styles.textInput, { borderColor: '#888334' }]}
                                value={text}
                                onChangeText={setText}
                                placeholder="Item . . ."
                                autoFocus={true}
                                clearButtonMode="always"

                            />
                        </View>
                        <TouchableOpacity
                            style={[styles.closeButton]}
                            onPress={() => {
                                onClose();
                            }}
                        >
                            <Text style={[styles.closeButtonText, { color: '#888334' }]}><MaterialCommunityIcons size={30} name="close-circle-outline" /></Text>
                        </TouchableOpacity>

                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Move to:</Text>

                        <View horizontal={true} style={styles.addToLocationContainer}>
                            <TouchableOpacity
                                style={[styles.BottomButton, selectedLocation === 'pantry' ? [styles.selectedButton, { backgroundColor: '#888334' }] : null]}
                                onPress={() => {
                                    setSelectedLocation('pantry');
                                }}
                            >
                                <Text style={[styles.buttonText, selectedLocation === 'pantry' ? styles.selectedButtonText : null]}><MaterialCommunityIcons size={18} name='storefront-outline' /> My Pantry</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.BottomButton, selectedLocation === 'fridge' ? [styles.selectedButton, { backgroundColor: '#888334' }] : null]}
                                onPress={() => {
                                    setSelectedLocation('fridge');
                                }}
                            >
                                <Text style={[styles.buttonText, selectedLocation === 'fridge' ? styles.selectedButtonText : null]}><MaterialCommunityIcons size={18} name='fridge' /> My Fridge</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.BottomButton, selectedLocation === 'freezer' ? [styles.selectedButton, { backgroundColor: '#888334' }] : null]}
                                onPress={() => {
                                    setSelectedLocation('freezer');
                                }}
                            >
                                <Text style={[styles.buttonText, selectedLocation === 'freezer' ? styles.selectedButtonText : null]}><MaterialCommunityIcons size={18} name='snowflake' /> My Freezer</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Increase expiration date</Text>
                        <View style={styles.expirationDaysButtonGroup}>
                            <TouchableOpacity
                                style={[styles.BottomButton]}
                                onPress={() => {
                                    setSelectedExpirationDate(new Date(current.setDate(current.getDate() + 3)));
                                }}
                            >
                                <Text style={styles.buttonText}>+3 Days</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.BottomButton]}
                                onPress={() => {
                                    setSelectedExpirationDate(new Date(current.setDate(current.getDate() + 7)));
                                }}
                            >
                                <Text style={styles.buttonText}>+7 Days</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.BottomButton, { backgroundColor: '#888334' }]}
                                onPress={() => {
                                    setDateOpen(true);
                                }}
                            >
                                <Text style={[styles.buttonText, { color: 'white' }]}>{date}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: '#adadad' }}>{dateWithDay}</Text>
                        <Text style={{ color: '#888334', fontWeight: 'bold' }}>{DaysCalculator(current)} days from today!</Text>

                        <Text style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Change Details</Text>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            padding: 8,
                            width: 340,
                            borderBottomWidth: 1,
                            borderTopWidth: 1,
                            borderColor: '#888334',
                        }}>
                            <CategoryModal onSelection={updateSelectedCategory} selectedCategory={selectedCategory} />
                            <Text style={{ color: '#888334', fontWeight: 'bold' }}>{selectedCategory}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            padding: 8,
                            width: 340,
                            borderBottomWidth: 1,
                            borderColor: '#888334',
                        }}>
                            <QuantityModal onSelection={updateSelectedValues} />
                            <Text style={{ color: '#888334', fontWeight: 'bold' }}>{selectedNumber} {selectedUnit}</Text>
                        </View>

                        <DatePicker
                            modal
                            open={dateOpen}
                            date={selectedExpirationDate}
                            mode="date"
                            minimumDate={new Date()}
                            onConfirm={(selectedExpirationDate) => {
                                setDateOpen(false)
                                setSelectedExpirationDate(selectedExpirationDate)
                            }}
                            onCancel={() => {
                                setDateOpen(false)
                            }}
                        />
                    </>
                ) : null}

                <TouchableOpacity
                    style={[styles.BottomButton, {
                        backgroundColor: '#888334', position: 'absolute', top: 700, right: 110, width: 150, padding: 7,
                    }]}
                    onPress={() => {
                        if (text === '' || text === null) {
                            Alert.alert('Please enter an item');
                        }
                        else {
                            onClose();
                            updateItem(username, item);
                        }
                    }}
                >
                    <Text style={[styles.buttonText, { color: 'white', fontWeight: 'bold' }]}>+ Update item</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ItemDetailView;


