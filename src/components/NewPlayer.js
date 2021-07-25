import React from 'react'
import {
  StatusBar,
  AsyncStorage,
  Image,
  Dimensions,
  View,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  BackHandler,
  Alert,
  StyleSheet
} from 'react-native'

import { Container, Header, Icon } from 'native-base'
import AudioControls from './AudioControls/AudioControls'

import RNFetchBlob from 'rn-fetch-blob'
import { MyColor } from './Colors'
const { config, fs } = RNFetchBlob
import Toast from 'react-native-simple-toast'
import Share from 'react-native-share'

import LottieView from 'lottie-react-native'
import AudioController from './AudioControls/AudioController'

const askPermissionREAD = async () => {
  console.log('asking permission')
  const granted = await PermissionsAndroid.check(
    'android.permission.READ_EXTERNAL_STORAGE'
  )
  if (!granted) {
    console.log('Permission not granted')
    const response = await PermissionsAndroid.request(
      'android.permission.READ_EXTERNAL_STORAGE'
    )
    if (!response) {
      console.log('Permission not granted & non respinse')
      return
    }
  } else {
    console.log('Permission granted')
  }
}

const shareToFiles = async link => {
  askPermissionREAD()
  const shareOptions = {
    title: 'Share file',
    failOnCancel: false,
    urls: ['file://' + link]
  }
  // If you want, you can use a try catch, to parse
  // the share response. If the user cancels, etc.
  try {
    const ShareResponse = await Share.open(shareOptions)
    // setResult(JSON.stringify(ShareResponse, null, 2));
  } catch (error) {
    console.log('Error =>', error)
    // setResult('error: '.concat(getErrorString(error)));
  }
}
export { shareToFiles }
const DownloadDir = fs.dirs.DownloadDir // this is the pictures directory. You can check the available directories in the wiki.
export default class MyPlayer extends React.Component {
  constructor (props) {
    super(props)
    ;(this.player = null),
      (this.handleBackButtonClick = this.handleBackButtonClick.bind(this)),
      (this.state = {
        playlistSample: [
          {
            key: 'audio01',
            title: 'Sample track',
            url: 'none',
            author: 'Sample album',
            thumbnailUri:
              'https://f5s3r6h9.rocketcdn.me/wp-content/uploads/2019/11/free_qr_code_generator_toronto.jpg'
          }
        ],
        prefixString: 'http://abr.co.ir/',
        downloadUri: 'none',
        loaded: false,
        permisstionGranted: false
      })
  }
  async askPermissionWRITE () {
    const granted = await PermissionsAndroid.check(
      'android.permission.WRITE_EXTERNAL_STORAGE'
    )
    if (!granted) {
      console.log('Permission not granted')
      const response = await PermissionsAndroid.request(
        'android.permission.WRITE_EXTERNAL_STORAGE'
      )
      if (!response) {
        console.log('Permission not granted & non respinse')
        return
      }
    } else {
      this.setState({ permisstionGranted: true })
      console.log('Permission granted')
    }
  }
  componentWillUnmount () {
    console.log('dsdsds')
  }

  componentDidMount () {
    this.askPermissionWRITE()
    this.loadMusic()
  }
  updateCurrentTime (val) {
    // console.log(val);
  }
  onChangeStatus (val) {
    console.log(val)
  }
  componentWillUnmount () {
    console.log('layer closed')
  }
  componentWillMount () {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    )
  }
  handleBackButtonClick () {
    AudioController.pause()
    this.props.navigation.goBack()
    return true
  }

  componentWillUnmount () {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    )
  }
  async loadMusic () {
    try {
      this.props.navigation.state.params.downloadUri = null;
      let data = await this.props.navigation.state.params.link
      if (data !== undefined && data !== null) {
        let playlistSample = await [...this.state.playlistSample]
        let isUrl =
          String(data).includes('http') || String(data).includes('www')
        let index = await playlistSample.findIndex(el => el.url === 'none')
        playlistSample[index] = await {
          ...playlistSample[index],
          url: isUrl ? data : this.state.prefixString + data + '.mp3'
        }
        await this.setState({ playlistSample })
        await this.setState({ loaded: true })

        setTimeout(() => {
          AudioController.play()
        }, 3000)
        // if (this.player) console.log(this.player)

        if (isUrl == false) this.downloadFile(data)
        else {
          this.downloadFile(this.GetFilename(data))
        }
      }
    } catch (error) {
      console.log('Error =>', error)
    }
  }
  GetFilename (url) {
    if (url) {
      let m = url.toString().match(/.*\/(.+?)\./)
      if (m && m.length > 1) {
        return m[1]
      }
    }
    return ''
  }
  async downloadFile (fileName) {
    if (this.state.permisstionGranted) {
      let array = fileName.split('%20')
      // array = fileName.split(' ');
      fileName = ''
      for (let i = 0; i < array.length; i++) {
        fileName = fileName + array[i]
      }
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
          notification: true,
          path: 'file://' + DownloadDir + '/' + fileName + '.mp3', // this is the path where your downloaded file will live in
          description: 'Downloading music.'
        }
      }
      Toast.show(options.addAndroidDownloads.path)
      fs.exists(options.addAndroidDownloads.path)
        .then(val => {
          console.log(
            val ? options.addAndroidDownloads.path : 'this file not exist'
          )
          if (val) {
            Toast.show(options.addAndroidDownloads.path)
            this.setState({ downloadUri: options.addAndroidDownloads.path })
            this.props.navigation.state.params.downloadUri =
              options.addAndroidDownloads.path
          } else {
            Toast.show('downloading...')
            config(options)
              .fetch('GET', String(this.state.playlistSample[0].url))
              .then(res => res.json())
              .then(res => {
                console.log(res.path())
                this.setState({ downloadUri: options.addAndroidDownloads.path })
                this.props.navigation.state.params.downloadUri =
                  options.addAndroidDownloads.path
                // Alert.alert('Image Downloaded Successfully.')
                Toast.show('Image Downloaded Successfully.')
              })
              .catch(err => {
                console.log(err)
                // Alert.alert('Download Failed', err.message)
                Toast.show('Download Failed', err.message)
              })
          }
        })
        .catch(err => {
          console.log(err)
          // Alert.alert('Exsiting error', err.message)
          Toast.show('Exsiting error', err.message)
        })
    }
  }
  render () {
    // console.log(this.state.playlistSample);
    let playerView = null
    let iconHeader = null
    if (this.state.downloadUri !== 'none') {
      iconHeader = (
        <TouchableOpacity onPress={() => shareToFiles(this.state.downloadUri)}>
          <Icon
            name='share-alternative'
            type='Entypo'
            fontSize={25}
            style={{ marginRight: 10, color: 'white' }}
          />
        </TouchableOpacity>
      )
    } else {
      iconHeader = (
        <LottieView
          style={{ height: 30, width: 30 }}
          source={require('../assets/public/download.json')}
          autoPlay
          loop
        />
      )
    }

    if (this.state.loaded)
      playerView = (
        <AudioControls
          ref={ref => (this.player = ref)}
          activeColor={'white'}
          initialTrack={0} // starts on second audio file
          playlist={this.state.playlistSample}
          hasButtonSkipSeconds
          timeToSkip={30}
        />
      )

    return (
      <View style={styles.Container}>
        <StatusBar
          translucent
          backgroundColor='transparent'
          barStyle='light-content'
        />
        {/* {this.state.loaded && (
          <AudioControls
            ref={ref => (this.player = ref)}
            activeColor={'white'}
            initialTrack={0} // starts on second audio file
            playlist={this.state.playlistSample}
            hasButtonSkipSeconds
            timeToSkip={30}
          />
        )} */}
        {playerView}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: MyColor.main_back,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column'
  },
  thumbnail: {
    width: 100,
    height: 100
  }
})
