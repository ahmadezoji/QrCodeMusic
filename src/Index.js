import React, { Component, useState } from 'react';
import 'react-native-gesture-handler';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { View, Text, TouchableOpacity, Image, PermissionsAndroid, Animated, Easing, Dimensions } from 'react-native';
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
const MyTransitionToDown = {
    gestureDirection: 'vertical',
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
                        translateY: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.height, 0],
                        }),
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
const MyTransitionToLeft = {
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
                    // {
                    //     rotate: current.progress.interpolate({
                    //         inputRange: [0, 1],
                    //         outputRange: ["180deg", "0deg"],
                    //     }),
                    // },
                    // {
                    //     scale: next
                    //         ? next.progress.interpolate({
                    //             inputRange: [0, 1],
                    //             outputRange: [1, 0.9],
                    //         })
                    //         : 1,
                    // },
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
        player: {
            screen: Player,
            navigationOptions: {
                headerTitle: '',
                headerTransparent: true,
                headerTintColor: "white",
                headerShown: false,
                ...MyTransitionToLeft
            }
        },
    },
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
const CustomBottomBar = (props) => {
    //We use the spread operator to pass down all default properties of a bottom bar

    //custom styles for our indicator
    //The width of the indicator should be of equal size with each tab button. We have 3 tab buttons therefore, the width of a single tab button would be the total width Dimension of the screen divided by 3

    const { width } = Dimensions.get('screen')

    //Create an animated value 
    const [position] = useState(new Animated.ValueXY())

    //We attach the x,y coordinates of the position to the transform property of the indicator so we can freely animate it to any position of our choice.
    const animStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: width / 3,
        backgroundColor: MyColor.main_back,
        transform: position.getTranslateTransform()
    }

    const animate = (value, route) => {
        //navigate to the selected route on click
        props.navigation.navigate(route)

        //animate indicator
        Animated.timing(position, {
            toValue: { x: value, y: 0 },
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    return (
        <View>
            <Animated.View style={animStyles} />
            <BottomTabBar {...props} onTabPress={({ route }) => {
                switch (route.key) {
                    case 'Home':
                        //animated position should be 0
                        animate(0, route.key)
                        break
                    case 'Scanner':
                        //animated position is width/3
                        animate(width / 3, route.key)
                        break
                    case 'Help':
                        //animated position is width of screen minus width of single tab button
                        animate(width - (width / 3), route.key)
                        break
                }
            }} style={{ backgroundColor: 'transparent' }} />
        </View>
    )
}

const config = {

    tabBarOptions: {
        activeTintColor: '#fff',
        inactiveTintColor: 'rgba(0,0,0,0.7)',
    },
    tabBarComponent: (props) => <CustomBottomBar {...props} />
}
const bottomComponent = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon style={[{ fontSize: 20, color: tintColor }]} name={'home'} />
        }
    },
    Scanner: {
        screen: ScannerStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon style={[{ fontSize: 21, color: tintColor }]} name={'scan'} />
        }
    },
    Help: {
        screen: HelpStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon style={{ fontSize: 21, color: tintColor }} type="Entypo" name="info" />
        }
    }
}, config)
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
        screen: bottomComponent,
    },
    {
        contentComponent: props => <DrawerLayout {...props} />,
        drawerPosition: 'right'
    }
);
const MainStack = createStackNavigator(
    {
        'Main': bottomComponent,
        player: {
            screen: Player,
            navigationOptions: {
                headerTitle: '',
                headerTransparent: true,
                headerTintColor: "white",
                headerShown: false,
                ...MyTransitionToDown
            }
        },
        store: {
            screen: Store,
            navigationOptions: {
                headerShown: true,
                headerTitle: "فروشگاه",
                headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' },
                ...MyTransitionToLeft
            }
        },
        contact: {
            screen: ContactUs,
            navigationOptions: {
                headerShown: true,
                headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' },
                headerTitle: "ارتباط با ما",
                ...MyTransitionToLeft
            }
        },
        wizard1: {
            screen: Wizard1,
            navigationOptions: {
                ...MyTransitionToLeft
            }
        },
        wizard2: {
            screen: Wizard2,
            navigationOptions: {
                ...MyTransitionToLeft
            }
        },
        wizard3: {
            screen: Wizard3,
            navigationOptions: {
                ...MyTransitionToLeft
            }
        },
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
    initialRouteName: 'Splash',
});

const Main = createAppContainer(RootNavigator);
export default Main;


