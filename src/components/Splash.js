import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { StatusBar, Image, Dimensions, View, ActivityIndicator } from 'react-native';

export default class Splash extends React.Component {
    async componentDidMount() {
        let index = await AsyncStorage.getItem('wizard');
        if (index == "3")
            this.props.navigation.navigate('Home');
        else {
            if (index == "0" || index == null)
                this.props.navigation.navigate('wizard1');
            else if (index == "1")
                this.props.navigation.navigate('wizard2');
            else if (index == "2")
                this.props.navigation.navigate('wizard3');
        }
        console.log('index:' , index);
        // setTimeout(() => {


        // }, 2000);
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                {/* <StatusBar translucent backgroundColor="transparent" /> */}
                <Image style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    source={require('../assets/public/bg.jpg')} />
                <ActivityIndicator size={30} color='red' />
            </View>
        )
    }
}
