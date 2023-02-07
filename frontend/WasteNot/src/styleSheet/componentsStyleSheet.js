import { StyleSheet } from 'react-native';

const ComponentsStyleSheet = StyleSheet.create({

    listsTopFilterIcons: {
        color: '#698834',

    },
    BottomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    BottomButton: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 15,
        paddingRight: 15,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#698834',
        margin: 3

    },
    selectedButton: {
        backgroundColor: '#698834'
    },
    selectedButtonText: {
        color: '#fff'
    },
    buttonText: {
        color: '#698834',
        textAlign: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    closeButton: {
        padding: 7,
        borderRadius: 5,
        top: 45,
        right: 20,
        position: 'absolute'
    },
    closeButtonText: {
        color: '#698834',
    },
    textInput: {
        marginTop: 150,
        height: 60,
        minWidth: '90%',
        padding: 8,
        borderWidth: 1,
        borderColor: '#698834',
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    addToLocationContainer: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#f2f2f2',
    },
    expirationDaysButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: '#f2f2f2',

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    QuantityModalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4,
        elevation: 5,
    },
    QuantityModalViewScrollGroup: {
        flexDirection: 'row',
        padding: 8,
        backgroundColor: 'transparent',
        alignContent: 'center',
        justifyContent: 'space-around',
        height: 270,
        width: 230,
    },
    QuantityModalViewScrollView: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#698834',
        height: 270,
        minWidth: 90,
    },
    QuantityModalViewItems: {
        paddingBottom: 5,
        paddingTop: 5,
        borderBottomColor: '#8BC34A',
        borderBottomWidth: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    },

});

export default ComponentsStyleSheet;