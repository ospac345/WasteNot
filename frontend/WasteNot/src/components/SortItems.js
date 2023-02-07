import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ComponentsStyleSheet from '../styleSheet/componentsStyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SortItems = (props) => {
    const [sortBy, setSortBy] = useState('date');

    return (
        <>
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
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                    <TouchableOpacity style={[ComponentsStyleSheet.BottomButton]} onPress={props.handleSortMenu}>
                        <MaterialCommunityIcons style={[{ color: '#696969' }]} name={"close-box"} size={15} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                    <TouchableOpacity style={[ComponentsStyleSheet.BottomButton]} onPress={() => setSortBy('date')}>
                        <Text style={[{ color: 'green' }]}><MaterialCommunityIcons name={"sort-alphabetical-ascending"} size={15} /> Sort by name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[ComponentsStyleSheet.BottomButton]} onPress={() => setSortBy('name')}>

                        <Text style={[{ color: 'red' }]}><MaterialCommunityIcons name={"calendar-range"} size={15} /> Sort by expiry</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    );
}

export default SortItems;