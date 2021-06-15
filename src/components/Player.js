import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator } from 'react-native';
// import { AudioPlayer } from 'react-native-simple-audio-player';
import { AudioControls } from 'react-native-hue-player';

// let playlistSample = [
//     {
//         key: 'audio01',
//         title: 'Ebi',
//         url: 'http://dl.mokhtalefmusic.com/music/1397/07/03/ebi%20Khalij.mp3',
//         author: 'Francisco Manuel da Silva',
//         thumbnailUri: 'http://dl.abr.co.ir/tscobox/media/aquaman/home.png'
//     },
// ];
export default class Player extends React.Component {
    // http://dl.mokhtalefmusic.com/music/1397/07/03/ebi%20Khalij.mp3
    constructor(props) {
        super(props);
        this.player = null
        this.state = {
            playlistSample: [
                {
                    key: 'audio01',
                    title: 'Ebi',
                    url: 'http://dl.mokhtalefmusic.com/music/1397/07/03/ebi%20Khalij.mp3',
                    author: 'Francisco Manuel da Silva',
                    thumbnailUri: 'http://dl.abr.co.ir/tscobox/media/aquaman/home.png'
                }
            ]
        };
    }
    componentDidMount() {
        // this.loadMusic();
      
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
        console.log(this.state.playlistSample[0].url);
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <StatusBar translucent backgroundColor="transparent" />
                <AudioControls
                    ref={(ref)=>this.player=ref}
                    activeColor={'#e82b28'}
                    initialTrack={0} // starts on second audio file
                    playlist={this.state.playlistSample}
                />
            </View>
        )
    }
}
