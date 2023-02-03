import { View, TouchableOpacity, Text, Modal, ScrollView, Pressable, FlatList } from 'react-native';
import { useState } from 'react';
import styles from '../styleSheet/componentsStyleSheet';

const QuantityModal = ({ onSelection }) => {
    const [quantityModalVisible, setQuantityModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState('piece(s)');
    const data = Array.from({ length: 100 }, (_, i) => i + 1);
    const units = ['bag(s)', 'bottle(s)', 'bundle(s)', 'can(s)', 'piece(s)', 'cup(s)', 'glass(es)', 'jar(s)', 'package(s)', 'pint(s)', 'pound(s)', 'quart(s)', 'roll(s)', 'sachet(s)', 'sheet(s)', 'slice(s)', 'spoon(s)', 'stick(s)', 'tablespoon(s)', 'teaspoon(s)', 'tube(s)', 'unit(s)'];


    const QuantityNumbers = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.QuantityModalViewItems, { backgroundColor }]}>
            <Text style={[{ color: textColor }]}>{item}</Text>
        </TouchableOpacity>
    );

    const Units = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.QuantityModalViewItems, { backgroundColor }]}>
            <Text style={[{ color: textColor }]}>{item}</Text>
        </TouchableOpacity>
    );

    const renderQuantityNumbers = ({ item }) => {
        const backgroundColor = item === quantity ? '#698834' : 'transparent';
        const color = item === quantity ? 'white' : 'black';

        return (
            <QuantityNumbers
                item={item}
                onPress={() => setQuantity(item)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    const renderUnits = ({ item }) => {
        const backgroundColor = item === unit ? '#698834' : 'transparent';
        const color = item === unit ? 'white' : 'black';

        return (
            <Units
                item={item}
                onPress={() => setUnit(item)}
                backgroundColor={backgroundColor}
                textColor={color}

            />
        );
    };

    return (

        <><TouchableOpacity
            style={[styles.BottomButton, { backgroundColor: '#698834' }]}
            onPress={() => {
                setQuantityModalVisible(true);
            }}
        >
            <Text style={{ color: 'white' }}>{quantity} {unit}</Text>
        </TouchableOpacity>

            <View style={styles.centeredView}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={quantityModalVisible}
                    onRequestClose={() => {
                        setQuantityModalVisible(!quantityModalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.QuantityModalView}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>Select quantity</Text>
                            <View style={styles.QuantityModalViewScrollGroup}>

                                <View style={styles.QuantityModalViewScrollView}>
                                    <FlatList
                                        data={data}
                                        renderItem={renderQuantityNumbers}
                                        keyExtractor={item => item.index}
                                        extraData={quantity}
                                        style={{ padding: 10 }}

                                    />
                                </View>

                                <View style={styles.QuantityModalViewScrollView}>
                                    <FlatList
                                        data={units}
                                        renderItem={renderUnits}
                                        keyExtractor={item => item.index}
                                        style={{ padding: 10 }}

                                    />
                                </View>
                            </View>
                            <Pressable
                                style={[styles.BottomButton, { marginTop: 20, paddingLeft: 20, paddingRight: 30, paddingLeft: 30, }]}
                                onPress={() => {
                                    setQuantityModalVisible(false);
                                    onSelection(quantity, unit);
                                }}>
                                <Text style={styles.buttonText}>Save</Text>
                            </Pressable>

                        </View>
                    </View>
                </Modal>


            </View></>

    );
};

export default QuantityModal;