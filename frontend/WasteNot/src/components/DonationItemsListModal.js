import { TouchableOpacity, Text, Modal, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const DonationItemsListModal = () => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableOpacity
                onPress={() => { setModalVisible(!modalVisible) }}
            >
                <Text>List<MaterialCommunityIcons name="cart-arrow-right" size={30} color="black" /> </Text>
            </TouchableOpacity>

            {
                modalVisible &&
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Donation List</Text>
                            <TouchableOpacity
                                onPress={() => { setModalVisible(!modalVisible) }}
                            >
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </Modal>
            }

        </>
    );
};

export default DonationItemsListModal;



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

