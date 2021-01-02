import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform, Picker, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import * as barcodesAction from '../store/actions/barcodes';
import Barcode from '../models/barcode';

const ProcessScreen = props => {
    const [selectType, setselectType] = useState('HP');
    const [vendor, setVendor] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch();
    let barcodelist = useSelector(state => state.barcodes.barcodelist);

    const removeItem = (item) => {
        dispatch(barcodesAction.removeBarCode(item.id));
    };

    const additem = () => {
        // dispatch(barcodesAction.updateBarCode(vendor, selectType, price)); 
        if (vendor != "" && price != "") {
            const updatebarCode = [];
            barcodelist.forEach(function (value) {
                const newBarcode = new Barcode(
                    value.id,
                    value.barcode,
                    vendor,
                    selectType,
                    price);
                updatebarCode.push(newBarcode);
            });
            fetch('http://productsbysam.lk/userform.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    barcodeData: updatebarCode
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson == 'success') {
                        Alert.alert('Awesome', 'Your Data Has Been Submitted', [
                            {
                                text: 'Close',
                                style: 'destructive',
                                onPress: () => {
                                    setselectType('HP');
                                    setVendor('');
                                    setPrice('');
                                    dispatch(barcodesAction.resetBarCode());
                                    props.navigation.navigate('MainScreen');
                                }
                            }
                        ]);
                    }
                }).catch((error) => {
                    alert("Error Saving");
                    console.error(error);
                });
        } else {
            alert('Please Fill All Fields to Save');
        }


    };


    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <ScrollView style={styles.scannedList}>
                <View style={styles.inputCard}>
                    <Text style={styles.label}>Vendor</Text>
                    <TextInput style={styles.input}
                        value={vendor}
                        onChangeText={text => setVendor(text)}
                    />
                </View>

                <View style={styles.inputCard}>
                    <Text style={styles.label}>Type</Text>
                    <Picker
                        selectedValue={selectType}
                        onValueChange={select => setselectType(select)}
                        style={styles.input}
                        // mode="dropdown"
                        itemStyle={styles.input}>
                        <Picker.Item label="HP" value="HP" />
                        <Picker.Item label="DELL" value="DELL" />
                        <Picker.Item label="ACER" value="ACER" />
                        <Picker.Item label="ASUS" value="ASUS" />
                    </Picker>
                </View>

                <View style={styles.inputCard}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input}
                        numeric value
                        keyboardType={'decimal-pad'}
                        value={price}
                        onChangeText={text => setPrice(text)}
                    />
                </View>


                {barcodelist.map((item, key) => (
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

                <View style={{ paddingTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            additem();
                        }}>
                        <Text style={styles.processButton}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

ProcessScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Process'
    };
};
const styles = StyleSheet.create({
    inputCard: {
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontFamily: 'open-sans',
        fontSize: 16,
        width: '20%',
        color: 'white'
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        backgroundColor: '#dcdcdd',
        width: '80%',
        height: 40,
        paddingLeft: 10,
        overflow: "hidden",
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white'
    },
    processButton: {
        fontFamily: 'open-sans',
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        color: 'white',
        backgroundColor: Colors.mainButton,
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
});

export default ProcessScreen;