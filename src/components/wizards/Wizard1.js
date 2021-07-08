import { Icon } from 'native-base';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar, Image, Dimensions, View, ActivityIndicator, TouchableOpacity, Linking, Text, StyleSheet } from 'react-native';
import { MyColor } from '../Colors';
import LottieView from 'lottie-react-native';

export default class Wizard1 extends React.Component {
    constructor(props) {
        super(props);
        this.scanner = null
        this.state = {
        };
    }
    async componentDidMount() {

    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <Text style={{color:'white',fontSize:18,fontFamily:'IRANSansMobile_Bold'}}>دوربین را مقابل کد نگه دارید</Text>
                <StatusBar translucent backgroundColor="transparent" />
                <LottieView style={{ height: 300}} source={require('../../assets/public/qr-code-scanner.json')} autoPlay loop />
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ borderWidth: 1, borderColor: 'white', margin: 15, width: 20, height: 20, backgroundColor: 'black', borderRadius: 10 }}></View>
                    <View style={{ borderWidth: 1, borderColor: 'white', margin: 15, width: 20, height: 20, backgroundColor: 'yellow', borderRadius: 10 }}></View>
                    <View style={{ borderWidth: 1, borderColor: 'white', margin: 15, width: 20, height: 20, backgroundColor: 'yellow', borderRadius: 10 }}></View>
                    <TouchableOpacity
                        onPress={() => {
                            AsyncStorage.setItem('wizard', "1");
                            this.props.navigation.navigate('wizard2')
                        }}
                        style={{
                            width: 50, height: 50, borderRadius: 25,
                            backgroundColor: MyColor.second_back, justifyContent: 'center', alignItems: 'center'
                        }}>
                        <Icon name="right"
                            type="AntDesign"
                            style={{ color: 'white', fontSize: 20 }}
                        />
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
