import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator } from 'react-native';

export default class Splash extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Home',{username:''});
        }, 2000);
    }
    render() {
        return (
            <View style={{ flex: 1,flexDirection:'column',justifyContent:'center',alignItems:'center', backgroundColor: 'black' }}>
                <StatusBar translucent backgroundColor="transparent" />
                <Image style={{ height: '100%',width:'100%',position:'absolute',top:0,left:0,right:0,bottom:0 }}
                    source={require('../assets/public/backgroundHome.jpeg')} />
                <ActivityIndicator size={30} color='red' />
            </View>
        )
    }
}
