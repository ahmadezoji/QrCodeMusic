import { Icon } from 'native-base';
import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator, TouchableOpacity, Linking, Text, StyleSheet } from 'react-native';
import { MyColor } from './Colors';
export default class ContactUs extends React.Component {
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
