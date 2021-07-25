import { Icon, Spinner } from 'native-base'
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
  StyleSheet,
  AppState
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { MyColor } from './Colors'
import * as Animatable from 'react-native-animatable'
import { NavigationEvents } from 'react-navigation'
import LottieView from 'lottie-react-native'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import Toast from 'react-native-simple-toast'
console.disableYellowBox = true
export default class Scanner extends React.Component {
  constructor (props) {
    super(props)
    ;(this.scanner = null),
      (this.focusListener = this.props.navigation.addListener(
        'didFocus',
        () => {
          this.onFocusFunction()
        }
      ))
    this.state = {
      front: false,
      flashOn: false,
      readyLoad: false,
      appState: AppState.currentState
    }
  }
  onSuccess = e => {
    Toast.show(e.data)
    this.props.navigation.navigate('player', { link: e.data })
  }
  onFocusFunction = () => {
    this.setState({ readyLoad: true })
    if (this.scanner) {
      this.scanner.reactivate()
    }
  }
  // add a focus listener onDidMount
  async componentDidMount () {
    AppState.addEventListener('change', this._handleAppStateChange);

    this.setState({ readyLoad: true })
    // setTimeout(() => {this.props.navigation.navigate('player', { link: '10991' })}, 3000)
  }
  async componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange);
    if (this.scanner) {
      this.scanner.disable()
    }
  }
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
    if(this.state.appState == 'background'){
      if (this.scanner) {
        this.scanner.disable()
      }
      this.setState({readyLoad:false})
    }
  }
  makeSlideOutTranslation (translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    }
  }

  render () {
    console.log(this.state.readyLoad)
    if (!this.state.readyLoad) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: MyColor.whiteTheme
          }}
        >
          <StatusBar translucent backgroundColor='transparent' />
          <Spinner color='red'></Spinner>
        </View>
      )
    }
    return (
      <View>
        {this.state.readyLoad && (
          <QRCodeScanner
            ref={ref => (this.scanner = ref)}
            showMarker
            reactivateTimeout={3000}
            onRead={this.onSuccess.bind(this)}
            cameraStyle={{ height: SCREEN_HEIGHT }}
            customMarker={
              <View style={styles.rectangleContainer}>
                <View style={styles.topOverlay}>
                  <Text style={{ fontSize: 25, color: 'white' }}>QR CODE</Text>
                </View>
                <StatusBar translucent backgroundColor='transparent' />
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.leftAndRightOverlay} />

                  <View style={styles.rectangle}>
                    <LottieView
                      style={{ height: '100%', width: '100%' }}
                      source={require('../assets/public/scanner.json')}
                      autoPlay
                      loop
                    />
                  </View>

                  <View style={styles.leftAndRightOverlay} />
                </View>

                <View style={styles.bottomOverlay} />
              </View>
            }
          />
        )}
      </View>
    )
  }
}
const overlayColor = 'rgba(0,0,0,0.5)' // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65 // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005 // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'red'

const scanBarWidth = SCREEN_WIDTH * 0.46 // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025 //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00'

const iconScanColor = 'blue'

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    // borderWidth: rectBorderWidth,
    // borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
}
