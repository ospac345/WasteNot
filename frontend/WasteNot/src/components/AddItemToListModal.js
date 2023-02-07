import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styleSheet/componentsStyleSheet';
import CategoryModal from './CategoryModal';
import QuantityModal from './QuantityModal';
import DatePicker from 'react-native-date-picker'
import { ListContext } from '../context/ListContext';


const AddItemToToListModal = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Other');
    const [selectedLocation, setSelectedLocation] = useState('pantry');
    const [selectedExpirationDate, setSelectedExpirationDate] = useState(new Date());
    const [selectedNumber, setSelectedNumber] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState('piece(s)');
    const [notesText, setNotesText] = useState('');
    const [textAreaVisible, setTextAreaVisible] = useState(false);
    const [dateOpen, setDateOpen] = useState(false);

    const { addItem } = useContext(ListContext);


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

    const item = { name: text, quantity: selectedNumber, unit: selectedUnit, expiration_date: selectedExpirationDate, category: selectedCategory, location: selectedLocation, notes: notesText };


    return (

        <>
            <TouchableOpacity
                style={[styles.BottomButton]}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text style={[styles.buttonText, { paddingHorizontal: 20 }]}><MaterialCommunityIcons name="plus-circle" /> Add</Text>
            </TouchableOpacity>

            {modalVisible && <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View>
                        <TextInput
                            style={styles.textInput}
                            value={text}
                            onChangeText={setText}
                            placeholder="Item..."
                            autoFocus={true}
                            clearButtonMode="always"

                        />
                    </View>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Text style={styles.closeButtonText}><MaterialCommunityIcons size={30} name="close-circle-outline" /></Text>
                    </TouchableOpacity>


                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Add to</Text>

                    <View horizontal={true} style={styles.addToLocationContainer}>
                        <TouchableOpacity
                            style={[styles.BottomButton, selectedLocation === 'pantry' ? styles.selectedButton : null]}
                            onPress={() => {
                                setSelectedLocation('pantry');
                            }}
                        >
                            <Text style={[styles.buttonText, selectedLocation === 'pantry' ? styles.selectedButtonText : null]}><MaterialCommunityIcons size={18} name='storefront-outline' /> My Pantry</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.BottomButton, selectedLocation === 'fridge' ? styles.selectedButton : null]}
                            onPress={() => {
                                setSelectedLocation('fridge');
                            }}
                        >
                            <Text style={[styles.buttonText, selectedLocation === 'fridge' ? styles.selectedButtonText : null]}><MaterialCommunityIcons size={18} name='fridge' /> My Fridge</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.BottomButton, selectedLocation === 'freezer' ? styles.selectedButton : null]}
                            onPress={() => {
                                setSelectedLocation('freezer');
                            }}
                        >
                            <Text style={[styles.buttonText, selectedLocation === 'freezer' ? styles.selectedButtonText : null]}><MaterialCommunityIcons size={18} name='snowflake' /> My Freezer</Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Select an expiration date</Text>
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
                            style={[styles.BottomButton, { backgroundColor: '#698834' }]}
                            onPress={() => {
                                setDateOpen(true);
                            }}
                        >
                            <Text style={[styles.buttonText, { color: 'white' }]}>{date}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ color: '#adadad' }}>{dateWithDay}</Text>
                    <Text style={{ color: '#698834', fontWeight: 'bold' }}>{DaysCalculator(current)} days from today!</Text>

                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Details</Text>

                    <View style={styles.expirationDaysButtonGroup}>
                        <QuantityModal onSelection={updateSelectedValues} />

                        <CategoryModal onSelection={updateSelectedCategory} />

                        <TouchableOpacity
                            style={[styles.BottomButton]}
                            onPress={() => {
                                setTextAreaVisible(!textAreaVisible);
                            }}
                        >
                            <Text style={styles.buttonText}>notes</Text>
                        </TouchableOpacity>

                    </View>

                    {textAreaVisible &&
                        <TextInput
                            style={[styles.textInput, { height: 70 }]}
                            value={notesText}
                            onChangeText={setNotesText}
                            placeholder="Notes... e.g. 'I like them green and ripe'"
                            autoFocus={true}
                            clearButtonMode="always"
                        />
                    }

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

                    <TouchableOpacity
                        style={[styles.BottomButton, {
                            backgroundColor: '#698834', position: 'absolute', top: 700, right: 110, width: 150, padding: 7,
                        }]}
                        onPress={() => {
                            if (text === '' || text === null) {
                                Alert.alert('Please enter an item');
                            }
                            else {
                                setModalVisible(false);
                                addItem(item, props.username);
                                setSelectedExpirationDate(new Date());
                                setText('');
                            }
                        }}
                    >
                        <Text style={[styles.buttonText, { color: 'white', fontWeight: 'bold' }]}>+ Add item</Text>
                    </TouchableOpacity>

                </View>

            </Modal>
            }
        </>

    );
}

export default AddItemToToListModal;