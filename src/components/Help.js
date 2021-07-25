import { Icon } from 'native-base'
import React from 'react'
import {
  StatusBar,
  AsyncStorage,
  Image,
  Dimensions,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Text,
  StyleSheet
} from 'react-native'
import { MyColor } from './Colors'

export default class Help extends React.Component {
  constructor (props) {
    super(props)
    this.scanner = null
    this.state = {
      readyLoad: false
    }
  }
  componsudoentDidMount () {
    setTimeout(() => {
      this.setState({ readyLoad: true })
    }, 100)
  }
  render () {
    if (!this.state.readyLoad) {
      return (
        <View>
          <StatusBar translucent backgroundColor='transparent' />
        </View>
      )
    }
    return (
      this.state.readyLoad && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: MyColor.main_back
          }}
        >
          <StatusBar translucent backgroundColor='transparent' />
        </View>
      )
    )
  }
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'transparent'
  },
  buttonTouchable: {
    padding: 16
  }
})
