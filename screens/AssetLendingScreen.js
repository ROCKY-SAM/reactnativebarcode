import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { withNavigationFocus } from 'react-navigation'
import { useSelector, useDispatch } from 'react-redux';
import * as lendingAction from '../store/actions/lending';
import { Ionicons } from '@expo/vector-icons';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const AssetLendingScreen = props => {

    const dispatch = useDispatch();
    let lendingList = useSelector(state => state.lending.lendingList);
    const { isFocused } = props;
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(true);
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    if (hasPermission === null) {
        return <Text style={styles.displayText}>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text style={styles.displayText}>No access to camera</Text>;
    }

    const removeItem = (item) => {
        dispatch(lendingAction.removeLendingBarCode(item.id));
      }; 
    

const handleBarCodeScanned = ({type,data}) =>{
    setScanned(true);
    Alert.alert('Confirm Reading', `Scanned Value Is ${data} Do you wanna save this`, [
        {
          text: 'No',
          style: 'default',
          onPress: () => {
            setScanned(false);
          }
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            dispatch(lendingAction.leadingBarCode(data, 'givingUser', 'buyUserName', 'buyUserEpf','location','remark'));
            setScanned(false);
          }
        }
      ]);
};
    return (<ScrollView style={{ flex: 1, backgroundColor: Colors.primary }}>

        <View style={styles.barCodeMain}>
            {isFocused ? <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.barContainer}>
                {scanned ?
                    <TouchableOpacity
                        onPress={() => setScanned(false)}
                        style={[styles.barCodeDetails, { backgroundColor: scanned ? Colors.start : Colors.stop }]}>
                        <Text style={styles.buttonTap}>Start Scanning</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => setScanned(true)}
                        style={[styles.barCodeDetails, { backgroundColor: scanned ? Colors.start : Colors.stop }]}>
                        <Text style={styles.buttonTap}>Stop Scanning</Text>
                    </TouchableOpacity>}
            </BarCodeScanner> : null}
        </View>

        <View style={styles.scannedList}>
            {lendingList.map((item, key) => (
                <View key={key} style={styles.scannedCard} >
                    <Text>{key + 1}. {item.barcode}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            removeItem(item);
                        }}>
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                            size={23}
                            color="red"
                        />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
        <View>
            {lendingList.length > 0 ?
                <TouchableOpacity
                    onPress={() => { setScanned(true); props.navigation.navigate('LeadingProcessScreen'); }}>
                    <Text style={styles.processButton}>Process</Text>
                </TouchableOpacity>
                : <Text style={styles.displayText}>Please Scan Items to Process</Text>}
        </View>

    </ScrollView>);
};

const styles = StyleSheet.create({
    displayText: {
        marginTop: 50,
        textAlign: "center",
        fontSize: 22,
        color: '#ccc'
    },
    processButton: {
        fontFamily: 'open-sans',
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        color: 'white',
        backgroundColor: Colors.mainButton,
    },
    scannedList: {
        top: -15
    },
    scannedCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginVertical: 5,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white'
    },

    barCodeMain: {
        overflow: 'hidden',
        height: 370,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    barContainer: {
        height: DEVICE_HEIGHT,
        width: DEVICE_WIDTH,
    },
    barCodeDetails: {
        overflow: 'hidden',
        borderRadius: 2,
        fontSize: 16,
        fontWeight: '900'
    },

    buttonTap: {
        fontFamily: 'open-sans',
        fontSize: 16,
        padding: 10,
        textAlign: 'center',
        color: 'white'
    }
});

AssetLendingScreen.navigationOptions = navData => {
    const from = navData.navigation.getParam('from');
    if (from == "main") {
        return {
            headerTitle: 'Asset Lending'
        };
    } else {
        return {
            headerTitle: 'Asset Lending',
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
    }

};

export default withNavigationFocus(AssetLendingScreen);