import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styleSheet/componentsStyleSheet';
import CategoryModal from './CategoryModal';
import QuantityModal from './QuantityModal';


const AddItemToToListModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');
    const [selectedPantry, setSelectedPantry] = useState(false);
    const [selectedFridge, setSelectedFridge] = useState(false);
    const [selectedFreezer, setSelectedFreezer] = useState(false);
    const [selectedExpirationDate, setSelectedExpirationDate] = useState('');
    const [selectedNumber, setSelectedNumber] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState('piece(s)');
    const [notesText, setNotesText] = useState('');
    const [textAreaVisible, setTextAreaVisible] = useState(false);




    const current = new Date();
    const date = `${current.getDate()}. ${current.getMonth() + 1}. ${current.getFullYear()}`;

    const updateSelectedValues = (number, unit) => {
        setSelectedNumber(number);
        setSelectedUnit(unit);
    };


    return (

        <>
            <TouchableOpacity
                style={[styles.BottomButton]}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text style={styles.buttonText}><MaterialCommunityIcons name="plus-circle" /> Add</Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={false} visible={modalVisible}>

                <View style={styles.modalContainer}>
                    <View>
                        <TextInput
                            style={styles.textInput}
                            value={text}
                            onChangeText={setText}
                            placeholder="Item . . ."
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
                            style={[styles.BottomButton, selectedPantry ? styles.selectedButton : null]}
                            onPress={() => {
                                setSelectedPantry(!selectedPantry);
                                setSelectedFridge(false);
                                setSelectedFreezer(false);
                            }}

                        >
                            <Text style={[styles.buttonText, selectedPantry ? styles.selectedButtonText : null]}><MaterialCommunityIcons size={18} name='storefront-outline' /> My Pantry</Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.BottomButton, selectedFridge ? styles.selectedButton : null]}
                            onPress={() => {
                                setSelectedFridge(!selectedFridge);
                                setSelectedPantry(false);
                                setSelectedFreezer(false);
                            }}

                        >
                            <Text style={[styles.buttonText, selectedFridge ? styles.selectedButtonText : null]}><MaterialCommunityIcons size={18} name='fridge' /> My Fridge</Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.BottomButton, selectedFreezer ? styles.selectedButton : null]}
                            onPress={() => {
                                setSelectedFreezer(!selectedFreezer);
                                setSelectedPantry(false);
                                setSelectedFridge(false);
                            }}

                        >
                            <Text style={[styles.buttonText, selectedFreezer ? styles.selectedButtonText : null]}><MaterialCommunityIcons size={18} name='snowflake' /> My Freezer</Text>

                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Select an expiration date</Text>
                    <View style={styles.expirationDaysButtonGroup}>
                        <TouchableOpacity
                            style={[styles.BottomButton]}
                            onPress={() => {
                                setModalVisible(true);
                            }}
                        >
                            <Text style={styles.buttonText}>+3 Days</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.BottomButton]}
                            onPress={() => {
                                setModalVisible(true);
                            }}
                        >
                            <Text style={styles.buttonText}>+7 Days</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.BottomButton]}
                            onPress={() => {

                            }}
                        >
                            <Text style={styles.buttonText}>{date}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Details</Text>

                    <View style={styles.expirationDaysButtonGroup}>
                        <QuantityModal onSelection={updateSelectedValues} />
                        <CategoryModal />

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

                    <TouchableOpacity
                        style={[styles.BottomButton, {
                            backgroundColor: '#698834', position: 'absolute', top: 700, right: 110, width: 150, padding: 7,
                        }]}
                        onPress={() => {
                            //setTextAreaVisible(!textAreaVisible);
                        }}
                    >
                        <Text style={[styles.buttonText, { color: 'white', fontWeight: 'bold' }]}>+ Add item</Text>
                    </TouchableOpacity>

                </View>

            </Modal>
        </>

    );
}

export default AddItemToToListModal;