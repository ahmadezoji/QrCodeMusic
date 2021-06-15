import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator } from 'react-native';

export default class Home extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <View style={{ flex: 1,flexDirection:'column',justifyContent:'center',alignItems:'center', backgroundColor: 'black' }}>
                <StatusBar translucent backgroundColor="transparent" />
                <ActivityIndicator color='white' />
            </View>
        )
    }
}
