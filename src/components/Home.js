import { Icon } from 'native-base';
import React from 'react';
import { StatusBar, AsyncStorage, Image, Dimensions, View, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, Text } from 'react-native';
import { MyColor } from './Colors';
import { homeMenu } from './MainMenu';
import { SliderBox } from "react-native-image-slider-box";
import FastImage from 'react-native-fast-image';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                "http://dl.abr.co.ir/tscobox/media/the-croods-2/cover.png",
                "http://dl.abr.co.ir/tscobox/media/Garfield/cover.jpg",
                "http://dl.abr.co.ir/tscobox/media/coco/cover.png",
            ]
        };
    }
    componentDidMount() {
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: MyColor.whiteTheme, flexDirection: 'column' }}>
                <View style={{
                    height: '50%',
                    borderRadius:12,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    elevation: 10,
                }}>
                    <SliderBox
                        ImageComponent={FastImage}
                        images={this.state.images}
                        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                        dotColor="#FFEE58"
                        inactiveDotColor="#90A4AE"
                        paginationBoxVerticalPadding={5}
                        autoplay
                        circleLoop
                        resizeMethod={'resize'}
                        resizeMode={'cover'}
                        // paginationBoxStyle={{
                        //     position: "absolute",
                        //     bottom: 0,
                        //     padding: 0,
                        //     alignItems: "center",
                        //     alignSelf: "center",
                        //     justifyContent: "center",
                        //     paddingVertical: 10
                        // }}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 0,
                            padding: 0,
                            margin: 0,
                            backgroundColor: "rgba(128, 128, 128, 0.92)"
                        }}
                        ImageComponentStyle={{ height: '90%', borderRadius: 15, width: '89%', marginTop: 15 }}
                        imageLoadingColor="#2196F3"
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                    <View style={{ width: '30%', padding: 10 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('store')}
                            style={{
                                height: '100%',
                                backgroundColor: MyColor.backCard,
                                borderRadius: 12,
                                justifyContent: 'center',
                                alignItems: 'center',
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.9,
                                shadowRadius: 3,
                                elevation: 3,
                            }}>
                            <Icon name="store"
                                type="FontAwesome5"
                                style={{ fontSize: 35, color: MyColor.main_back }}
                            />
                            <Text style={{
                                color: MyColor.main_back,
                                fontFamily: 'IRANSansMobile_Bold',
                                textAlignVertical: 'center',
                                textAlign: 'center',
                                marginTop: 5
                            }}>فروشگاه</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '70%', flexDirection: 'column' }}>
                        <View style={{ height: '50%', flexDirection: 'row', padding: 10 }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('contact')}
                                style={{
                                    backgroundColor: MyColor.backCard,
                                    width: '45%',
                                    marginRight: 12,
                                    borderRadius: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    shadowColor: '#000000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.9,
                                    shadowRadius: 3,
                                    elevation: 3,
                                }}>
                                <Icon name="contact-mail"
                                    type="MaterialIcons"
                                    style={{ fontSize: 35, color: MyColor.main_back }}
                                />
                                <Text style={{
                                    color: MyColor.main_back,
                                    fontFamily: 'IRANSansMobile_Bold',
                                    textAlignVertical: 'center',
                                    textAlign: 'center',
                                    marginTop: 5
                                }}>ارتباط با ما</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('help')}
                                style={{
                                    backgroundColor: MyColor.backCard,
                                    width: '45%',
                                    borderRadius: 12,
                                    marginLeft: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    shadowColor: '#000000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.9,
                                    shadowRadius: 3,
                                    elevation: 3,
                                }}>
                                <Icon name="help-circle"
                                    type="Feather"
                                    style={{ fontSize: 35, color: MyColor.main_back }}
                                />
                                <Text style={{ color: MyColor.main_back, fontFamily: 'IRANSansMobile_Bold', textAlignVertical: 'center', textAlign: 'center', marginTop: 5 }}>راهنما</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: '50%', padding: 10 }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('scanner')}
                                style={{
                                    height: '100%',
                                    backgroundColor: MyColor.backCard,
                                    borderRadius: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    shadowColor: '#000000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.9,
                                    shadowRadius: 3,
                                    elevation: 3,

                                }}>
                                <Icon name="scan"
                                    style={{ fontSize: 35, color: MyColor.main_back }}
                                />
                                <Text style={{ color: MyColor.main_back, fontFamily: 'IRANSansMobile_Bold', textAlignVertical: 'center', textAlign: 'center', marginTop: 5 }}>اسکن</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
