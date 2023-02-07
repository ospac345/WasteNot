import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddItemToToListModal from './AddItemToListModal';
import styles from '../styleSheet/componentsStyleSheet';
import SortItems from './SortItems';

const BottomButtonLists = (props) => {
    const [showSortMenu, setShowSortMenu] = useState(false);


    const handleSortMenu = () => {
        setShowSortMenu(!showSortMenu);
    }

    return (

        <View style={styles.BottomButtonsContainer}>
            <AddItemToToListModal username={props.username} />
            <TouchableOpacity
                style={[styles.BottomButton]}
                onPress={() => handleSortMenu()}
            >
                <Text style={[styles.buttonText, { paddingHorizontal: 20 }]}><MaterialCommunityIcons name="sort" /> Sort </Text>
            </TouchableOpacity>
            {showSortMenu && <SortItems handleSortMenu={handleSortMenu} />}
        </View>
    );
}


export default BottomButtonLists;
