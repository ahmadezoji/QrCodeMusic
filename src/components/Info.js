import { Icon } from 'native-base';
import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator, TouchableOpacity, Linking, Text, StyleSheet } from 'react-native';
import { MyColor } from './Colors';
export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.scanner = null
        this.state = {
            viewport: {
                latitude: 37.7577,
                longitude: -122.4376,
                zoom: 8
            }
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: MyColor.whiteTheme }}>
                <View style={{ width: '90%', height: '30%', borderRadius: 12, margin: 5, backgroundColor: MyColor.backCard, padding: 5 }}>
                    <Text style={{ color: MyColor.main_back, fontFamily: 'IRANSansMobile_Bold', textAlign: 'center' }}>تماس</Text>
                    <Text style={{ color: MyColor.main_back, fontFamily: 'IRANSansMobile_Light', textAlign: 'center' }}>تلفن ۱: ۲۴۲۴۲۵۲</Text>
                    <Text style={{ color: MyColor.main_back, fontFamily: 'IRANSansMobile_Light', textAlign: 'center' }}>تلفن ۱: ۲۴۲۴۲۵۲</Text>
                    <Text style={{ color: MyColor.main_back, fontFamily: 'IRANSansMobile_Light', textAlign: 'center' }}>کد پستی: ۲۴۲۴۲۵۲</Text>
                    <Text style={{ color: MyColor.main_back, fontFamily: 'IRANSansMobile_Light', textAlign: 'center' }}>تهران خیابان پونک سجاجید پلا ۹</Text>
                </View>
                <View style={{ width: '90%', height: '25%', borderRadius: 12, margin: 5, backgroundColor: MyColor.backCard, padding: 5 }}>
                    <Text style={{ color: MyColor.main_back, fontFamily: 'IRANSansMobile_Bold', textAlign: 'center' }}>روزهای کاری</Text>
                    <Text style={{ color: MyColor.main_back, fontFamily: 'IRANSansMobile_Light', textAlign: 'center' }}>شنبه ها از ساعت ۸ الی ۱۴</Text>
                    <Text style={{ color: MyColor.main_back, fontFamily: 'IRANSansMobile_Light', textAlign: 'center' }}>شنبه ها از ساعت ۸ الی ۱۴</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '90%', height: '15%', borderRadius: 12, margin: 5, backgroundColor: MyColor.backCard, padding: 5 }}>
                    <Icon name="instagram"
                        type="FontAwesome"
                        style={{ margin: 10, color: MyColor.main_back, fontSize: 40 }}
                        onPress={() => {
                            Linking.openURL('instagram://user?username=apple')
                        }}
                    />
                    <Icon name="telegram"
                        type="FontAwesome"
                        style={{ margin: 10, color: MyColor.main_back, fontSize: 40 }}
                        onPress={() => {
                            Linking.openURL('telegram://')
                        }}
                    />
                    <Icon name="twitter"
                        type="FontAwesome"
                        style={{ margin: 10, color: MyColor.main_back, fontSize: 40 }}
                        onPress={() => {
                            Linking.openURL('twitter://timeline')
                        }}
                    />
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
