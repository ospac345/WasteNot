import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddItemToToListModal from './AddItemToListModal';
import styles from '../styleSheet/componentsStyleSheet';

const BottomButtonLists = () => {


    const handlePress = (button) => {
        // setSelectedButton(button);
    }

    return (

        <View style={styles.BottomButtonsContainer}>
            <AddItemToToListModal />
            <TouchableOpacity
                style={[styles.BottomButton]}
                onPress={() => handlePress('sort')}
            >
                <Text style={styles.buttonText}><MaterialCommunityIcons name="sort" /> Sort </Text>
            </TouchableOpacity>

        </View>
    );
}


export default BottomButtonLists;
