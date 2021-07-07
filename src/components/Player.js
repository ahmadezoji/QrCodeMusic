import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator } from 'react-native';
import { AudioControls } from 'react-native-hue-player';
import MusicControl from 'react-native-music-control';
import RNFetchBlob from 'rn-fetch-blob';
import { MyColor } from './Colors';
const { config, fs } = RNFetchBlob
import Toast from 'react-native-simple-toast';

const DownloadDir = fs.dirs.DownloadDir; // this is the pictures directory. You can check the available directories in the wiki.
const defaultMusic = [
    {
        key: 'audio01',
        title: 'Sample track',
        url: 'https://s19.picofile.com/d/8437107584/3dbe7abd-a74a-4f30-9ae4-defb4276f549/10991.mp3',
        author: 'Sample album',
        thumbnailUri: 'https://f5s3r6h9.rocketcdn.me/wp-content/uploads/2019/11/free_qr_code_generator_toronto.jpg'
    }
]
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
                    thumbnailUri: 'https://f5s3r6h9.rocketcdn.me/wp-content/uploads/2019/11/free_qr_code_generator_toronto.jpg'
                }
            ],
            prefixString: 'https://s19.picofile.com/d/8437107584/3dbe7abd-a74a-4f30-9ae4-defb4276f549/',
            update: false
        };
    }
    componentDidMount() {
        this.props.navigation.setParams({
            downloadUri: 'startLoading',
        })
        this.loadMusic();
    }
    async loadMusic() {
        let fileName = await this.props.navigation.state.params.link;
        // fileName = '27676ms';
        // 27676ms
        console.log('fileName: ' + fileName);
        if (fileName !== undefined && fileName !== null) {
            let playlistSample = await [...this.state.playlistSample];
            let isUrl = String(fileName).includes('http') || String(fileName).includes('www');
            let index = await playlistSample.findIndex(el => el.url === 'none');
            playlistSample[index] = await { ...playlistSample[index], url: isUrl ? fileName : this.state.prefixString + fileName + '.mp3' };
            await this.setState({ playlistSample });

            // this.downloadFile(fileName);

        }




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
                this.props.navigation.setParams({
                    downloadUri: options.addAndroidDownloads.path,
                })
            } else {
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

        })


    }
    render() {
        let playerView = null;
        if (this.state.playlistSample[0].url !== 'none')
            playerView = (<AudioControls
                ref={(ref) => this.player = ref}
                activeColor={'white'}
                initialTrack={0} // starts on second audio file
                playlist={this.state.playlistSample}
                hasButtonSkipSeconds
                timeToSkip={30}
            />);
        // ) : (
        //     console.log('orginal'),
        //     <AudioControls
        //         ref={(ref) => this.player = ref}
        //         activeColor={'white'}
        //         initialTrack={0} // starts on second audio file
        //         playlist={this.state.playlistSample}
        //         hasButtonSkipSeconds
        //         timeToSkip={30}
        //     />
        // );
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: MyColor.blackTheme }}>
                <StatusBar translucent backgroundColor="transparent" />
                {playerView}
            </View>
        )
    }
}
