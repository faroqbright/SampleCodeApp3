import React, { useState } from "react";
import { View, StyleSheet, Alert, Text, Dimensions, Image } from "react-native";
import Slider from '@react-native-community/slider';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from '../utils/Colors'
import Modal from "react-native-modal";
import CustomButton from './customButton';
import Images from "../assets/Images";
import CustomInput from "./CustomInput";
import CustomCheckbox from "./CustomCheckbox";
import Loader from "./Loader";
import { jobFiltersAPi } from "../api/methods/auth";
import LocationModal from "./LocationModal";

export default FilterModal = (props) => {

    const { navigation } = props

    // const [buttonColor, setButtonColor] = useState('')
    // const [isSelected, setSelection] = useState(false)
    // console.log("isSelected-1=>>", isSelected)
    // const [isSelected2, setSelection2] = useState(false)
    // console.log("isSelected-2=>>", isSelected2)

    const [selectCity, setSelectCity] = useState(false)
    const [selectRemote, setSelectRemote] = useState(false)

    const [sliderValue, setSliderValue] = useState(5000);
    const [maxSliderValue, setMaxSliderValue] = useState(50000);
    const [jobTitle, setJobTitle] = useState('')
    const [loading, setLoading] = useState(false)

    const [jobTrialCheckBox, setJobTrialCheckBox] = useState(false)
    const [permanentToggleCheckBox, setPermanentToggleCheckBox] = useState(false)
    const [temporaryToggleCheckBox, setTemporaryToggleCheckBox] = useState(false)
    const [contractToggleCheckBox, setContractToggleCheckBox] = useState(false)
    const [remoteToggleCheckBox, setRemoteToggleCheckBox] = useState(false)
    const [partTimeToggleCheckBox, setPartTimeToggleCheckBox] = useState(false)

    const [recentToggleCheckBox, setRecentToggleCheckBox] = useState(false)
    const [lastWeekToggleCheckBox, setLastWeekToggleCheckBox] = useState(false)
    const [lastMonthToggleCheckBox, setLastMonthToggleCheckBox] = useState(false)

    const [checked, setChecked] = useState(0)
    const [jobType, setJobType] = useState('')
    const [datePosted, setDatePosted] = useState('')

    const [locationModalVisible, setLocationModalVisible] = useState(false)
    const [location, setLocation] = useState('')

    const jobTypeString = () => {
        let stg = ''
        if (jobTrialCheckBox == true) {
            stg = stg + 'jobTrial'
            // setJobType==1
        }
        if (permanentToggleCheckBox == true) {
            stg = stg + ',permanent'
            // setJobType==2
        }
        if (temporaryToggleCheckBox == true) {
            stg = stg + ',temporary'
            // setJobType==3
        }
        if (contractToggleCheckBox == true) {
            stg = stg + ',contract'
            // setJobType==4
        }
        if (remoteToggleCheckBox == true) {
            stg = stg + ',remote'
            // setJobType==5
        }
        if (partTimeToggleCheckBox == true) {
            stg = stg + ',part time'
            // setJobType==6
        }
        setJobType(stg)

        let dateStg = ''
        if (recentToggleCheckBox == true) {
            dateStg = dateStg + 'recent'
        }
        if (lastWeekToggleCheckBox == true) {
            dateStg = dateStg + ',last week'
        }
        if (lastMonthToggleCheckBox == true) {
            dateStg = dateStg + ',last month'
        }
        setDatePosted(dateStg)

        let locationString = ''
        if (locationString='') {
            setLocation(locationString)
        }
        // if (selectRemote == true) {
        //     locationString = locationString + ', remote'
        // }

        navigation.navigate("FilteredSearchResult", {
            searchParams: {
                search_text: jobTitle,
                job_type: stg,
                industry_type: '2',
                posted_date: dateStg,
                salary_from: sliderValue,
                salary_to: maxSliderValue,
                location: location
            }
        })
    }

    // const datePostedString = () => {
    //     let dateStg = ''
    //     if (recentToggleCheckBox == true) {
    //         dateStg = dateStg + 'recent'
    //     }
    //     if (lastWeekToggleCheckBox == true) {
    //         dateStg = dateStg + ',last week'
    //     }
    //     if (lastMonthToggleCheckBox == true) {
    //         dateStg = dateStg + ',last month'
    //     }
    //     setDatePosted(dateStg)
    // }






    const changeColor = () => {
        setSelection(!isSelected)
        if (!isSelected) {
            setSelection2(false)
        }
        else {
            setSelection2(true)
        }
    }
    const changeColor2 = () => {
        setSelection2(!isSelected2)
        if (!isSelected2) {
            setSelection(false)
        }
        else {
            setSelection2(true)
        }
    }


    let checker = (newValue) => {
        if (newValue) {
            let x = checked
            setChecked(parseInt(x) + 1)
        }
        else {
            if (checked > 0) {
                setChecked(checked - 1)
            }
        }
    }


    return (


        // <View style={{ flex: 1, marginTop: 'auto' }}>

        // <KeyboardAwareScrollView>
        <View 
            // isVisible={props.isVisible}
            // animationType="slide"
            // transparent={true}
            // coverScreen={true}
            style={{
                width: '100%',
                height: '100%',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                // marginTop:'30%'

            }}
        >
            <ScrollView scrollEnabled={true} style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>Filters</Text>
                        <CustomButton
                            style={styles.buttonStyle}
                            source={Images.crossIcon}
                            imageStyle={styles.buttonIcon}
                            onPress={() => props.onPress()}
                        />
                    </View>
                    <CustomInput
                        mainStyle={styles.searhBarStyle}
                        placeholder={"Sort by"}
                        onChangeText={(text) => setJobTitle(text)}
                        innerStyle={styles.innerStyle}
                    // buttonText={"Salary"}
                    // textStyle={{width:45, height:19, fontFamily:'Roboto-Bold', color:Colors.LightBlue}}
                    // secondButtonStyle={{flexDirection:'row', justifyContent:'space-evenly', marginTop:40, marginRight:15}}
                    // icon={Images.downArrowIcon}
                    // iconStyle={styles.iconStyle}
                    // onPress={() => Alert.alert("Button is Pressed")}
                    />
                    <Text style={styles.middleHeading}>Job Type</Text>
                    <View style={styles.checkBoxContainer}>
                        <CustomCheckbox
                            title={"Job Trial"}
                            value={jobTrialCheckBox}
                            onValueChange={(newValue) => {
                                checker(newValue)
                                setJobTrialCheckBox(newValue)
                                console.log("job trial checkbox=====>>>>>>", newValue)
                            }}
                        />

                        <CustomCheckbox
                            onValueChange={(newValue) => {
                                checker(newValue)
                                setPermanentToggleCheckBox(newValue)
                                console.log("permanent check box==========>>>>>>", newValue)
                            }}
                            title={"Permanent"}
                            value={permanentToggleCheckBox}
                        />

                        <CustomCheckbox
                            title={"Temporary"}
                            onValueChange={(newValue) => {
                                checker(newValue)
                                setTemporaryToggleCheckBox(newValue)
                                console.log("Temporary Check box===============>>>>>", newValue)
                            }}
                            value={temporaryToggleCheckBox}
                        />
                    </View>
                    <View style={styles.checkBoxContainer}>
                        <CustomCheckbox
                            title={"Contract"}
                            value={contractToggleCheckBox}
                            onValueChange={(newValue) => {
                                checker(newValue)
                                setContractToggleCheckBox(newValue)
                                console.log("Contract Check box==========================>>>>", newValue)
                            }}
                        />

                        <CustomCheckbox
                            mainStyle={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: 0, marginRight: 22 }}
                            title={"Remote"}
                            value={remoteToggleCheckBox}
                            onValueChange={(newValue) => {
                                checker(newValue)
                                setRemoteToggleCheckBox(newValue)
                                console.log("Remote check box===============>>>>>>>", newValue)
                            }}
                        />

                        <CustomCheckbox
                            mainStyle={{ marginRight: 10, marginLeft: 0, }}
                            title={"Part-time"}
                            value={partTimeToggleCheckBox}
                            onValueChange={(newValue) => {
                                checker(newValue)
                                setPartTimeToggleCheckBox(newValue)
                                console.log("Part-time toggle check box=================>>>>>>", newValue)
                            }}
                        />

                    </View>
                    <Text style={styles.thirdHeading}>Date Posted</Text>
                    <View style={styles.checkBoxContainer}>
                        <CustomCheckbox
                            title={"Recent"}
                            value={recentToggleCheckBox}
                            onValueChange={(newValue) => {
                                checker(newValue)
                                setRecentToggleCheckBox(newValue)
                                console.log("recent check box=================>>>>>>>>", newValue)
                            }}
                        />

                        <CustomCheckbox
                            mainStyle={{ marginLeft: 20, }}
                            title={"Last Week"}
                            value={lastWeekToggleCheckBox}
                            onValueChange={(newValue) => {
                                checker(newValue)
                                setLastWeekToggleCheckBox(newValue)
                                console.log("Last Week check  box======================>>>>>", newValue)
                            }}
                        />

                        <CustomCheckbox
                            mainStyle={{ marginLeft: 5, marginRight: -5 }}
                            title={"Last Month"}
                            value={lastMonthToggleCheckBox}
                            onValueChange={(newValue) => {
                                checker(newValue)
                                setLastMonthToggleCheckBox(newValue)
                                console.log("Last month check box====================>>>>>>>", newValue)
                            }}
                        />

                    </View>
                    <View>
                        <Text style={styles.thirdHeading}> Salary Range</Text>
                        {/* <View style={styles.salaryContainer}>
                            <Image
                                style={styles.ellipseIconStyle}
                                source={Images.ellipseIcon}
                            />
                            <Image
                                style={styles.ellipseIconRightStyle}
                                source={Images.ellipseIcon}
                            />
                        </View>
                        <View style={styles.salaryTextContainer}>
                            <Text style={styles.salaryText}>$10K</Text>
                            <Text style={styles.salaryText2}>$50K</Text>
                        </View> */}
                        <View style={styles.salaryTextContainer}>
                            <Text style={{ color: Colors.LightBlue }}>
                                Minimum Salary Range : {sliderValue}
                            </Text>
                        </View>
                        <Slider
                            minimumValue={5000}
                            maximumValue={50000}
                            style={{
                                width: '90%',
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 10
                            }}
                            thumbTintColor={Colors.LightBlue}
                            minimumTrackTintColor={Colors.LightGray}
                            maximumTrackTintColor={Colors.LightGray}
                            step={1}
                            value={sliderValue}
                            onValueChange={
                                (sliderValue) => setSliderValue(sliderValue)
                            }
                        />
                        <View style={styles.salaryTextContainer}>
                            <Text style={{ color: Colors.LightBlue }}>
                                Maximum Salary Range : {maxSliderValue}
                            </Text>
                        </View>
                        <Slider
                            minimumValue={50000}
                            maximumValue={500000}
                            style={{
                                width: '90%',
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 10
                            }}
                            thumbTintColor={Colors.LightBlue}
                            minimumTrackTintColor={Colors.LightGray}
                            maximumTrackTintColor={Colors.LightGray}
                            step={1}
                            value={maxSliderValue}
                            onValueChange={
                                (maxSliderValue) => setMaxSliderValue(maxSliderValue)
                            }
                        />
                    </View>
                    <View>
                        <Text style={styles.thirdHeading}> Location</Text>
                        {/* <View style={styles.locationButtonContainer}> */}
                        <CustomButton
                            style={styles.finishButtonStyle}
                            textStyle={styles.finishButtonTextStyle}
                            label={"Select Location"}
                            // onPress={() => setSelectCity(!selectCity)
                            //     // console.log('city========>>>>',selectCity)
                            // }
                            onPress={() =>{ 

                                setLocationModalVisible(true)
                            }}
                        />
                        {/* <CustomButton
                                style={{
                                    backgroundColor: selectRemote == true ? Colors.LightBlue : Colors.White,
                                    width: '50%',
                                    height: 48,
                                    borderColor: Colors.InputField
                                }}
                                label={"Remote"}
                                textStyle={{
                                    color: selectRemote == true ? Colors.White : Colors.DarkGray,
                                    textAlign: 'center',
                                    fontSize: 16
                                }}
                                onPress={() => setSelectRemote(!selectRemote)
                                    // console.log("Remote======>>>>>>>",selectRemote)
                                }
                            /> */}
                        {/* </View> */}
                        <View style={styles.locationContainer}>
                            <Image
                                style={styles.locationIcon2Style}
                                source={Images.locationIcon2}
                            />
                            <View style={styles.locationTextContainer}>
                                <Text style={styles.locationText}>{location.length>0?location:'Location'}</Text>
                                {/* <Text style={styles.locationText}>City, Country.</Text> */}
                            </View>
                        </View>
                        <CustomButton
                            style={styles.finishButtonStyle}
                            textStyle={styles.finishButtonTextStyle}
                            label={"Apply"}
                            onPress={() => {
                                props.onPress()
                                setTimeout(() => {
                                    jobTypeString()
                                }, 300);
                            }}
                        />
                    </View>

                </View>
            </ScrollView>
            <LocationModal
                isVisible={locationModalVisible}
                // onRequestClose={()=>setLocationModalVisible(false)}
                onClosePress={() => setLocationModalVisible(false)}
                onGooglePlacePress={(data, details = null) => {
                    // alert('hello')
                    // fetchDetails = true
                    console.log('data===>>',data, details);
                    setLocation(data.description)
                    setLocationModalVisible(false)
                    console.log("close modal===>>", locationModalVisible)
                }}
            />
            <Loader loading={loading} isShowIndicator={true} />
        </View>

        // </View>


    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White,
        alignSelf: 'center',
        height: 700,
        // marginTop: 'auto',
        marginBottom: 0,
        width: Dimensions.get('window').width,
        borderRadius: 20,

    },
    iconStyle: {
        // backgroundColor:'red',
        width: 15,
        height: 15,
        marginRight: 25,
        marginTop: 5,
        marginLeft: 5,
        marginBottom: 40,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    scrollView: {
        width: '100%',
        marginBottom: 0,
        height: Dimensions.get('window').width,
        // marginTop:50,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // margin: 30,
        marginHorizontal:30,
        marginBottom: 5

    },
    heading: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        color: Colors.DarkBlue,
        marginTop:20
    },
    buttonStyle: {
        backgroundColor: Colors.White,
        // backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 0,
        width: 44,
        height: 44,
        // marginLeft:40
        // marginRight: 10
    },
    buttonIcon: {
        // marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '50%'
    },
    searhBarStyle: {
        width: '90%',
        height: 52,
        marginTop: 0,
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        // paddingHorizontal: 20
    },
    innerStyle: {
        // marginLeft: 5,
        paddingHorizontal: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    middleHeading: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: Colors.DarkBlue,
        marginHorizontal: 30,
        marginBottom: 5,
        marginTop: 10,
    },
    checkBoxContainer: {
        // margin: 5,
        // marginTop: 5,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 1,
        // backgroundColor:'red'
    },
    checkBoxText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.LightGray,
        marginTop: 5
    },
    thirdHeading: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: Colors.DarkBlue,
        margin: 30,
        marginBottom: 5,
        marginTop: 10
    },
    salaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ellipseIconStyle: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        marginLeft: 75,
        marginTop: 10
    },
    ellipseIconRightStyle: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        marginRight: 90,
        marginTop: 10
    },
    salaryTextContainer: {
        // backgroundColor:'red',
        width: Dimensions.get('window').width,
        height: 'auto',
        paddingHorizontal: 35,
        marginTop: 10
    },
    salaryText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.LightGray,
        marginLeft: 70,
        marginTop: 5
    },
    salaryText2: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.LightGray,
        marginRight: 85,
        marginTop: 5
    },
    locationButtonContainer: {
        width: '90%',
        height: 60,
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.InputField,
        borderRadius: 8,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    // cityButton: {
    //     backgroundColor: setSelection ? Colors.White : Colors.LightBlue,
    //     width: '50%',
    //     height: 48,
    //     borderColor: Colors.White
    // },
    // cityButtonText: {
    //     color: isSelected == true && isSelected2==false?Colors.White:Colors.LightGray,
    //     textAlign: 'center',
    //     fontSize: 16
    // },
    // remoteButton: {
    //     backgroundColor: Colors.White,
    //     width: '50%',
    //     height: 48,
    //     borderColor: Colors.White
    // },
    // remoteButtonText: {
    //     color: Colors.LightGray,
    //     textAlign: 'center',
    //     fontSize: 16
    // },
    locationIcon2Style: {
        marginLeft: 30,
        marginTop: 10,
        width: 30.94,
        height: 40.72
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor:'red',
        width:'100%'
    },
    locationTextContainer: {
        marginRight: 'auto',
        marginLeft: 10,
        justifyContent: 'center',
        marginTop: 8,
        // backgroundColor:'red'
    },
    locationText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: Colors.DarkGray,

        justifyContent: "center"
    },
    finishButtonStyle: {
        backgroundColor: Colors.LightBlue,
        width: '90%',
        marginTop: 20,
        height: 44,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    },
    finishButtonTextStyle: {
        color: Colors.White,
        fontFamily: 'Roboto-Bold',
        fontSize: 16,

    },
    salaryButton: {
        color: Colors.LightBlue,
        marginRight: 20,
        justifyContent: 'center',
        fontFamily: 'Roboto-Bold',
        fontSize: 16, marginTop: 20
    },
    // iconStyle:{
    //     flexDirection:'row'
    // }
})