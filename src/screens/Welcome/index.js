import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, Image, SafeAreaView } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { onUserSessionChangeState } from '../../redux/actions/userSession'
import Images from '../../assets/Images';
import CarouselDots from '../../components/CarouselDots';
import CustomButton from '../../components/customButton';
import { Colors } from '../../utils/Colors';

const width = Dimensions.get('window').width
const DATA = [
    {
        key: '1',
        title: "Make Impression",
        text: 'Make the perfect impression in 30 secs, get a chance to convince the recruiters why you are the best candidate.',
        Image: Images.playButtonIcon
    },
    {
        key: '2',
        title: "Trial Job's",
        text: 'Get trial jobs to apply, register today to know how.',
        Image: Images.mailIcon
    },
    {
        key: '3',
        title: 'Get Started',
        text: 'Create your account or sign in to explore the job opportunities in your field.',
        Image: Images.getStartedIcon

    }
]
export default Welcome = ({ navigation }) => {

    const listRef = useRef(null);
    

    const dispatch = useDispatch()

    const [indicator, setIndicator] = useState(0)

    const renderItem = ({ item }) => (
        <View style={styles.mainContainer}>
            {/* <View style={{ height: 52 }}> */}
            <Text style={styles.heading}>{item.title}</Text>
            <Text style={styles.innerText}>{item.text}</Text>
            {/* </View> */}
            {/* <View style={{  backgroundColor:'red', width:'100%', alignSelf:'center', alignItems:'center', }}> */}
            <View style={{
                // backgroundColor:'red', 
                width: width,
                height: 450,
                alignSelf: 'center',
                alignItems: 'center',
            }}>
                <Image source={item.Image} style={{
                    alignSelf: 'center',
                    // alignItems:'center',
                    // justifyContent:'center',
                    marginLeft: 45,
                    width: indicator == 0 ? 318 : indicator == 1 ? 251 : indicator == 2 ? 233 : 318,
                    height: indicator == 0 ? 190 : indicator == 1 ? 200 : indicator == 2 ? 234 : 222,
                    marginRight: 48,
                    resizeMode: 'contain',
                    marginTop: 60
                }} />
            </View>
        </View>
    );

    const onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setIndicator(pageNum)
    }

    return (
        <SafeAreaView>
            <View style={styles.carouselHeader}>
                <CarouselDots
                    skipPress={() => {
                        setIndicator(2)
                        listRef.current.scrollToIndex({ animated: true, index: 2, viewPosition: 2 });
                    }}
                    selectedIndex={indicator}
                    count={3}
                />
            </View>
            <View style={{
                width: width,
                height: '70%',
                //   alignSelf:'center', 
                //   alignItems:'center', 
                //   justifyContent:'center',
                //   padding:20,
                //   backgroundColor:'blue'
            }}>
                <FlatList
                    ref={listRef}
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item.id}_${index}`}
                    scrollEventThrottl={1900}
                    onMomentumScrollEnd={(e) => onScrollEnd(e)} />
            </View>
            {indicator <= 1 && (<View style={{ width: '100%', alignSelf: 'center', marginTop: 'auto', }}>
                <CustomButton
                    label={'Next'}
                    style={{ backgroundColor: Colors.LightBlue, width: '86%', height: 44 }}
                    onPress={() => {
                        setIndicator(indicator + 1)
                        listRef.current.scrollToIndex({ animated: true, index: indicator == 1 ? 2 : 1, viewPosition: indicator == 1 ? 2 : 1 });
                    }}
                    textStyle={{ color: Colors.White, textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Bold' }}
                />
            </View>)}
            {indicator == 2 && (<View style={{ width: '100%', alignSelf: 'center', marginTop: 'auto', }}>
                <CustomButton
                    label={'Sign In'}
                    style={{ backgroundColor: 'white', width: '86%', height: 44 }}
                    onPress={() => {
                        dispatch(onUserSessionChangeState({ isOnboardingVisited: true, routeToSignIn: true }))
                    }}
                    textStyle={{ color: '#00B3EC', textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Bold' }}
                />
                <CustomButton
                    label={'Sign Up'}
                    style={{ backgroundColor: '#00B3EC', margin: 15, width: '86%', height: 44, }}
                    onPress={() => {
                        dispatch(onUserSessionChangeState({ isOnboardingVisited: true, routeToSignIn: false }))
                    }}
                    textStyle={{ color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Bold' }}

                />
            </View>)}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        // flex:1,
        //  width:'100%'
        width: width,
        height: '30%',
        // backgroundColor:'red',
        padding: 20
    },
    heading: {
        color: '#0F0A39',
        fontFamily: 'Roboto-Bold',
        fontSize: 30,
        // padding: 5,
        // backgroundColor:'red'


    },
    innerText: {
        color: '#7B7890',
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        // padding: 5,
        marginLeft: 1,
        marginTop: 10,
        // backgroundColor:'red',

    },
    carouselHeader: {
        width: '100%',
        height: 80,
        // backgroundColor:'black'  
        // backgroundColor:'red'
    },

})

