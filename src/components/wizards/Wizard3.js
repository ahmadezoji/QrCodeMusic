import { Icon } from 'native-base'
import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
  StatusBar,
  Image,
  Dimensions,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Text,
  StyleSheet
} from 'react-native'
import { MyColor } from '../Colors'
import LottieView from 'lottie-react-native';


export default class Wizard3 extends React.Component {
  constructor (props) {
    super(props)
    this.scanner = null
    this.state = {}
  }
  render () {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black'
        }}
      >
        <StatusBar translucent backgroundColor='transparent' />
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 18,
            fontFamily: 'IRANSansMobile_Bold'
          }}
        >
          از شنیدن موزیک لذت ببرید و آن را به اشتراک بگذارید
        </Text>
        {/* <Image
          style={{ height: 300, borderRadius: 20, resizeMode: 'cover' }}
          source={require('../../assets/public/player.gif')}
        ></Image> */}
        <LottieView style={{ height: 300}} source={require('../../assets/public/qr-code-scanner.json')} autoPlay loop />
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('wizard2')}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: MyColor.second_back,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon
              name='left'
              type='AntDesign'
              style={{ color: 'white', fontSize: 20 }}
            />
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'white',
              margin: 15,
              width: 20,
              height: 20,
              backgroundColor: 'yellow',
              borderRadius: 10
            }}
          ></View>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'white',
              margin: 15,
              width: 20,
              height: 20,
              backgroundColor: 'yellow',
              borderRadius: 10
            }}
          ></View>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'white',
              margin: 15,
              width: 20,
              height: 20,
              backgroundColor: 'black',
              borderRadius: 10
            }}
          ></View>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.setItem('wizard', '3')
              this.props.navigation.navigate('main')
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: MyColor.second_back,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon
              name='right'
              type='AntDesign'
              style={{ color: 'white', fontSize: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
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
