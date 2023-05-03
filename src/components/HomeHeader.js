import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, Alert, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { Colors } from "../utils/Colors";
import CustomInput from "./CustomInput";
import Images from "../assets/Images";
import CustomButton from "./customButton";
import Toast from 'react-native-simple-toast'

import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from "@react-navigation/core";
import { logoutUser } from "../redux/actions/userSession";
import { getProfile } from "../api/methods/auth";



const isFocused = useIsFocused



export default HomeHeader = (props) => {

    const { isSessionExpired } = props

    const dispatch = useDispatch()

    const { currentUser } = useSelector((state) => state.userSession);
    const [searchIconState, setSearchIcon] = useState('')
    const [firName, setFirName] = useState('')
    const [userPhoto, setUserPhoto] = useState(null)
    // const [reduxFirstName, setReduxFirstName] = useState(currentUser?.firstname)
    // const [reduxPhoto, setReduxPhoto] = useState(currentUser?.photo)
    // let reduxUri = reduxPhoto

    const getUserProfile = async () => {
        try {
            const response = await getProfile()
            setFirName(response.data.data.firstname)
            setUserPhoto(response.data.data.photo)
        } catch (error) {
            console.log("User profile API - Error", error?.response?.data?.error?.message)
            if (error?.response?.data?.error?.message == 'Token has been expired.' || error?.response?.data?.error?.message == "Token is required.") {
                Toast.show("Session Expired")
                dispatch(logoutUser())
            }
        }
    }

    // let uri = currentUser?.photo

    useEffect(() => {
        getUserProfile()
    }, [isFocused])

    return (

        <View style={styles.mainContainer}>


            <View style={styles.innerContainer}>
                <View>
                    <Text style={styles.firstText}>
                        {"Hey"} {firName}
                    </Text>

                    <Text style={styles.secondText}>
                        Let's find a job
                    </Text>

                    <Text style={styles.thirdText}>
                        Limited experience no problem
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={{ borderRadius: 50, borderWidth: 1, borderColor: 'black' }}
                        onPress={() => props.onProfile()}
                    >
                        <Image
                            style={{
                                width: 90,
                                height: 90,
                                borderRadius: 50
                            }}
                            // source={uri!=null ? { uri: uri } : reduxUri ? { uri: reduxUri } : Images.avatar}
                            source={userPhoto ? { uri: userPhoto } : Images.avatar}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.filterButtonContainer}>
                <CustomInput
                    mainStyle={styles.searhBarStyle}
                    icon={Images.searchIcon}
                    multiline={true}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    onPress={() => props.onSearchPress()}
                    iconStyle={styles.iconStyle}
                    placeholder={"Search Jobs"}
                    innerStyle={styles.innerStyle}


                />
                <CustomButton
                    style={styles.filterButtonStyle}
                    source={Images.filterIcon}
                    imageStyle={styles.filterImage}
                    onPress={() => props.onPress()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 'auto',
        backgroundColor: Colors.GreenBlue,
        alignSelf: 'center',
        padding: 20,
        // paddingTop: 50
    },
    firstText: {
        fontFamily: 'Roboto-Light',
        color: Colors.White,
        fontSize: 16
    },
    secondText: {
        fontFamily: 'Roboto-Bold',
        color: Colors.White,
        fontSize: 20
    },
    thirdText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.White
    },
    searhBarStyle: {
        width: '80%',
        height: 52,
        alignSelf: 'auto',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10
    },
    innerStyle: {
        marginRight: 'auto',
        width: 200,
        height: 'auto',
        // backgroundColor:'red'
    },
    filterButtonContainer: {
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        margin: 20,
    },
    filterButtonStyle: {
        width: '15%',
        height: 53,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.Yellow,
        borderColor: Colors.Yellow,
        borderRadius: 15,
        marginTop: 10
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    filterImage: {
        width: 44,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        tintColor: Colors.White,
        marginTop: 15
    },
    fileIconStyle: {
        marginLeft: 10
    },
    iconStyle: {
        marginRight: 10,
        marginBottom: 15
    }
})