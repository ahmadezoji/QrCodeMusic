/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import {
  NativeModules,
  DeviceEventEmitter,
  AppRegistry,
  View,
  StyleSheet,
  StatusBar
} from 'react-native'
var Najva = NativeModules.NajvaModule

import TabBar from '@mindinventory/react-native-tab-bar-interaction'
import Home from './Home'
import Scanner from './Scanner'
import Help from './Help'
import { MyColor } from './Colors'
export default class MainPage extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
  }
  render () {
    return (
      <TabBar
        bgNavBar={MyColor.main_back}
        bgNavBarSelector='white'
        stroke='skyblue'
      >
        <TabBar.Item
          icon={require('../assets/public/home-white.png')}
          selectedIcon={require('../assets/public/home-red.png')}
          title='Tab2'
          //'#F08080'
          screenBackgroundColor={{ backgroundColor: 'white' }}
        >
          <Home navigation={this.props.navigation} />
        </TabBar.Item>
        <TabBar.Item
          icon={require('../assets/public/qr-code-white.png')}
          selectedIcon={require('../assets/public/qr-code-red.png')}
          title='Tab1'
          //#008080
          screenBackgroundColor={{ backgroundColor: 'black' }}
        >
          <Scanner navigation={this.props.navigation} />
        </TabBar.Item>
        <TabBar.Item
          icon={require('../assets/public/info-white.png')}
          selectedIcon={require('../assets/public/info-red.png')}
          title='Tab3'
          screenBackgroundColor={{ backgroundColor: '#485d72' }}
        >
          <Help navigation={this.props.navigation} />
        </TabBar.Item>
      </TabBar>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
