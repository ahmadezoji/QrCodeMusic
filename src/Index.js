import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View, Text, TouchableOpacity, Image, PermissionsAndroid, Animated, Easing } from 'react-native';
import { Icon } from 'native-base';
import {
    createStackNavigator, TransitionPresets, HeaderStyleInterpolators,
    StackCardInterpolationProps,
    StackNavigationOptions,
    TransitionSpecs,
} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerLayout from './components/DrawerLayout';
import Scanner from './components/Scanner';
import Settings from './components/Settings';
import Player from './components/Player';
import Home from './components/Home';
import Splash from './components/Splash';
import { MyColor } from './components/Colors';
import Store from './components/Store';
import Help from './components/Help';
import Share from 'react-native-share';
import QRScanner from './components/Camera';
import ContactUs from './components/Info';

import Wizard1 from './components/wizards/Wizard1';
import Wizard2 from './components/wizards/Wizard2';
import Wizard3 from './components/wizards/Wizard3';

import { fromLeft, fromRight } from 'react-navigation-transitions';
// import Toast from 'react-native-toast-message';
const askPermission = async () => {
    console.log("asking permission");
    const granted = await PermissionsAndroid.check(
        "android.permission.READ_EXTERNAL_STORAGE"
    );
    if (!granted) {
        console.log("Permission not granted");
        const response = await PermissionsAndroid.request(
            "android.permission.READ_EXTERNAL_STORAGE"
        );
        if (!response) {
            console.log("Permission not granted & non respinse");
            return;
        }
    } else {
        console.log("Permission granted");
    }
};

const shareToFiles = async (link) => {
    askPermission();
    const shareOptions = {
        title: 'Share file',
        failOnCancel: false,
        urls: ['file://' + link]
    };
    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
        const ShareResponse = await Share.open(shareOptions);
        // setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
        console.log('Error =>', error);
        // setResult('error: '.concat(getErrorString(error)));
    }
};
const MyTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({ current, next, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                    {
                        rotate: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["180deg", "0deg"],
                        }),
                    },
                    {
                        scale: next
                            ? next.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0.9],
                            })
                            : 1,
                    },
                ],
            },
            overlayStyle: {
                opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                }),
            },
        };
    },
}
const PlayerStack = createStackNavigator(
    {
        'player': Player,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: "white",
            //(navigation.state.params.downloadUri !== 'startLoading') &&
            headerRight: () => (
                <Icon
                    name="share-alternative"
                    type="Entypo"
                    fontSize={25}
                    style={{ marginRight: 10, color: 'white' }}
                    onPress={() => {
                        if (navigation.state.params.downloadUri !== 'startLoading') {
                            console.log('from root : ', navigation.state.params.downloadUri);
                            shareToFiles(navigation.state.params.downloadUri);
                        } else {
                            // Toast.show({
                            //     text1: 'Hello',
                            //     text2: 'This is some something 👋'
                            //   }); 
                        }

                    }}

                />
            ),

        }),
    }
);
const StoreStack = createStackNavigator(
    {
        store: {
            screen: Store,
        },
    },
    {
        defaultNavigationOptions: {
            headerShown: true,
            headerTitle: "فروشگاه",
            headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' },
           

        },
        initialRouteName: 'store',
    },
);


const HelpStack = createStackNavigator(
    {
        'help': Help,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerShown: true,
            headerTitle: "راهنما",
            headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' },
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack(null)}>
                    <Icon name="left"
                        type="AntDesign"
                        style={{ margin: 10, color: MyColor.main_back, fontSize: 20 }}
                    />
                </TouchableOpacity>
            ),
           
        }),
    },
);
const ScannerStack = createStackNavigator(
    {
        'scanner': Scanner,
    },
    {
        defaultNavigationOptions: {
            headerShown: false,
            headerTitle: "QR",
            headerTransparent: true,
            headerTintColor: "black",
            headerTitleAlign: 'center',
            headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' }
        },
    }
);
const HomeStack = createStackNavigator(
    {
        'home': Home,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: '',
            headerShown: false,
        }),
    }
);
const ContactStack = createStackNavigator(
    {
        'contact': ContactUs,
    },
    {
        defaultNavigationOptions: {
            headerShown: true,
            headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' },
            headerTitle: "ارتباط با ما",
            
        },
    },
    {
        initialRouteName: 'contact',
    },
);


const WizardStack = createStackNavigator(
    {
        wizard1: {
            screen: Wizard1,
        },
        wizard2: {
            screen: Wizard2,
        },
        wizard3: {
            screen: Wizard3,
        },
    },
    {
        defaultNavigationOptions: {
            headerShown: false,
        },
    },
    {
        initialRouteName: 'wizard1',

    },
);
const TabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ fontSize: 20, color: tintColor }]} name={'home'} />
                    </View>),
                activeColor: 'black',

                inactiveColor: MyColor.main_back,
                barStyle: { backgroundColor: MyColor.whiteTheme },
            }
        },
        Scanner: {
            screen: ScannerStack,
            navigationOptions: {
                tabBarLabel: 'QR Code',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ fontSize: 21, color: tintColor }]} name={'scan'} />
                    </View>),
                activeColor: 'black',
                inactiveColor: MyColor.main_back,
                barStyle: { backgroundColor: MyColor.whiteTheme },
            }
        },
        Help: {
            screen: HelpStack,
            navigationOptions: {
                tabBarLabel: 'Info',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={{ fontSize: 21, color: tintColor }} type="Entypo" name="info" />
                    </View>),
                activeColor: 'black',
                inactiveColor: MyColor.main_back,
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
        'Contact': ContactStack,
        'Wizards': WizardStack
    },
    {
        defaultNavigationOptions: {
            headerShown: false,
            ...MyTransition,
        },
    }
);
const RootNavigator = createSwitchNavigator({
    'Splash': Splash,
    'Main': MainStack,



}, {
    initialRouteName: 'Splash',
});

const Main = createAppContainer(RootNavigator);
export default Main;


