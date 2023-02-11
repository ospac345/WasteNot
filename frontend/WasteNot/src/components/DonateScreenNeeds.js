import { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListContext } from '../context/ListContext';


const DonateScreenNeeds = ({ needs }) => {
    const { lists } = useContext(ListContext);
    const [result, setResult] = useState({});

    useEffect(() => {
        if (needs === 'Unknown' || !needs) {
            setResult({});
            return;
        }

        if (!lists || !lists.length) {
            setResult({});
            return;
        }


        const needsList = needs.split("\n");

        const result = {};
        for (const item of needsList) {
            result[item] = false;
            for (const apiItem of lists[0].items) {
                if (apiItem.name.toLowerCase().includes(item.toLowerCase())) {
                    result[item] = true;
                    break;
                }
            }
        }

        setResult(result);
    }, [needs, lists]);


    return (
        <View style={Styles.needsContainer}>
            {needs === 'Unknown' || !needs ? (
                <Text style={{ color: 'red' }}>
                    No needs published yet! Please check later. Thanks
                </Text>
            ) : (
                <View>
                    {Object.keys(result).length === 0 ? (
                        <Text style={{ color: 'red' }}>
                            Loading...
                        </Text>
                    ) : (
                        Object.keys(result).map((item, index) => (
                            <Text key={index} style={{ color: result[item] ? 'white' : 'black' }}>
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