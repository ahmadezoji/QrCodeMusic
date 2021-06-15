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



const DetailStack = createStackNavigator(
    {
        'player': { screen: Player},
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: '',
            headerTransparent: true,
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.goBack(null)}>
                    <Icon name="right"
                        type="AntDesign"
                        style={{ margin: 10, color: 'white', fontSize: 20 }}
                    />
                </TouchableOpacity>
            ),
        }),
    }
    );
const TabNavigator = createMaterialBottomTabNavigator(
    {
        Scanner: {
            screen: Scanner,
            navigationOptions: {
                tabBarLabel: 'اسکن',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={20} name={'search'} />
                    </View>),
                activeColor: 'white',
                inactiveColor: 'red',
                barStyle: { backgroundColor: 'black' },
            }
        },
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'خانه',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={20} name={'home'} />
                    </View>),
                activeColor: 'white',
                inactiveColor: 'red',
                barStyle: { backgroundColor: 'black' },
            }
        },

        Genres: {
            screen: Player,
            navigationOptions: {
                tabBarLabel: 'راهنما',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={{ fontSize: 21, color: tintColor }} type="FontAwesome5" name="theater-masks" />
                    </View>),
                activeColor: 'white',
                inactiveColor: 'red',
                barStyle: { backgroundColor: 'black' },
            }
        },
    },
    {
        initialRouteName: "Home",
        activeColor: 'white',
        inactiveColor: 'red',
        barStyle: { backgroundColor: '#3BAD87' },
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
        'Drawer': DrawerNavigator,
        'Details': DetailStack,
    },
    {
        defaultNavigationOptions: {
            headerShown: false,
        },
    }
);
const RootNavigator = createSwitchNavigator({
    'Splash': Splash,
    'Main': MainStack


}, {
    initialRouteName: 'Splash'
});

const Main = createAppContainer(RootNavigator);
export default Main;


