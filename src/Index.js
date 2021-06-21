import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerLayout from './components/DrawerLayout';
import Scanner from './components/Scanner';
import Settings from './components/Settings';
import Player from './components/Player';
import Home from './components/Home';
import Splash from './components/Splash';
import { MyColor } from './components/Colors';
import Info from './components/Info';
import Store from './components/Store';
import Help from './components/Help';
import Share from 'react-native-share';
const shareToFiles = async (link) => {
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      urls: [link],
    };
    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
      const ShareResponse = await Share.open(shareOptions);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

const PlayerStack = createStackNavigator(
    {
        'player': Player,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: '',
            headerTransparent: true,
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    // console.log(navigation.state.params.link);
                    shareToFiles(navigation.state.params.link);
                }}>
                    <Icon name="share-alternative"
                        type="Entypo"
                        style={{color: 'white', fontSize: 25 }}
                    />
                </TouchableOpacity>
            ),
        }),
    }
);
const StoreStack = createStackNavigator(
    {
        'store': Store,
    },
    {
        defaultNavigationOptions: {
            headerShown: true,
            headerTitle: "فروشگاه",
            headerTransparent: true,
        },
    }
);
const HelpStack = createStackNavigator(
    {
        'help': Help,
    },
    {
        defaultNavigationOptions: {
            headerShown: true,
            headerTitle: "راهنما",
            headerTransparent: true,
        },
    }
);
const TabNavigator = createMaterialBottomTabNavigator(
    {
        Scanner: {
            screen: Scanner,
            navigationOptions: {
                tabBarLabel: 'QR Code',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ fontSize: 21, color: tintColor }]} name={'scan'} />
                    </View>),
                activeColor: 'black',
                inactiveColor: 'red',
                barStyle: { backgroundColor: MyColor.whiteTheme },
            }
        },
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ fontSize: 20, color: tintColor }]} name={'home'} />
                    </View>),
                activeColor: 'black',
                inactiveColor: 'red',
                barStyle: { backgroundColor: MyColor.whiteTheme },
            }
        },

        Info: {
            screen: Info,
            navigationOptions: {
                tabBarLabel: 'Info',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={{ fontSize: 21, color: tintColor }} type="Entypo" name="info" />
                    </View>),
                activeColor: 'black',
                inactiveColor: 'red',
                barStyle: { backgroundColor: MyColor.whiteTheme },
            }
        },
    },
    {
        initialRouteName: "Home",
        activeColor: 'black',
        inactiveColor: 'red',
        barStyle: { backgroundColor: '#1B0A34' },
    },
);
const DrawerNavigator = createDrawerNavigator(
    {
        screen: TabNavigator,
    },
    {
        contentComponent: props => <DrawerLayout {...props} />,
        drawerPosition: 'right'
    }
);
const MainStack = createStackNavigator(
    {
        'Main': DrawerNavigator,
        'Player': PlayerStack,
        'Store': StoreStack,
        'Help': HelpStack
    },
    {
        defaultNavigationOptions: {
            headerShown: false,
        },
    }
);
const RootNavigator = createSwitchNavigator({
    'Splash': Splash,
    'Main': MainStack,



}, {
    initialRouteName: 'Splash'
});

const Main = createAppContainer(RootNavigator);
export default Main;


