import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ComponentsStyleSheet from '../styleSheet/componentsStyleSheet';


function ListsTopFilter(props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('myKitchen');
    const [items, setItems] = useState([
        {
            label: 'My Kitchen (All)', value: 'myKitchen', labelStyle: { color: 'red', fontWeight: 'bold' },
            icon: () => <MaterialCommunityIcons size={20} name='food-variant' style={ComponentsStyleSheet.listsTopFilterIconMyFridge} />
        },
        {
            label: 'My Pantry', value: 'pantry',
            icon: () => <MaterialCommunityIcons size={20} name='cupboard' />
        },
        {
            label: 'My Fridge', value: 'fridge',
            icon: () => <MaterialCommunityIcons size={20} name='fridge' />
        },
        {
            label: 'My Freezer', value: 'freezer',
            icon: () => <MaterialCommunityIcons size={20} name='snowflake' />
        }
    ]);

    const handleValueChange = (selectedValue) => {
        setValue(selectedValue);
        if (props.onValueChange) {
            props.onValueChange(selectedValue);
        }
    };

    return (
        <DropDownPicker
            style={{
                marginTop: 40,
                width: 190,
                alignSelf: 'center',
                backgroundColor: '#f0ffd7',
                borderRadius: 30,
                borderColor: 'transparent',
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={handleValueChange}
        />
    );
}

export default ListsTopFilter;
