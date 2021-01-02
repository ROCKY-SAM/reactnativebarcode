import React from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
const MainScreen = props => {
    return (<View style={{ flex: 1, backgroundColor: Colors.primary }}>
        <TouchableOpacity activeOpacity={0.8}
            onPress={() => { 
            props.navigation.navigate('AssetFromMain', {from: 'main'});}}>
            <View style={styles.card}>
                <Image
                    source={require('../assets/barcode.png')}
                    style={styles.imageStyle} />
                <Text style={styles.cardText}>Asset Reading</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}
            onPress={() => {
            props.navigation.navigate('AssetLendingMain', {from: 'main'});}}>
            <View style={styles.card}>
                <Image
                    source={require('../assets/qr-code.png')}
                    style={styles.imageStyle} />
                <Text style={styles.cardText}>Asset Lending</Text>
            </View>
        </TouchableOpacity>
    </View>);
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 25,
        backgroundColor: 'white',
        marginVertical: 15,
        marginHorizontal: 25
    },
    cardText: {
        fontSize: 30,
        fontFamily: 'open-sans-bold',
        letterSpacing: 1.5
    },
    imageStyle: {
        width: 80,
        height: 80,
        margin: 15
    }
});

MainScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Dashboard',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
};
export default MainScreen;