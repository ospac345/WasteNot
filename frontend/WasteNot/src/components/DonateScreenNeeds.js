import { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListContext } from '../context/ListContext';


const DonateScreenNeeds = ({ needs }) => {
    const { lists } = useContext(ListContext);
    const [result, setResult] = useState({});


    useEffect(() => {
        if (needs === 'Unknown' || !needs || !lists) {
            setResult({});
        } else {

            const needsList = needs.split("\n");
            const needsArray = needsList.reduce((acc, item) => {
                acc[item] = lists.items.some(apiItem =>
                    apiItem.name.toLowerCase().includes(item.toLowerCase())
                );
                return acc;
            }, {});


            setResult(needsArray);
            //console.log('needsArray log', needsArray);
        }
    }, [needs, lists]);


    return (
        <View style={Styles.needsContainer}>
            {needs === 'Unknown' || !needs ? (
                <Text style={{ color: 'black' }}>
                    No needs published yet! Please check later. Thanks
                </Text>
            ) : (
                <View>
                    {Object.keys(result).length === 0 ? (
                        <Text style={{ color: 'black' }}>
                            Loading...
                        </Text>
                    ) : (
                        Object.keys(result).map((item, index) => (
                            <Text key={index} style={{ color: result[item] ? 'white' : 'black', fontSize: 14, fontWeight: 'bold' }}>
                                {`${item} ${result[item] ? '- Available in my kitchen' : ''}`}
                            </Text>
                        ))
                    )}
                </View>
            )}
        </View>
    );
};

export default DonateScreenNeeds;


const Styles = StyleSheet.create({
    needsContainer: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: '#888334',
        borderRadius: 5
    }
});