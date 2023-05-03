import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, SafeAreaView } from "react-native";
import { color } from "react-native-reanimated";
import Toast from 'react-native-simple-toast';
import Images from "../../assets/Images";
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/CustomInput";
import { Colors } from "../../utils/Colors";
import { Style } from "./Style";
import Header from "../../components/Header";
import Loader from './../../components/Loader'
import { resetPasswordAPI } from "../../api/methods/auth";


export default ResetPassword = ({ navigation, route }) => {
    const { email, otp } = route.params;

    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    
    const onSend = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('password', password)
            formData.append('otp_number', otp)
            const response = await resetPasswordAPI(formData)
            console.log("reset password response status===>>",response?.status);
            console.log("reset password response===>>",response?.data);
            setLoading(false)
            if (response.status == 200) {
                navigation.navigate('SignIn')
                Toast.show("Password updated")
            }
        } catch (error) {
            setLoading(false)
        }
    }
    return (
        <SafeAreaView style={Style.mainContainer}>
            <Header
                label={"Reset Password"}
                source={Images.backIcon}
                onPress={() => navigation.navigate('ForgotPassword')}
            />
            <View style={Style.textContainer}>
                <Text style={Style.innerText}>Enter your new password
                    {/* <Text style={{color:'#00B3EC', fontSize:16, fontFamily:'Roboto-Medium'}}> your email address or phone number </Text>to reset your password */}
                </Text>
            </View>
            <CustomInput
                mainStyle={{
                    fontSize: 16,
                    width: '90%',
                }}
                innerStyle={Style.resetInput}
                placeholder={"Enter new password"}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={{ width: '100%', height: 80, alignSelf: 'center', justifyContent: 'center', position: 'relative', marginTop: 'auto', marginBottom: 30 }}>

                <CustomButton
                    label={"Send"}
                    onPress={() => onSend()}
                    style={{
                        backgroundColor: email.length > 0 ? Colors.LightBlue : '#F2F2F3',
                        borderColor: '#F2F2F3',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%',
                        height: 44
                    }}
                    textStyle={{ color: email.length > 0 ? Colors.White : '#CBC9D9', fontSize: 16, fontFamily: 'Roboto-Bold' }}
                />
            </View>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

