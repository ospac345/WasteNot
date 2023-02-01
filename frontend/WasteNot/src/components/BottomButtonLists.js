import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomButtonLists = () => {
    const [selectedButton, setSelectedButton] = useState('add');
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = (button) => {
        setSelectedButton(button);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, selectedButton === 'add' ? styles.selected : {}]}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text style={styles.buttonText}><MaterialCommunityIcons name="plus-circle" /> Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedButton === 'sort' ? styles.selected : {}]}
                onPress={() => handlePress('sort')}
            >
                <Text style={styles.buttonText}><MaterialCommunityIcons name="sort" /> Sort </Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <Text> This is a text page </Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8,
        backgroundColor: '#f2f2f2',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    button: {
        backgroundColor: '#fff',
        padding: 7,
        borderRadius: 5
    },
    selected: {
        fontColor: '#698834',
    },
    buttonText: {
        color: '#698834',
        textAlign: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },
    closeButton: {
        backgroundColor: '#fff',
        padding: 7,
        borderRadius: 5,
        top: 20,
        right: 20
    },
    closeButtonText: {
        color: '#698834'
    }
}

export default BottomButtonLists;
