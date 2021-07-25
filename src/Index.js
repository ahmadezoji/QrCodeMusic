import React, { Component, useState } from 'react'
import 'react-native-gesture-handler'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Animated,
  Easing,
  Dimensions,
  TouchableNativeFeedback,
  StyleSheet
} from 'react-native'
import { Icon } from 'native-base'
import {
  createStackNavigator,
  TransitionPresets,
  HeaderStyleInterpolators,
  StackCardInterpolationProps,
  StackNavigationOptions,
  TransitionSpecs
} from 'react-navigation-stack'
import Scanner from './components/Scanner'
import MainPage from './components/Main'
import Home from './components/Home'
import Splash from './components/Splash'
import { MyColor } from './components/Colors'
import Store from './components/Store'
import Help from './components/Help'
import { Mycontact } from './components/Info'
import LottieView from 'lottie-react-native'
import Wizard1 from './components/wizards/Wizard1'
import Wizard2 from './components/wizards/Wizard2'
import Wizard3 from './components/wizards/Wizard3'

import { fromLeft, fromRight } from 'react-navigation-transitions'
import MyPlayer, { shareToFiles } from './components/NewPlayer'
import AudioController from './components/AudioControls/AudioController'

const MyTransitionToDown = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0]
            })
          }
        ]
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5]
        })
      }
    }
  }
}
const MyTransitionToLeft = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,

  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0]
            })
          }
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
        ]
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5]
        })
      }
    }
  }
}

const StoreStack = createStackNavigator(
  {
    store: {
      screen: Store
    }
  },
  {
    defaultNavigationOptions: {
      headerShown: true,
      headerTitle: 'فروشگاه',
      headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' }
    },
    initialRouteName: 'store'
  }
)

const HelpStack = createStackNavigator(
  {
    help: Help
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: true,
      headerTitle: 'راهنما',
      headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Icon
            name='left'
            type='AntDesign'
            style={{ margin: 10, color: MyColor.main_back, fontSize: 20 }}
          />
        </TouchableOpacity>
      )
    })
  }
)
const ScannerStack = createStackNavigator(
  {
    scanner: Scanner
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      headerTitle: 'QR',
      headerTransparent: true,
      headerTintColor: 'black',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' }
    }
  }
)
const HomeStack = createStackNavigator(
  {
    home: Home
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: '',
      headerShown: false
    })
  }
)

const WizardStack = createStackNavigator(
  {
    wizard1: {
      screen: Wizard1
    },
    wizard2: {
      screen: Wizard2
    },
    wizard3: {
      screen: Wizard3
    }
  },
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  },
  {
    initialRouteName: 'wizard1'
  }
)
const MainStack = createStackNavigator(
  {
    main: {
      screen: MainPage,
      navigationOptions: {
        headerTitle: '',
        headerTransparent: true,
        headerTintColor: 'white',
        headerShown: false,
        ...MyTransitionToDown
      }
    },

    store: {
      screen: Store,
      navigationOptions: {
        headerShown: true,
        headerTitle: 'فروشگاه',
        headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' },
        ...MyTransitionToLeft
      }
    },
    contact: {
      screen: Mycontact,
      navigationOptions: {
        headerShown: true,
        headerTitleStyle: { fontFamily: 'IRANSansMobile_Bold' },
        headerTitle: 'ارتباط با ما',
        ...MyTransitionToLeft
      }
    },
    wizard1: {
      screen: Wizard1,
      navigationOptions: {
        headerShown: false,
        ...MyTransitionToLeft
      }
    },
    wizard2: {
      screen: Wizard2,
      navigationOptions: {
        headerShown: false,
        ...MyTransitionToLeft
      }
    },
    wizard3: {
      screen: Wizard3,
      navigationOptions: {
        headerShown: false,
        ...MyTransitionToLeft
      }
    },
    scanner: {
      screen: Scanner,
      navigationOptions: {
        headerShown: false,
        ...MyTransitionToLeft
      }
    },
    help: {
      screen: Help,
      navigationOptions: {
        ...MyTransitionToLeft
      }
    },
    player: {
      screen: MyPlayer,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '',
        headerTransparent: true,
        headerTintColor: 'white',
        headerShown: true,
        ...MyTransitionToDown,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              AudioController.pause()
              navigation.goBack()
            }}
          >
            <Icon
              name='down'
              type='AntDesign'
              style={{ margin: 10, color: 'white', fontSize: 20 }}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View>
            <TouchableOpacity
              onPress={() => {
                shareToFiles(navigation.state.params.downloadUri)
              }}
            >
              <Icon
                name='share-alternative'
                type='Entypo'
                fontSize={25}
                style={{ marginRight: 10, color: 'white' }}
              />
            </TouchableOpacity>
          </View>
        )
      })
    }
  },
  {
    initialRouteName: 'main'
  },
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  }
)
//  {/* {navigation.state.params.downloadUri !== null ? ( */}
//               // ) : (
//             //   <LottieView
//             //     style={{ height: 30, width: 30 }}
//             //     source={require('./assets/public/download.json')}
//             //     autoPlay
//             //     loop
//             //   />
//             // )}
const RootNavigator = createSwitchNavigator(
  {
    Splash: Splash,
    Main: MainStack
  },
  {
    initialRouteName: 'Splash'
  }
)

const Router = createAppContainer(RootNavigator)
export default Router

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 53,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#EEEEEE',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.75,
    elevation: 1
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spotLight: {
    width: 200,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spotLightInner: {
    width: 48,
    height: 48,
    backgroundColor: '#ee0000',
    borderRadius: 24
  },
  scaler: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scalerOnline: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  iconText: {
    fontSize: 12,
    lineHeight: 20
  }
})
