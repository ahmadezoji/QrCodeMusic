import { Icon } from 'native-base'
import React, { useState, useEffect } from 'react'
import {
  StatusBar,
  AsyncStorage,
  Image,
  Dimensions,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Text,
  StyleSheet,
  Platform
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { SliderBox } from 'react-native-image-slider-box'
import { MyColor } from './Colors'

const Mycontact = ({ navigation }) => {
  let [phone, setPhone] = useState([448899663, 222425336])
  let [images, setImages] = useState([
    require('../assets/public/slider-contact.jpg'),
    require('../assets/public/slider-contact.jpg'),
    require('../assets/public/slider-contact.jpg')
  ])
  let [address, setAddress] = useState(
    'تهران پونک خیابان سجاجید پلاک ۱۵ واحد ۲'
  )
  const lat = 35.7544765
  const lon = 51.318194
  let [days, setDays] = useState([
    'شنبه ها ساعت ۸−۱۴',
    'دوشنبه ها ساعت ۸−۱۴',
    'پنجشنبه ها ساعت ۸−۲۰'
  ])
  const openMap = () => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q='
    })
    const latLng = `${lat},${lon}`
    const label = 'Scanner'
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    })

    Linking.openURL(url)
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red'
      }}
    >
      <StatusBar translucent backgroundColor='transparent' />
      <SliderBox
        ImageComponent={FastImage}
        images={images}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor='#FFEE58'
        inactiveDotColor='#90A4AE'
        paginationBoxVerticalPadding={5}
        autoplay
        circleLoop
        resizeMethod={'resize'}
        resizeMode={'cover'}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: 'rgba(128, 128, 128, 0.92)'
        }}
        ImageComponentStyle={{
          height: 200
        }}
        imageLoadingColor='#2196F3'
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2
        }}
      >
        <Icon name={'map-marker'} type={'FontAwesome'} />
        <TouchableOpacity onPress={() => openMap()}>
          <Text style={{ color: 'blue', fontSize: 15 }}>Open Map</Text>
        </TouchableOpacity>
        <Text style={styles.textAddress}>{address}</Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2
        }}
      >
        <Icon name={'mobile'} type={'Entypo'} />

        {phone.map(phone => (
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
            <Text style={{ color: 'blue', fontSize: 15 }}>{phone}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2
        }}
      >
        <Icon name={'clock'} type={'Feather'} />
        {days.map(item => (
          <Text style={styles.textAddress} key={item}>
            {item}
          </Text>
        ))}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Icon
          name='instagram'
          type='FontAwesome'
          style={{ margin: 10, color: MyColor.main_back, fontSize: 40 }}
          onPress={() => {
            Linking.openURL('instagram://user?username=apple')
          }}
        />
        <Icon
          name='telegram'
          type='FontAwesome'
          style={{ margin: 10, color: MyColor.main_back, fontSize: 40 }}
          onPress={() => {
            Linking.openURL('telegram://')
          }}
        />
        <Icon
          name='twitter'
          type='FontAwesome'
          style={{ margin: 10, color: MyColor.main_back, fontSize: 40 }}
          onPress={() => {
            Linking.openURL('twitter://timeline')
          }}
        />
      </View>
    </View>
  )
}

export { Mycontact }

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
  },
  textAddress: {
    color: 'black',
    fontFamily: 'IRAMSansMobile',
    fontSize: 17,
    textAlign: 'center'
  }
})
