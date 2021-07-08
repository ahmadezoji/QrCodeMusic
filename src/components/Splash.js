import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { StatusBar, Image, Dimensions, View, ActivityIndicator, Animated, Text, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
export default class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            top: new Animated.Value(0),
        };
    }
    async navigate() {
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
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: false })
            Animated.timing(this.state.top, {
                toValue: 35,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {
                this.navigate();
            })
        }, 500);
    }
    render() {
        const upDown = this.state.top.interpolate({
            inputRange: [0, 35],
            outputRange: [0, 1]
        });
        const AnimatedStyles = [
            {
                flexDirection: 'column',
                height: '10%',
                top: this.state.top,
                opacity: upDown

            }
        ];
        return (
            <View style={{ flex: 1, flexDirection: 'column-reverse', alignItems: 'center', backgroundColor: 'black' }}>
                <StatusBar translucent backgroundColor="transparent" />
                {/* <Image style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    source={require('../assets/public/player.gif')} /> */}
                <LottieView   resizeMode={'center'} source={require('../assets/public/spectrum2.json')} autoPlay loop />
                <Animated.View style={AnimatedStyles}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 25, fontWeight: 'bold' }}>Musice scanner</Text>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 10 }}>v 1.0.2</Text>
                </Animated.View>

                {/* {this.state.show && <ActivityIndicator size={30} color='red' />} */}
            </View>
        )
    }
}
