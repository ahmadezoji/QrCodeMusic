import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator } from 'react-native';
import { AudioControls } from 'react-native-hue-player';
import MusicControl from 'react-native-music-control';
import RNFetchBlob from 'rn-fetch-blob';
import { MyColor } from './Colors';
const { config, fs } = RNFetchBlob
const PictureDir = fs.dirs.DownloadDir; // this is the pictures directory. You can check the available directories in the wiki.
//'https://s19.picofile.com/d/8437107584/7bfa7480-5e99-4f93-a80a-3e7959438dea/10991.mp3',
export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.player = null
        this.state = {
            playlistSample: [
                {
                    key: 'audio01',
                    title: 'Sample track',
                    url: 'none',
                    author: 'Sample album',
                    thumbnailUri: 'http://dl.abr.co.ir/tscobox/media/aquaman/home.png'
                }
            ]
        };
    }
    componentDidMount() {
        this.loadMusic();
        this.props.navigation.setParams({
            downloadUri: 'startLoading',
        })
       
    }
    async loadMusic() {
        let playlistSample = await [...this.state.playlistSample];
        let fileName = await this.props.navigation.state.params.link;
        let index = await playlistSample.findIndex(el => el.url === 'none');
        playlistSample[index] = await { ...playlistSample[index], url: 'https://s18.picofile.com/d/8437203892/6591ec74-0d05-4356-8877-c9d93133635d/' + '27676ms' + '.mp3' };
        await this.setState({ playlistSample });

        this.player.paly();
        this.downloadFile();


    }
    downloadFile() {
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                notification: false,
                path: PictureDir + "/wave.mp3", // this is the path where your downloaded file will live in
                description: 'Downloading music.'
            }
        }
        config(options).fetch('GET', String(this.state.playlistSample[0].url)).
            progress({ interval: 0 }, (received, total) => {
                let downloadProgress = ((received / total) * 100).toFixed(0)
                console.log(downloadProgress);
            }).
            then((res) => {
                console.log(options.addAndroidDownloads.path);
                // this.props.navigation.state.params.downloadUri = options.addAndroidDownloads.path;
                this.props.navigation.setParams({
                    downloadUri: options.addAndroidDownloads.path,
                })
            })
    }
    render() {
        console.log('render', this.state.playlistSample[0].url);
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: MyColor.blackTheme }}>
                <StatusBar translucent backgroundColor="transparent" />
                {this.state.playlistSample[0].url !== 'none' && <AudioControls
                    ref={(ref) => this.player = ref}
                    activeColor={'white'}
                    initialTrack={0} // starts on second audio file
                    playlist={this.state.playlistSample}
                    hasButtonSkipSeconds
                    timeToSkip={30}
                />}
            </View>
        )
    }
}
