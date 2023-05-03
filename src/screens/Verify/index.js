import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert, SafeAreaView, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux"
import Toast from 'react-native-simple-toast';


import { Colors } from "../../utils/Colors";
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/CustomInput";
import { Style } from "./Style";
import OTPInput from "../../components/OTPInput";
import Header from "../../components/Header";
import images from "../../assets/Images";
import Loader from './../../components/Loader';
import { verifyAPI } from "../../api/methods/auth";
import { resendOTPCodeAPI } from "../../api/methods/auth";
import { signupResponse } from '../../redux/actions/userSession';

export default Verify = ({ navigation, route }) => {

    const dispatch = useDispatch()

    const isFromSignUp = route.params?.isFromSignUp == true || ''

    const [loading, setLoading] = useState(false)
    const [disableResendBtn, setResendBtnDisable] = useState(true)
    const [timerCount, setTimer] = useState(60);
    const [otp, setOTP] = useState('')
    const { email } = route.params;
    useEffect(() => {

        timerFunc()
    }, [navigation]);
    const timerFunc = () => {
        setResendBtnDisable(true)
        setTimer(60);
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete

        return () => {
            clearInterval(interval)
        }
    };

    const { isSignedIn } = useSelector((state) => state.userSession)

    const onSendPress = async () => {
        console.log("currentUser", isSignedIn)
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('email', email)
            formData.append('otp', otp)
            console.log('fdgdrgd', otp)
            console.log("DATA: ", formData)
            const response = await verifyAPI(formData)
            setLoading(false)
            console.log('Verification-Respone:', response.status)
            console.log('Verification-Respone:', response.data)
            if (response.status == 200) {
                if (isFromSignUp) dispatch(signupResponse({
                    userData: { email: email },
                    token: response.data.access_token
                }))
                else navigation.navigate('ResetPassword', { email: email, otp: otp })

                // Toast.show("Sign up successful")
            }

        } catch (error) {
            console.log("verification-error", error?.response?.data?.error?.message)
            // Toast.show("Invalid OTP")
            setLoading(false)
        }
    }
    const onResend = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('email', email)
            const response = await resendOTPCodeAPI(formData)
            setLoading(false)
            console.log('Response-status:', response.status)
            console.log('Response:', response.data)
            if (response.status == 200) {
                Toast.show("New OTP Sent to your email")
                timerFunc()
            }
        } catch (error) {
            console.log("Error", error)
            setLoading(false)
            Toast.show("Error sending OTP", error)
        }
    }
    return (
        <SafeAreaView style={Style.mainContainer}>
            {/* {console.log(email)} */}
            <Header
                // headerContainer={Style.headerContainer}
                label={"Verify Code"}
                // headerTextStyle={Style.headerTextStyle}
                source={Images.backIcon}
                onPress={() => navigation.goBack()}
                // backButtonStyle={Style.backButtonStyle}
                iconImageStyle={{ tintColor: Colors.DarkBlue }}
                headerText={{ color: Colors.DarkBlue }} />
            <View style={Style.textContainer}>
                <Text style={Style.innerText}>Check your email address, we have sent you the code at
                    <Text style={{ color: '#00B3EC', fontSize: 16, fontFamily: 'Roboto-Medium' }}> {email}</Text>
                </Text>
            </View>
            <View style={Style.codeContainer}>
                <OTPInput
                    onComplete={(code) => {
                        //  alert(code)
                        console.log('code', typeof (code))
                        setOTP(code)
                        Keyboard.dismiss()
                    }}

                />
            </View>
            <View style={Style.resendTextContainer}>
                <Text style={Style.reciveCodeText}>Didn’t receive the code?</Text>

                <TouchableOpacity
                    disabled={timerCount <= 0 ? false : true}
                    onPress={() => onResend()}
                >
                    <Text style={[Style.ResendString, { color: timerCount > 0 ? Colors.LightGray : Colors.LightBlue }]}>Resend</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: 20, }}>
                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, color: Colors.DarkGray }}>(00:{timerCount})</Text>
            </View>
            <CustomButton
                label={"Send"}
                style={Style.sendButton}
                textStyle={Style.buttonTextStyle}
                onPress={() => onSendPress()}
            />
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}