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
  View
} from 'react-native'
import Router from './src/Index'
var Najva = NativeModules.NajvaModule
export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.tab = null
    var API_KEY = '159e5187-af4c-4e3d-9e85-9cac41b566b6'

    var WEBSITE_ID = 27752 // get this from najva panel setting

    Najva.initializeNajva(API_KEY, WEBSITE_ID, true, false)
  }
  componentDidMount () {}
  render () {
    return <Router />
  }
}
