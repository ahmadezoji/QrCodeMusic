import { Icon } from 'native-base';
import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator, TouchableOpacity, Linking, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { MyColor } from './Colors';

export default class Scanner extends React.Component {
    constructor(props) {
        super(props);
        this.scanner = null
        this.state = {
            front: false,
            flashOn: false
        };
    }
    componentDidUpdate() {
        this.scanner.reactivate()
    }
    onSuccess = e => {
        this.props.navigation.navigate('player', { link: e.data });
        // this.scanner.reactivate();
        // alert(e.data);
    };
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: MyColor.blackTheme }}>
                <StatusBar translucent backgroundColor="transparent" />
                <QRCodeScanner
                    containerStyle={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 0, top: 0, bottom: 0 }}
                    cameraStyle={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, borderRadius: 10, borderColor: 'yellow' }}
                    showMarker={true}
                    // markerStyle={{width:100,height:100}}
                    vibrate={true}
                    customMarker={({ item }) => (
                        <View style={{ height: 250, width: 250, borderColor: 'red', borderWidth: 3, borderRadius: 12 }}>
                        </View>
                    )}
                    FlashMode={this.state.flashOn ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                    onRead={this.onSuccess}
                    ref={(ref) => this.scanner = ref}

                />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{
                        backgroundColor: MyColor.whiteTheme, width: 50, height: 50,
                        marginBottom: 20, borderRadius: 5, alignItems: 'center', justifyContent: 'center', margin: 15
                    }} onPress={() => setTimeout(() => {
                        this.scanner.reactivate()
                    }, 2000)}>
                        <Icon style={{ fontSize: 40 }} type="MaterialCommunityIcons" name="lock-reset" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: MyColor.whiteTheme, width: 50, height: 50,
                        marginBottom: 20, borderRadius: 5, alignItems: 'center', justifyContent: 'center', margin: 15
                    }} onPress={() => this.setState({ flashOn: !this.state.flashOn })}>
                        <Icon style={{ fontSize: 40 }} type="FontAwesome" name="flash" />
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
});
