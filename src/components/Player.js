import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator } from 'react-native';
import { AudioControls } from 'react-native-hue-player';
import { MyColor } from './Colors';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.player = null
        this.state = {
            playlistSample: [
                {
                    key: 'audio01',
                    title: 'Ebi',
                    url: 'http://sv.naghmemusic.ir/ARCHIVE/D/Dariush/Dariush%20-%20Emrouz/05%20Vatan.mp3',
                    author: 'Francisco Manuel da Silva',
                    thumbnailUri: 'http://dl.abr.co.ir/tscobox/media/aquaman/home.png'
                }
            ]
        };
    }
    componentDidMount() {
        // this.loadMusic();
    }
    componentWillUnmount(){
        // if(this.player!==null)
            // this.player.pause();
    }
    async loadMusic(){
        let playlistSample =await [...this.state.playlistSample];
        let index =await playlistSample.findIndex(el => el.url === 'none');
        playlistSample[index] =await {...playlistSample[index], url:this.props.navigation.state.params.link};
        await this.setState({ playlistSample });

        // if(this.player)
            // this.player.play();

    }
    render() {
        // console.log(this.state.playlistSample[0].url);
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: MyColor.blackTheme }}>
                <StatusBar translucent backgroundColor="transparent" />
                <AudioControls
                    ref={(ref)=>this.player=ref}
                    activeColor={'white'}
                    initialTrack={0} // starts on second audio file
                    playlist={this.state.playlistSample}
                />
            </View>
        )
    }
}
