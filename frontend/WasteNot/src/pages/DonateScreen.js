import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Platform, Alert, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DonateScreenNeeds from "../components/DonateScreenNeeds";
import DonationItemsListModal from "../components/DonationItemsListModal";
import openMap, { createMapLink } from 'react-native-open-maps';

const DonateScreen = () => {
    const [foodbanks, setFoodbanks] = useState([]);
    const [postcode, setPostcode] = useState('');
    const [showNeeds, setShowNeeds] = useState(true);
    const [needs, setNeeds] = useState('');
    const [selectedFoodbankIndex, setSelectedFoodbankIndex] = useState(-1);

    // Function to store postcode in local storage
    const storePostcode = async (postcode) => {
        try {
            await AsyncStorage.setItem('postcode', postcode);
        } catch (error) {
            console.error(error);
        }
    };

    const retrievePostcode = async () => {
        try {
            const storedPostcode = await AsyncStorage.getItem('postcode');
            if (storedPostcode) {
                setPostcode(storedPostcode);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const setDonationNeeds = (needs, index) => {
        setNeeds(needs);
        setSelectedFoodbankIndex(index);
        setShowNeeds(!showNeeds);
    };


    const fetchData = useEffect(() => {
        if (postcode) {
            axios.get(`https://www.givefood.org.uk/api/2/foodbanks/search/?address=${postcode}`)
                .then(response => {
                    setFoodbanks(response.data);
                })
                .catch(error => {
                    setError(error);
                });
        }
    }, [postcode]);

    // Call retrievePostcode on component mount
    useEffect(() => {
        retrievePostcode();
    }, []);

    const handlePress = (latitude, longitude, query) => {
        let latitudeParsed = parseFloat(latitude);
        let longitudeParsed = parseFloat(longitude);
        console.log(latitudeParsed, longitudeParsed);
        openMap({ latitude: latitudeParsed, longitude: longitudeParsed, query: query, zoom: 0 });
    };

    const changePostcode = () => {
        Alert.prompt(
            'Enter Postcode',
            'Enter your postcode to find nearest food banks',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: (postcode) => {
                        if (!postcode) return;
                        setPostcode(postcode);
                        storePostcode(postcode);
                    },
                },
            ],
        );
    };

    return (
        <View style={styles.container}>
            {postcode ? (
                <View style={styles.postcodeContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.postcodeText}><MaterialCommunityIcons size={25} name="map-marker" /> {postcode}</Text>
                        <TouchableOpacity
                            style={styles.postcodeButton}
                            onPress={changePostcode}>
                            <Text style={styles.postcodeButtonText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <DonationItemsListModal />
                </View>
            ) : (
                <Button
                    title="Enter Postcode"
                    onPress={changePostcode}
                />
            )}
            <Text style={styles.title}>Foodbanks</Text>
            <FlatList
                style={styles.flatList}
                data={foodbanks}
                keyExtractor={item => item.slug}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.foodbankName}>{item.name}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(item.urls.homepage)}>
                                <MaterialCommunityIcons style={{ marginLeft: 5, color: '#698834' }} size={20} name="open-in-new" />
                            </TouchableOpacity>

                        </View>
                        <Text style={styles.foodbankAddress}>{item.address}</Text>
                        <Text style={styles.foodbankDistance}>
                            Distance: {item.distance_mi} miles
                        </Text>

                        <View style={styles.foodBankLinks}>
                            <TouchableOpacity onPress={() => handlePress(item.lat_lng.split(",")[0], item.lat_lng.split(",")[1], item.name)}>
                                <Text style={styles.foodbankDirections}>Directions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setDonationNeeds(item.needs.needs, index)}>

                                <Text style={styles.foodbankDirections}>Needs <MaterialCommunityIcons size={18} name="arrow-down-drop-circle-outline" /></Text>

                            </TouchableOpacity>
                        </View>

                        {showNeeds && selectedFoodbankIndex === index && needs && (
                            <DonateScreenNeeds needs={needs} />
                        )}

                    </View>
                )}
            />
        </View>
    );
};

export default DonateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 50
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#698834"
    },
    flatList: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 10,
        backgroundColor: "#fff"
    },
    itemContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    foodbankName: {
        fontSize: 18,
        fontWeight: "bold"
    },
    foodbankAddress: {
        fontSize: 16,
        color: "#666"
    },
    foodbankDistance: {
        fontSize: 16,
        fontFamily: "Avenir",
        fontWeight: "bold"
    },
    foodbankDirections: {
        fontSize: 16,
        color: "#698834"
    },
    postcodeContainer: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        justifyContent: "space-between"
    },
    postcodeButton: {
        fontSize: 10,
        fontWeight: "bold",
        color: "black",
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginLeft: 10

    },
    postcodeText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "gray"
    },
    foodBankLinks: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    }
});

