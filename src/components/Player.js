import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator, TouchableOpacity, PermissionsAndroid, BackHandler } from 'react-native';

import { Container, Header, Icon } from 'native-base';
import { AudioControls } from 'react-native-hue-player';
import MusicControl from 'react-native-music-control';
import RNFetchBlob from 'rn-fetch-blob';
import { MyColor } from './Colors';
const { config, fs } = RNFetchBlob
import Toast from 'react-native-simple-toast';
import Share from 'react-native-share';

import LottieView from 'lottie-react-native';

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
const DownloadDir = fs.dirs.DownloadDir; // this is the pictures directory. You can check the available directories in the wiki.
export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.player = null,
            this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            playlistSample: [
                {
                    key: 'audio01',
                    title: 'Sample track',
                    url: 'none',
                    author: 'Sample album',
                    thumbnailUri: 'https://f5s3r6h9.rocketcdn.me/wp-content/uploads/2019/11/free_qr_code_generator_toronto.jpg'
                }
            ],
            prefixString: 'https://s19.picofile.com/d/8437107584/4904bc1c-9d66-495e-bfbd-0673e3b13453/',
            downloadUri: 'none'
        };
    }
    componentDidMount() {
        this.loadMusic();
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        this.props.navigation.navigate('Home')
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    async loadMusic() {
        let data = await this.props.navigation.state.params.link;
        if (data !== undefined && data !== null) {
            let playlistSample = await [...this.state.playlistSample];
            let isUrl = String(data).includes('http') || String(data).includes('www');
            let index = await playlistSample.findIndex(el => el.url === 'none');
            playlistSample[index] = await { ...playlistSample[index], url: isUrl ? data : this.state.prefixString + data + '.mp3' };
            await this.setState({ playlistSample });


            if (isUrl == false)
                this.downloadFile(data);
            else {
                this.downloadFile(this.GetFilename(data))
            }

        }
    }
    GetFilename(url) {
        if (url) {
            let m = url.toString().match(/.*\/(.+?)\./);
            if (m && m.length > 1) {
                return m[1];
            }
        }
        return "";
    }
    downloadFile(fileName) {
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                notification: false,
                path: DownloadDir + "/" + fileName + ".mp3", // this is the path where your downloaded file will live in
                description: 'Downloading music.'
            }
        }
        fs.exists(options.addAndroidDownloads.path).then((val) => {
            console.log(val ? options.addAndroidDownloads.path : 'this file not exist');
            if (val) {
                Toast.show(options.addAndroidDownloads.path);
                this.setState({ downloadUri: options.addAndroidDownloads.path });
            } else {
                Toast.show('downloading...');
                config(options).fetch('GET', String(this.state.playlistSample[0].url)).
                    progress({ interval: 0 }, (received, total) => {
                        let downloadProgress = ((received / total) * 100).toFixed(0)
                        console.log(downloadProgress);
                    }).
                    then((res) => {
                        Toast.show('download finished');
                        this.setState({ downloadUri: options.addAndroidDownloads.path });
                    })
            }

        })


    }
    render() {
        let playerView = null;
        let iconHeader = null;
        if (this.state.downloadUri !== 'none') {
            iconHeader =
                <TouchableOpacity onPress={() => {
                    shareToFiles(this.state.downloadUri);
                }}>
                    <Icon
                        name="share-alternative"
                        type="Entypo"
                        fontSize={25}
                        style={{ marginRight: 10, color: 'white' }}
                    />
                </TouchableOpacity>
        } else {
            iconHeader = (
                <LottieView style={{ height: 30, width: 30 }} source={require('../assets/public/download.json')} autoPlay loop />
            )
        }

        if (this.state.playlistSample[0].url !== 'none')
            playerView = (<AudioControls
                ref={(ref) => this.player = ref}
                activeColor={'white'}
                initialTrack={0} // starts on second audio file
                playlist={this.state.playlistSample}
                hasButtonSkipSeconds
                timeToSkip={30}
            />);

        return (
            <Container style={{ backgroundColor: MyColor.blackTheme }}>
                <Header style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: MyColor.main_back }} androidStatusBarColor="black"
                    iosBarStyle="light-content">
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                        <TouchableOpacity onPress={() => (
                            this.props.navigation.navigate('Home')
                        )
                        }>
                            <Icon name="down"
                                type="AntDesign"
                                style={{ margin: 10, color: 'white', fontSize: 20 }}
                            />
                        </TouchableOpacity>
                        {iconHeader}
                    </View>
                </Header>
                {playerView}
            </Container >
        )
    }
}
