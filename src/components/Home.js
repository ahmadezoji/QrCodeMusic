import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator, ScrollView, FlatList, TouchableOpacity,Text } from 'react-native';
import { MyColor } from './Colors';
import { homeMenu } from './MainMenu';

export default class Home extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: MyColor.blackTheme,justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar translucent backgroundColor="transparent" />
                <View style={{flex:1,top:100}}>
                    <FlatList
                        vertical
                        numColumns={2}
                        data={homeMenu}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(item.nav_link)}>
                                <View style={{ flex: 1, width: 100, height: 100, backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', borderRadius: 15, marginBottom:30,marginTop:30,marginRight:30,marginLeft:30 }}>
                                    <Image style={{width:50,height:50,marginTop:3}} source={require('../assets/public/userAccount.png')}></Image>
                                    <Text style={{color:'red',fontWeight:'bold',textAlignVertical:'center',textAlign:'center',marginTop:5}}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                        }
                        keyExtractor={({ id }, index) => id}
                    />
                </View>
            </View>

        )
    }
}
