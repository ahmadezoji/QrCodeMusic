import React from 'react';
import { View, Text, Item, Icon } from 'native-base';
import { Image, ImageBackground, StyleSheet, AsyncStorage } from "react-native";


export default class DrawerLayout extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            username: '',
        };
    }
    async componentDidMount() {
        this._isMounted = true;
        // let _username = this._isMounted && await AsyncStorage.getItem('username');
        // this._isMounted && this.setState({ username: _username });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    async componentDidUpdate() {
        // let _username = this._isMounted && await AsyncStorage.getItem('username');
        // this._isMounted && this.setState({ username: _username });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: 'white', height: '20%', flexDirection: 'column', alignItems: 'flex-end' }}>

                    <ImageBackground style={{ height: '100%', width: '100%', justifyContent: 'center' }} blurRadius={10} source={require('../assets/public/backDrawe.png')}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                            <Icon name="md-person-circle-sharp"
                                style={{ color: 'black', fontSize: 40, alignItems: 'center' }} />
                            <Text style={{ color: 'white', fontFamily: 'IRANSansMobile', fontSize: 18, margin: 10, textAlignVertical: 'center' }}>{this.state.username}</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View>
                    <Item style={styles.item} onPress={() => this._onContact()}>
                        <Text style={styles.itemTitle}>تماس با ما</Text>
                        <Icon name="profile" type='AntDesign' style={styles.itemIcon} />
                    </Item>
                    <Item style={styles.item} onPress={() => this._onStore()}>
                        <Text style={styles.itemTitle}>فروشگاه</Text>
                        <Icon name="history" type='FontAwesome5' style={styles.itemIcon} />
                    </Item>
                </View>
            </View>
        )
    }
    async _onContact() {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('history')
    }
    async _onStore() {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('Home',{username:''});
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    imageHeader: {
        height: 36,
        width: '100%',
        resizeMode: 'contain',
    },
    item: {
        justifyContent: 'flex-end',
        padding: 10
    },
    itemTitle: {
        fontFamily: 'IRANSansMobile',
        fontSize: 14,
        color: 'white',
    },
    itemIcon: {
        marginLeft: 10,
        color: 'white',
    },
    iconUser: {
        margin: 10,
        color: 'white',
        height: 100,
        width: 100
    }
});
//source={{ uri: 'https://roocket.ir/public/image/2017/8/9/react-native.png' }}