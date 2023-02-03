import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ComponentsStyleSheet from '../styleSheet/componentsStyleSheet';


function ListsTopFilter(props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('myKitchen');
    const [items, setItems] = useState([
        {
            label: 'My Kitchen (All)', value: 'myKitchen',
            icon: () => <MaterialCommunityIcons size={25} name='food-variant' style={ComponentsStyleSheet.listsTopFilterIcons} />
        },
        {
            label: 'My Pantry', value: 'pantry',
            icon: () => <MaterialCommunityIcons size={25} name='storefront-outline' style={ComponentsStyleSheet.listsTopFilterIcons} />
        },
        {
            label: 'My Fridge', value: 'fridge',
            icon: () => <MaterialCommunityIcons size={25} name='fridge' style={ComponentsStyleSheet.listsTopFilterIcons} />
        },
        {
            label: 'My Freezer', value: 'freezer',
            icon: () => <MaterialCommunityIcons size={25} name='snowflake' style={ComponentsStyleSheet.listsTopFilterIcons} />
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
