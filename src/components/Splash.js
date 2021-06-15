import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator } from 'react-native';

export default class Splash extends React.Component {
    componentDidMount() {
        this._bootstrapAsync();
    }
  _bootstrapAsync = async () => {
    // let _username = await AsyncStorage.getItem('username');
    this.props.navigation.navigate('Home',{username:''});
  };
    render() {
        return (
            <View style={{ flex: 1,flexDirection:'column',justifyContent:'center',alignItems:'center', backgroundColor: 'black' }}>
                <StatusBar translucent backgroundColor="transparent" />
                <Image style={{ height: 40,width:200 }}
                    source={require('../assets/public/logotype.png')} />
                <ActivityIndicator color='white' />
            </View>
        )
    }
}
