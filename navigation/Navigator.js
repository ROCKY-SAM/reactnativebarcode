import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AssetReaderScreen from '../screens/AssetReaderScreen';
import ProcessScreen from '../screens/ProcessScreen';
import MainScreen from '../screens/MainScreen';
import Colors from '../constants/Colors';
import AssetLendingScreen from '../screens/AssetLendingScreen';
import LeadingProcessScreen from '../screens/LendingProcessScreen';
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const Main = createStackNavigator(
  {
    MainScreen:MainScreen,    
    AssetFromMain : AssetReaderScreen,
    AssetLendingMain:AssetLendingScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);


const AssetReading = createStackNavigator(
  {
    AssetReaderScreen: AssetReaderScreen,
    ProcessScreen:ProcessScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-document' : 'ios-document'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);


const AssetLending = createStackNavigator(
  {
    AssetLendingScreen: AssetLendingScreen,
    LeadingProcessScreen:LeadingProcessScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-qr-scanner' : 'ios-qr-scanner'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Main: Main,
    Reading: AssetReading,
    Lending:AssetLending
  },
  {
    contentOptions: {
      activeTintColor: 'white'
    },  drawerBackgroundColor:  '#faa937',
  }
);

export default createAppContainer(MainNavigator);
