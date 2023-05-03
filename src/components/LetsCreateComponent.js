import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import { Colors } from "../utils/Colors";
import CreateProfileHeader from "./CreateProfileHeader";
import CustomInput from "./CustomInput";
import CustomButton from "./customButton";
import CountryInput from "./CountryInput";
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-simple-toast';
import { getcountryListAPI } from "../api/methods/auth";
import DatePicker from 'react-native-date-picker';
import { TextInput } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/native';
import moment from "moment";
import Images from "../assets/Images";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CountryPicker from "./CountryPicker";
import { Select } from "native-base";
import { forEach } from "lodash";

// import AsyncStorage from '@react-native-community/async-storage'


// const STORAGE_KEY = '@save_age'

const options = {
    opacity: 0.3,
    mediaType: 'photo',
    videoQuality: 'low',
    quality: 1,

}

export default LetsCreateComponent = (props) => {

    const { data } = props

    const isFocused = useIsFocused()

    // const [changeText, setChangeText] = useState('')
    const [name, setName] = useState(data.firstname)
    const [lastName, setLastName] = useState(data.lastname)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setStatee] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState(new Date())
    const [resHeadline, setResHeadline] = useState('')
    const [profilePhoto, setProfilePhoto] = useState(data.photo)
    // const [dateOfBirth, setDateOfBirth] = useState ('')

    const [country, setCountry] = useState([]);

    const [countryName, setCountryName] = useState(null)
    const [countryCode, setCountryCode] = useState(null)
    const [open, setOpen] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [countryId, setCountryId] = useState('')
    const [show, setShow] = useState(false)
    const [defaultCountry, setDefaultCountry] = useState('')

    useEffect(() => {
        if (isFocused) {
            setShow(false)
            setModalVisible(false)
            getCountry()
            // console.log("Date>>>>>>>>>>>>>>>>>===", date)
        }
    }, [isFocused])
    const getCountry = async () => {
        let tempArray = []
        try {
            const response = await getcountryListAPI()
            if (response?.status === 200) {
                response?.data?.data?.countries?.forEach(element => {
                    if (element?.id === 230) {
                        console.log("item==>>", element);
                        setDefaultCountry(element?.name)
                    }
                    else {
                        return null
                    }
                });
                setCountry(response.data.data.countries)
            }
            // console.log("Contry===========>>>>>", country)
        } catch (error) {
            console.log("Country Errror", error)
        }
    }

    const showCamera = () => {
        launchCamera(options, callBack);
        // setModalVisible(false)

    }
    const showLibrary = () => {
        launchImageLibrary(options, callBack)
        // setModalVisible(false)

    }

    const callBack = response => {
        if (response.didCancel) {
            console.log("User Cancelled Image Picker")
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else {
            setModalVisible(false)
            const imgSource = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type
            }
            setProfilePhoto(imgSource)
        }
    }
    //       // read data
    //   const readData = async () => {
    //     try {
    //       const name = await AsyncStorage.getItem(STORAGE_KEY)
    //       const lastName = await AsyncStorage.getItem(STORAGE_KEY)
    //       const address = await AsyncStorage.getItem(STORAGE_KEY)
    //       const city = await AsyncStorage.getItem(STORAGE_KEY)
    //       const state = await AsyncStorage.getItem(STORAGE_KEY)
    //       const country = await AsyncStorage.getItem(STORAGE_KEY)
    //       const zipCode = await AsyncStorage.getItem(STORAGE_KEY)
    //       const phone = await AsyncStorage.getItem(STORAGE_KEY)
    //       const dateOfBirth = await AsyncStorage.getItem(STORAGE_KEY)
    //       const resHeadline = await AsyncStorage.getItem(STORAGE_KEY)

    //       if (name !== null) {
    //         setName(name)
    //       }
    //       if (lastName !== null) {
    //         setlastName(lastName)
    //       }
    //       if (address !== null) {
    //         setAddress(address)
    //       }
    //       if (city !== null) {
    //         setCity(city)
    //       }
    //       if (state !== null) {
    //         setStatee(name)
    //       }
    //       if (country !== null) {
    //         setCountry(country)
    //       }
    //       if (zipCode !== null) {
    //         setZipCode(zipCode)
    //       }
    //       if (phone !== null) {
    //         setPhone(phone)
    //       }
    //       if (dateOfBirth!== null) {
    //         setDateOfBirth(dateOfBirth)
    //       }
    //       if (resHeadline!== null) {
    //         setResHeadline(resHeadline)
    //       }
    //     } catch (e) {
    //       alert('Failed to fetch the data from storage')
    //     }
    //   }

    //   // save data

    //   const saveData = async () => {
    //     try {
    //       await AsyncStorage.setItem(STORAGE_KEY, name)
    //       setAge(name)
    //       alert('Data successfully saved')
    //     } catch (e) {
    //       alert('Failed to save the data to the storage')
    //     }
    //   }

    return (
        <KeyboardAwareScrollView
            // style={{ flexGrow: 1 }}
            // contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}>
            <View
                style={{
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: 'black',
                    marginBottom: 20,
                    // backgroundColor:'red',
                    alignSelf: 'center',
                    // alignItems:'center',
                    // justifyContent:'center'
                }}
            >
                <Image
                    style={{
                        width: 90,
                        height: 90,
                        borderRadius: 50,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    // source={profilePhoto}
                    source={profilePhoto == '' ? Images.avatar : profilePhoto?.uri ? profilePhoto : { uri: profilePhoto }}
                />
                <TouchableOpacity
                    style={{
                        marginTop: 80,
                        height: 44,
                        width: 44,
                        // backgroundColor:'red', 
                        position: 'absolute',
                        alignSelf: 'center'
                    }}
                    onPress={() => {
                        setModalVisible(true)
                    }
                    }
                >
                    <Image
                        style={styles.uploadButtonPhotoStyle}
                        source={Images.uploadButtonIcon}
                    />
                </TouchableOpacity>
            </View>
            <CreateProfileHeader
                headerStyle={styles.headerStyle}
                heading={"Let's create your profile"}
                paragraph={"Add more information to your profile. "}
            />

            <View style={styles.innerContainer}>
                <CustomInput
                    placeholder={"Enter your first name"}
                    multiline={true}
                    mainStyle={{ backgroundColor: Colors.InputField, padding: 5, }}
                    innerStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: 'black', width: '100%' }}
                    value={name}
                    // editable={name!=null?false:true}
                    onChangeText={setName}

                />
                <CustomInput
                    placeholder={"Enter your last name"}
                    multiline={true}
                    innerStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: 'black' }}
                    mainStyle={{ backgroundColor: Colors.InputField, padding: 5, }}
                    value={lastName}
                    // editable={lastNx ame!=null?false:true}
                    onChangeText={(text) => setLastName(text)}

                />
                <CustomInput
                    placeholder={"Your address".trim()}
                    innerStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: 'black' }}
                    mainStyle={{ backgroundColor: Colors.InputField, paddingLeft: 5, }}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                <CustomInput
                    placeholder={"Your city".trim()}
                    innerStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: 'black' }}
                    mainStyle={{ backgroundColor: Colors.InputField, paddingLeft: 5, }}
                    value={city}
                    onChangeText={(text) => setCity(text)}

                />
                <CustomInput
                    placeholder={"Your state".trim()}
                    innerStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: 'black' }}
                    mainStyle={{ backgroundColor: Colors.InputField, paddingLeft: 5, }}
                    value={state}
                    onChangeText={(text) => setStatee(text)}

                />
                {/* <CustomInput
                    placeholder={"Your country".trim()}
                    innerStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: 'black' }}
                    mainStyle={{ backgroundColor: Colors.InputField }}
                    value={country}
                    onChangeText={(text) => setCountry(text)}
                /> */}
                {/* <CountryInput/> */}

                {/* Country Picker */}
                {/* <View style={[styles.inputContainerStyle, props.mainStyle]}>
                    <Select
                        height={'50'}
                        selectedValue={countryName}
                        placeholder={"Country"}
                        onValueChange={value => setCountryName(value)}
                    >
                        {country.map(item => {
                            return (
                                <Select.Item label={item.name} value={item.id}
                                // key={index}
                                />
                                // console.log("dsadsa===============>>>>", item.id)
                            )
                        })}

                    </Select>
                </View> */}

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%'
                }}>
                    <View
                        style={{
                            width: "100%",
                            height: 55,
                            alignSelf: 'center',
                            marginTop: 8,
                            backgroundColor: Colors.InputField,
                            borderWidth: 1,
                            borderRadius: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            borderColor: '#F5F6FA'
                            // borderColor: 'black'
                        }}
                    >
                        <Text style={{
                            // marginTop: 10, 
                            marginLeft: 15,
                            color: Colors.DarkGray,
                            alignSelf: 'center'
                        }}>{countryCode?.name || defaultCountry}</Text>
                        <TouchableOpacity
                            onPress={() => setShow(true)}
                            style={{
                                width: 25,
                                height: 25,
                                marginLeft: "auto",
                                marginRight: 10,
                                alignItems: 'center',
                                alignSelf: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: Colors.DarkGray,
                                    // marginTop:10,
                                    // marginRight: 50,
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                source={Images.pickerIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>


                <CustomInput
                    keyboardType={'numeric'}
                    placeholder={"Your zip code".trim()}
                    innerStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: 'black' }}
                    mainStyle={{ backgroundColor: Colors.InputField, paddingLeft: 10, }}
                    value={zipCode}
                    onChangeText={(text) => setZipCode(text)}

                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%'
                }}>
                    <View
                        style={{
                            width: 120,
                            height: 55,
                            alignSelf: 'center',
                            marginTop: 8,
                            backgroundColor: Colors.InputField,
                            borderWidth: 1,
                            borderRadius: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            borderColor: '#F5F6FA'
                            // borderColor: 'black'
                        }}
                    >
                        <Text style={{
                            // marginTop: 10, 
                            marginLeft: 15,
                            color: Colors.DarkGray,
                            alignSelf: 'center'
                        }}>{countryCode?.code}</Text>
                        <TouchableOpacity
                            onPress={() => setShow(true)}
                            style={{
                                width: 25,
                                height: 25,
                                marginRight: 10,
                                alignItems: 'center',
                                alignSelf: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: Colors.DarkGray,
                                    // marginTop:10,
                                    // marginRight: 50,
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                source={Images.pickerIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <CustomInput
                        placeholder={"Your phone".trim()}
                        innerStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: 'black' }}
                        mainStyle={{ backgroundColor: Colors.InputField, width: '65%', paddingLeft: 10 }}
                        value={phone}
                        maxLength={11}
                        keyboardType={'numeric'}
                        onChangeText={(text) => setPhone(text)}
                    />
                </View>

                <View
                    style={{
                        width: '90%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: '#F5F6FA',
                        alignSelf: 'center',
                        backgroundColor: '#F5F6FA',
                        width: '90%',
                        height: 55,
                        marginTop: 10,
                    }}
                >
                    <Text
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 15,
                            marginLeft: 5
                        }}
                    > {moment(date).format('YYYY-MM-DD')}
                    </Text>

                    <CustomButton
                        style={{
                            backgroundColor: Colors.InputField,
                            borderColor: Colors.InputField,
                            width: '10%',
                        }}
                        source={require('../assets/Images/pickerIcon.png')}
                        imageStyle={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 15, width: 10, height: 10 }}
                        onPress={() => setOpen(true)}
                    />
                    <DatePicker
                        // style={{width:'100%'}} 
                        modal
                        open={open}
                        date={date}
                        mode='date'
                        placeholder="select date"
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)

                            console.log("Date==>", date)

                        }}
                        onCancel={() => {
                            setOpen(false)
                        }} />
                </View>

                <CustomInput
                    placeholder={"Your resume headline".trim()}
                    value={resHeadline}
                    onChangeText={(text) => setResHeadline(text)}
                    multiline={true}
                    maxLength={150}
                    innerStyle={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: 16,
                        color: 'black',
                        height: 100,
                        textAlignVertical: 'top',
                        backgroundColor: Colors.InputField,
                    }}
                    mainStyle={{ backgroundColor: Colors.InputField, height: 100, padding: 5 }}

                />

            </View>
            <CustomButton
                label={"Next"}
                onPress={() => {
                    // props.data = {resume: },
                    props.onNext({
                        firstname: name,
                        lastname: lastName,
                        date_of_birth: moment(date).format('YYYY-MM-DD'),
                        address_line1: address,
                        city: city,
                        state: state,
                        country_id: country,
                        zipcode: zipCode,
                        phone: `${countryCode?.code}` + `${phone}`,
                        resume_headline: resHeadline,
                        country_id: countryCode?.id,
                        photo: profilePhoto

                    })
                }}
                style={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
            />
            <View style={{ flex: 1, height: 100 }} />
            <CustomModal isVisible={modalVisible}
                onCancel={() => (setModalVisible(false))}
                LibraryPress={() => {
                    showLibrary();
                    // setModalVisible(false)
                }}

                openCamera={() => {
                    showCamera()
                    // setModalVisible(false)
                }}
            />
            <CountryPicker
                isVisible={show}
                onPress={() => setShow(false)}
                data={country}
                onCountryPress={(itemDetails) => {
                    setShow(false)
                    setCountryCode(itemDetails)
                    console.log("itemm==>>", itemDetails)
                }}
            />
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        backgroundColor: Colors.White,
    },
    headerStyle: {
        marginTop: 5,
        height: 150,
        marginBottom: 0,
        width: '93%',
        // backgroundColor:'red'
    },
    innerContainer: {
        width: "100%",
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 40,
        marginTop: 0,

    },
    buttonStyle: {
        backgroundColor: Colors.LightBlue,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',
        height: 44,
        marginTop: 10
    },
    buttonTextStyle: {
        color: Colors.White,
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        textAlign: 'center'
    },
    inputContainerStyle: {

        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#F5F6FA',
        alignSelf: 'center',
        backgroundColor: Colors.InputField,
        width: '90%',
        height: 55,
        marginTop: 10,
        // flexDirection:'row',
        // justifyContent:'space-between'
    },
    textInput: {
        // backgroundColor: '#F5F6FA',
        // backgroundColor:'red',
        width: '50%',
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        // marginLeft: 10,
        borderRadius: 8,
        height: 55,
        // justifyContent:'center'
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    fileIconStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    uploadButtonPhotoStyle: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor:'red',
        // marginBottom:20,
        // marginTop:10
    },
})