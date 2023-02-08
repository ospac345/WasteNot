import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ComponentsStyleSheet from '../styleSheet/componentsStyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SortItems = (props) => {



    const sortTypeBackgroundColor = (sortType) => {
        if (sortType === props.currentSortType) {
            return { backgroundColor: '#698834' };
        }
        return {};
    };

    return (
        <>
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#888334',
                padding: 8,

            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Sort by</Text>

                    <TouchableOpacity style={[ComponentsStyleSheet.BottomButton]} onPress={props.handleSortMenu}>
                        <Text style={{ color: 'gray' }}>Close</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                    <TouchableOpacity style={[ComponentsStyleSheet.BottomButton, sortTypeBackgroundColor('name')]} onPress={() => props.handleSortTypeChange('name')}>
                        <Text ><MaterialCommunityIcons name={"sort-alphabetical-ascending"} size={15} /> Name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[ComponentsStyleSheet.BottomButton, sortTypeBackgroundColor('date')]} onPress={() => props.handleSortTypeChange('date')}>
                        <Text ><MaterialCommunityIcons name={"calendar-range"} size={15} /> Expiry</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[ComponentsStyleSheet.BottomButton, sortTypeBackgroundColor('addedOn')]} onPress={() => props.handleSortTypeChange('addedOn')}>
                        <Text ><MaterialCommunityIcons name={"calendar-check"} size={15} /> Added</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </>
    );
}

export default SortItems;