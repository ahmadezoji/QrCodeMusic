import { Icon } from 'native-base';
import React from 'react';
import Camera from 'react-native-camera';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator, TouchableOpacity, Linking, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { MyColor } from './Colors';

export default class QRScanner extends React.Component {
    constructor(props) {
        super(props);
        this.camera = null
        this.state = {
            front: false,
            flashOn: false
        };
    }
    onSuccess = e => {
        this.props.navigation.navigate('player', { link: e.data, downloadUri: null });
        alert(e.data)
        setTimeout(() => {
            this.scanner.reactivate();
        }, 6000);
        // alert(e.data);
    };
    render() {
        const { height, width } = Dimensions.get('window');
        const maskRowHeight = Math.round((height - 300) / 20);
        const maskColWidth = (width - 300) / 2;
        return (
            <View style={styles.container}>
                <QRCodeScanner
                    ref={cam => {
                        this.camera = cam;
                    }}
                    // onBarCodeRead={this._onBarCodeRead}
                    style={styles.cameraView}
                // aspect={Camera.constants.Aspect.fill}
                // playSoundOnCapture
                >
                    <View style={styles.maskOutter}>
                        <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
                        <View style={[{ flex: 30 }, styles.maskCenter]}>
                            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                            <View style={styles.maskInner} />
                            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                        </View>
                        <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
                    </View>
                </QRCodeScanner>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraView: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    maskOutter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    maskInner: {
        width: 300,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
    },
    maskFrame: {
        backgroundColor: 'rgba(1,1,1,0.6)',
    },
    maskRow: {
        width: '100%',
    },
    maskCenter: { flexDirection: 'row' },
});