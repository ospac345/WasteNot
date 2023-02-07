import { View, TouchableOpacity, Text, Modal, Pressable, FlatList } from 'react-native';
import { useState } from 'react';
import styles from '../styleSheet/componentsStyleSheet';

const CategoryModal = ({ onSelection }) => {
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [category, setCategory] = useState('Other');
    const categories = ['Fruits', 'Vegetables', 'Other', 'Bakery', 'Beverages', 'Canned Goods', 'Dairy', 'Deli', 'Frozen', 'Meat', 'Produce'];


    const Category = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.QuantityModalViewItems, { backgroundColor }]}>
            <Text style={[{ color: textColor }]}>{item}</Text>
        </TouchableOpacity>
    );

    const renderCategory = ({ item }) => {
        const backgroundColor = item === category ? '#698834' : 'transparent';
        const color = item === category ? 'white' : 'black';

        return (
            <Category
                item={item}
                onPress={() => setCategory(item)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );


    };

    return (

        <><TouchableOpacity
            style={category === "Other" ? styles.BottomButton : [styles.BottomButton, { backgroundColor: '#698834' }]}
            onPress={() => {
                setCategoryModalVisible(true);
            }}
        >
            <Text style={category === "Other" ? { color: '#698834' } : { color: 'white', backgroundColor: '#698834' }}>
                {category === "Other" ? "Category" : category}
            </Text>
        </TouchableOpacity>

            <View style={styles.centeredView}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={categoryModalVisible}
                    onRequestClose={() => {
                        setQuantityModalVisible(!quantityModalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.QuantityModalView}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>Select category</Text>
                            <View style={styles.QuantityModalViewScrollGroup}>
                                <View style={styles.QuantityModalViewScrollView}>
                                    <FlatList
                                        data={categories}
                                        renderItem={renderCategory}
                                        keyExtractor={item => item.index}
                                        style={{ padding: 10 }}

                                    />
                                </View>
                            </View>
                            <Pressable
                                style={[styles.BottomButton, { marginTop: 20, paddingLeft: 20, paddingRight: 30, paddingLeft: 30, }]}
                                onPress={() => {
                                    setCategoryModalVisible(!categoryModalVisible);
                                    onSelection(category);
                                }}>
                                <Text style={styles.buttonText}>Save</Text>
                            </Pressable>

                        </View>
                    </View>
                </Modal>

            </View></>

    );
};

export default CategoryModal;