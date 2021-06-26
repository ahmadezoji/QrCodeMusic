import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View, Text, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
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
import Store from './components/Store';
import Help from './components/Help';
import Share from 'react-native-share';
import QRScanner from './components/Camera';
import ContactUs from './components/Info';

import Wizard1 from './components/wizards/Wizard1';
import Wizard2 from './components/wizards/Wizard2';
import Wizard3 from './components/wizards/Wizard3';
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
        urls: ['file://'+link]
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

const PlayerStack = createStackNavigator(
    {
        'player': Player,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: "white",
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    if (navigation.state.params.downloadUri !== 'startLoading') {

                        console.log('from root : ', navigation.state.params.downloadUri);
                        shareToFiles(navigation.state.params.downloadUri);
                    }else{
                        // Toast.show({
                        //     text1: 'Hello',
                        //     text2: 'This is some something 👋'
                        //   }); 
                    }

                }}>
                    <Icon
                        name="share-alternative"
                        type="Entypo"
                        fontSize={25}
                        style={{ marginRight: 10, color: 'white' }}
                        solid={'#1B0A34'}

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
            // headerTransparent: true,
            // headerTintColor: "white",
            headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' }
        },
    }
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
    }
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
            // headerRight: () => (
            //     <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
            //         <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            //             <Icon name="md-menu"
            //                 style={{ margin: 10, color: 'black' }}
            //             />
            //         </TouchableOpacity>
            //     </View>
            // ),
            // headerLeft: () => (
            //     <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            //         <View style={{ flex: 1, flexDirection: 'row' }}>
            //             <Image style={{ height: 40, width: 120, resizeMode: 'contain', margin: 10 }}
            //                 source={require('../src/assets/public/logotype.png')} >
            //             </Image>
            //         </View>
            //     </TouchableOpacity>
            // ),
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
            // headerTransparent: true,
            // headerTintColor: "white",
            headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' },
            headerTitle: "ارتباط با ما",
        },
    }
);
const WizardStack = createStackNavigator(
    {
        'wizard1': Wizard1,
        'wizard2': Wizard2,
        'wizard3': Wizard3,
    },
    {
        defaultNavigationOptions: {
            headerShown: false,
        },
    }
);
const TabNavigator = createMaterialBottomTabNavigator(
    {
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
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ fontSize: 20, color: tintColor }]} name={'home'} />
                    </View>),
                activeColor: 'black',
                inactiveColor:  MyColor.main_back,
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
                inactiveColor:  MyColor.main_back,
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


