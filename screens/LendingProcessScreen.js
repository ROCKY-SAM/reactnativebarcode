import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform, Picker, Alert, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Leading from '../models/lending';
import * as lendingAction from '../store/actions/lending';
const LeadingProcessScreen = props => {

    let lendingList = useSelector(state => state.lending.lendingList);
    const dispatch = useDispatch();
    const [ituser, setItuser] = useState('');
    const [staffusername,setStaffusername]=useState('');
    const [staffuserepf,setStaffuserepf]=useState('');
    const [location,setLocation]=useState('');
    const [department,setDepartment]=useState('');
    const [remark,setRemark]=useState('');

    const removeItem = (item) => {
        dispatch(lendingAction.removeLendingBarCode(item.id));
      }; 

    const addItem = () =>{
        if(ituser != '' && staffusername != '' && staffuserepf != '' && location != '' && department != '' && remark != ''){
            const updatebarCode = [];
            lendingList.forEach(function (value) {
                const newLeading = new Leading(
                    value.id,
                    value.barcode,
                    ituser,
                    staffusername,
                    staffuserepf,
                    location,
                    remark,
                    value.date);
                updatebarCode.push(newLeading);
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
                                    setItuser('');
                                    setStaffusername('');
                                    setStaffuserepf('');
                                    setLocation('');
                                    setDepartment('');
                                    setRemark('');
                                    dispatch(lendingAction.resetLendingBarCode());
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
    <View style={{ flex: 1,backgroundColor: Colors.primary }}>
        <ScrollView style={styles.scannedList}>
            <View style={styles.inputCard}>
                <Text style={styles.label}>IT User</Text>
                <TextInput style={styles.input}
                value={ituser}
                onChangeText={text => setItuser(text)}
                />
            </View>

            <View style={styles.inputCard}>
                <Text style={styles.label}>Staff User Name</Text>
                <TextInput style={styles.input}
                value={staffusername}
                onChangeText={text=>setStaffusername(text)}
                />
            </View>

            <View style={styles.inputCard}>
                <Text style={styles.label}>Staff User EPF</Text>
                <TextInput style={styles.input}
                    numeric value
                    keyboardType={'decimal-pad'}
                    value={staffuserepf}
                    onChangeText={text=>setStaffuserepf(text)}
                />
            </View>

            <View style={styles.inputCard}>
                <Text style={styles.label}>Location</Text>
                <TextInput style={styles.input}
                value={location}
                onChangeText={text=>setLocation(text)}
                />
            </View>

            <View style={styles.inputCard}>
                <Text style={styles.label}>Department</Text>
                <TextInput style={styles.input}
                value={department}
                onChangeText={text=>setDepartment(text)}
                />
            </View>

            <View style={styles.inputCard}>
                <Text style={styles.label}>Remark</Text>
                <TextInput style={[styles.input,{height:100}]}
                 multiline={true}
                 value={remark}
                 onChangeText={text=>setRemark(text)}
                />
            </View> 

            {lendingList.map((item, key) => (
                <View key={key} style={styles.scannedCard} >
                    <Text>{key + 1}. {item.barcode}</Text>
                    <TouchableOpacity
                        onPress={() => { removeItem(item); }}>
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
                        addItem();
                    }}>
                    <Text style={styles.processButton}>Save</Text>
                </TouchableOpacity>
            </View>

        </ScrollView> 
        </View>
    );
};

LeadingProcessScreen.navigationOptions = navData => {
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
        width: '40%',
        color: 'white'
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        backgroundColor: '#dcdcdd',
        width: '60%',
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


export default LeadingProcessScreen;