import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator, TouchableOpacity, Linking, Text, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { MyColor } from './Colors';

export default class Scanner extends React.Component {
    componentDidMount() {
    }
    onSuccess = e => {
        // this.props.navigation.navigate('player',{link:e.data});
        console.log(e.data);
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: MyColor.main_back }}>
                <StatusBar translucent backgroundColor="transparent" />
                <QRCodeScanner
                    containerStyle={{flex:1,alignItems:'center',justifyContent:'center',borderRadius:5}}
                    cameraStyle={{width:300,height:300,borderRadius:5}}
                    showMarker={true}
                    fadeIn={true}
                    onRead={this.onSuccess}
                    // flashMode={RNCamera.Constants.FlashMode.torch}
                    // topContent={
                        
                    // }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>OK. Got it!</Text>
                        </TouchableOpacity>
                    }
                />
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
});
