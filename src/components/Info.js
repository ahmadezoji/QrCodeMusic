import { Icon } from 'native-base';
import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator, TouchableOpacity, Linking, Text, StyleSheet } from 'react-native';
import { MyColor } from './Colors';

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.scanner = null
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: MyColor.blackTheme }}>
                <StatusBar translucent backgroundColor="transparent" />
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
