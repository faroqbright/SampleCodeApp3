import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, Alert, TouchableOpacity, ScrollView, ActivityIndicator, ToastAndroid, Platform } from 'react-native';

import { useDispatch } from 'react-redux'
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';

import Images from "../../assets/Images";
import CustomButton from '../../components/customButton';
import CustomInput from '../../components/CustomInput';
import { Style } from './Style';
import { signUpAPI, socialLogin } from '../../api/methods/auth';
import Loader from './../../components/Loader';
import { signupResponse, signInRespone } from '../../redux/actions/userSession';
import { Colors } from '../../utils/Colors';

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {
    LoginManager,
    AccessToken,
    Profile,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk-next';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import jwt_decode from "jwt-decode";


import auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';

export default SignUp = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const [hidePassword, setHidePassword] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(true)
    const [loading, setLoading] = useState(false)

    const [apiPassword, setApiPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [userInfo, setuserInfo] = useState([]);
    const [faceBookInfo, setFaceBookInfo] = useState([])
    const [appleInfoEmail, setAppleInfoEmail] = useState('')

    useEffect(() => {
        GoogleSignin.configure({
            iosClientId: "185261002481-59i7r9hs13mv0dq5hmudl4ejb59re62i.apps.googleusercontent.com",
            webClientId: Platform.OS === 'ios' ? '185261002481-59i7r9hs13mv0dq5hmudl4ejb59re62i.apps.googleusercontent.com' : '185261002481-867la0smk8602v4i1g40l64tmivjtn4m.apps.googleusercontent.com',
            // androidClientId: '185261002481-7ljaovvdjp1c1m7hll6mdmaalvgvnq8o.apps.googleusercontent.com',
            offlineAccess: false,
        });
    }, [])

    let screenName = 'SignUp';


    const onSigupPress = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('email', email)
            formData.append('role', 'employee')
            formData.append('password', apiPassword)
            formData.append('password_confirmation', confirmPassword)
            const response = await signUpAPI(formData)
            setLoading(false)
            if (response.status == 200) {
                navigation.navigate('Verify', { email: email, screenName: screenName, isFromSignUp: true })
            }
        } catch (error) {
            Toast.show(error?.response?.data?.error?.message)
            setLoading(false)
        }
    }

    const inputcheck = async () => {
        if (email === "") {
            alert("Email is required");
        }
        else if ((/^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/).test(email.trim()) == false) {
            alert('Email format is invalid')
        }
        else if (apiPassword === "") {
            alert("Enter Password");
        }
        else if (apiPassword.length < 8) {
            alert("Format is not correct")
        }
        else if (apiPassword != confirmPassword) {
            alert("Password mismatch")
        }
        else {
            onSigupPress()
        }
    };

    const googleLogin = async () => {
        try {
            setLoading(true)
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setuserInfo(userInfo)
            googleLoginApi(userInfo)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
            }
        }
    };

    const googleLoginApi = async (_userInfo) => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('email', _userInfo?.user?.email)
            formData.append('role', 'employee')
            formData.append('social_type', 'google')
            formData.append('social_app_id', _userInfo?.user?.id)
            const response = await socialLogin(formData)
            setLoading(false)
            if (response.status == 200 && response.data.is_new_user === false) {
                Toast.show("This user already exists!")
                navigation.navigate('SignIn')
            }
            else {
                dispatch(signInRespone({
                    isFromSignUp: true,
                    token: response.data.access_token,
                    userData: {
                        ...response.data.data,
                        photo: _userInfo.user.photo,
                        lastname: _userInfo.user.familyName,
                        firstname: _userInfo.user.givenName,
                    },
                },
                ))
            }
        } catch (error) {
            setLoading(false)
        }
    }

    const onFacebookButtonPress = async () => {
        let result;
        try {
            if (Platform.OS === 'ios') {
                result = await LoginManager.logInWithPermissions([
                    'email',
                    'public_profile',
                ]);
            } else {
                result = await LoginManager.logInWithPermissions([
                    'email',
                    'public_profile',
                ]);
            }

            if (result.isCancelled) {
            } else {
                FBGraphRequest(
                    'id,email,name,first_name,last_name,picture',
                    FBLoginCallback,
                );
            }
        } catch (e) {
            alert('Login error: ' + e);
        }
    }

    const FBGraphRequest = async (fields, callback) => {
        const accessData = await AccessToken.getCurrentAccessToken();
        const infoRequest = new GraphRequest('/me', {
            accessToken: accessData.accessToken,
            parameters: {
                fields: {
                    string: fields,
                },
            },
        }, callback);
        new GraphRequestManager().addRequest(infoRequest).start();
    };

    const FBLoginCallback = async (error, result) => {
        if (error) {
            alert(JSON.stringify(error));
        } else {
            const currentProfile = JSON.stringify(result)
            setFaceBookInfo(result)
            facebookLoginApi(result)
        }
    };

    const facebookLoginApi = async (_currentProfile) => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('email', _currentProfile.email)
            formData.append('role', 'employee')
            formData.append('social_type', 'facebook')
            formData.append('social_app_id', _currentProfile.id)
            const response = await socialLogin(formData)
            setLoading(false)
            if (response.status == 200 && response.data.is_new_user === false) {
                navigation.navigate('SignIn')
            }
            else {
                dispatch(signInRespone({
                    isFromSignUp: true,
                    token: response.data.access_token,
                    userData: {
                        ...response.data.data,
                        photo: _currentProfile.picture.data.url,
                        lastname: _currentProfile.last_name,
                        firstname: _currentProfile.first_name,
                    },
                },
                ))
            }
        } catch (error) {
            setLoading(false)
        }
    }

    const appleLogin = async () => {
        try {
            setLoading(true)
            const userAppleInfo = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });
            const userAppleEmail = await jwt_decode(userAppleInfo.identityToken);
            appleLoginApi(userAppleInfo, userAppleEmail)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const appleLoginApi = async (_userInfo, _userEmail) => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('email', _userEmail.email)
            formData.append('role', 'employee')
            formData.append('social_type', 'apple')
            formData.append('social_app_id', _userInfo.user)
            const response = await socialLogin(formData)
            setLoading(false)
            if (response.status == 200 && response.data.is_new_user === false) {
                Toast.show("This user already exists!")
                navigation.navigate('SignIn')
            }
            else {
                dispatch(signInRespone({
                    isFromSignUp: true,
                    token: response.data.access_token,
                    userData: {
                        ...response.data.data,
                        firstname: _userInfo.fullName.givenName,
                        lastname: _userInfo.fullName.familyName,
                    },
                },
                ))
            }
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <View style={Style.mainContainer}>
            <View style={Style.headerContainer}>
                <ImageBackground
                    style={Style.imageHeader}
                    source={Images.ImageHeader}
                >
                    <Image
                        style={Style.logoHeader}
                        source={Images.SplashHeading}
                    />
                </ImageBackground>
            </View>
            <View style={Style.signInHeading}>
                <Text style={Style.signInText}>Sign Up</Text>
            </View>

            <KeyboardAwareScrollView
                style={{ flexGrow: 1, width: Dimensions.get('window').width }}
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}>
                <CustomInput
                    placeholder={"Enter email or phone number"}
                    value={email}
                    textContentType={'emailAddress'}
                    autoCompleteType={'email'}
                    keyboardType={"email-address"}
                    autoCapitalize={"none"}
                    onChangeText={text => setEmail(text)}
                    innerStyle={{ width: '100%' }}
                    maxLength={100}
                    placeholderTextColor={Colors.LightGray}
                />
                <CustomInput
                    secureTextEntry={hidePassword}
                    placeholder={"Enter Password"}
                    value={apiPassword}
                    onChangeText={text => setApiPassword(text)}
                    innerStyle={{ width: '80%' }}
                    maxLength={20}
                    icon={
                        hidePassword ? Images.invisibleIcon : Images.eyeIcon
                    }
                    onPress={() => {
                        setHidePassword(!hidePassword)
                    }}
                    iconStyle={{ marginRight: 20, height: 20, width: 20, marginBottom: 20, tintColor: Colors.DarkGray }}
                    mainStyle={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                />
                <CustomInput
                    secureTextEntry={password}
                    placeholder={"Enter Confirm Password"}
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    innerStyle={{ width: '80%' }}
                    maxLength={20}
                    icon={
                        password ? Images.invisibleIcon : Images.eyeIcon
                    }
                    onPress={() => {
                        setPassword(!password)
                    }}
                    iconStyle={{ marginRight: 20, height: 20, width: 20, marginBottom: 20, tintColor: Colors.DarkGray }}
                    mainStyle={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                />
                <View style={{ width: '100%' }}>
                    <CustomButton
                        label={'Sign Up'}
                        style={{ backgroundColor: '#00B3EC', width: '90%', height: 44, marginTop: 15 }}
                        onPress={() => inputcheck()}
                        textStyle={{ color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Bold' }}
                    />
                </View>
                <View style={{ width: '100%', height: 20, margin: 5, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#CBC9D9', fontSize: 15, fontFamily: 'Roboto-Regular' }}>----- Or -----</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center' }}>
                    <CustomButton
                        source={Images.facebookLogo}
                        imageStyle={{ justifyContent: 'center', position: 'absolute', margin: 5, }}
                        label={'Facebook'}
                        style={{ backgroundColor: '#3C5A99', width: '48%', alignSelf: 'center', height: 44, borderColor: '#3C5A99', }}
                        onPress={() => onFacebookButtonPress()}
                        textStyle={{ color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Bold' }}
                    />
                    <CustomButton
                        label={'Google'}
                        source={Images.googlePlusLogo}
                        imageStyle={{ justifyContent: 'center', position: 'absolute', margin: 15 }}
                        style={{ backgroundColor: '#F95341', width: '48%', alignSelf: 'center', height: 44, borderColor: '#F95341', }}
                        onPress={() => googleLogin()}
                        textStyle={{ color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Bold' }}
                    />
                </View>
                {Platform.OS == 'ios' && <View style={{ marginTop: 20, width: '90%', alignSelf: 'center', }}>
                    <CustomButton
                        label={'Sign up with apple'}
                        source={Images.appleLogo}
                        imageStyle={{ justifyContent: 'center', position: 'absolute', margin: 15, width: 30, height: 30, tintColor: Colors.White }}
                        style={{ backgroundColor: 'black', width: '100%', alignSelf: 'center', height: 44, borderColor: 'black', }}
                        onPress={() => appleLogin()}
                        textStyle={{ color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Bold' }}
                    />

                </View>}
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignSelf: 'center', margin: 10, }}>
                    <Text style={{ color: '#7B7890', fontFamily: 'Roboto-Regular', fontSize: 14, margin: 5 }}>Already have account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignIn')}
                    >
                        <Text style={{ color: '#F1C60F', fontFamily: 'Roboto-Bold', fontSize: 14, margin: 5 }}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </View>
    )
}
