import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Switch,
    Alert,
    SafeAreaView
} from "react-native";
import Images from "../../assets/Images";
import Header from "../../components/Header";
import { Colors } from "../../utils/Colors";
import { Style } from "./Style";
import { logoutUser } from "../../redux/actions/userSession";
import { useDispatch } from 'react-redux'

const SettingsProfile = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const dispatch = useDispatch()
    return (
        <SafeAreaView style={Style.mainContainer}>
            <Header
                // headerContainer={Style.headerContainer}
                label={"Settings"}
                // headerTextStyle={{
                //     width: '50%',
                //     height: '100%',
                //     textAlign: 'center',
                //     marginTop: 35
                // }}
                source={Images.backIcon}
                // backButtonStyle={{
                //     // backgroundColor:'red',
                //     height: '100%',
                //     alignSelef: 'center',
                //     alignItems: 'center',
                //     justifyContent: 'center',
                iconImageStyle={{ tintColor: Colors.DarkBlue }}
                headerText={{ color: Colors.DarkBlue }}
                // }}
                // iconImageStyle={{
                //     //    marginTop:5
                //     marginRight: 30

                // }}
                onPress={() => navigation.goBack()}
            />
            <View style={Style.listView}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                        alignItems: 'center'
                    }}
                >
                    <Image
                        style={{
                            marginLeft: 20,
                            tintColor: Colors.GreenBlue
                        }}
                        source={Images.marketingPreference}
                    />
                    <Text style={{ marginLeft: 15, color: Colors.DarkGray }}>Marketing Preferences</Text>
                </View>
                {/* <Image
                    style={{ alignSelf: 'center', marginRight: 20 }}
                    source={Images.settingIcon}
                /> */}
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? Colors.GreenBlue : Colors.White}
                    ios_backgroundColor="#3e3e3e"
                    style={{ alignSelf: 'center', marginRight: 20 }}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('AccountSettings')}
            >
                <View style={Style.listViewSecond}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',

                            alignItems: 'center'
                        }}
                    >
                        <Image
                            style={{ marginLeft: 20, tintColor: Colors.GreenBlue }}
                            source={Images.accountSettings}
                        />
                        <Text style={{ marginLeft: 15, color: Colors.DarkGray }}>Account Settings</Text>
                    </View>
                    <Image
                        style={{
                            alignSelf: 'center',
                            marginRight: 20,
                            width: 20,
                            height: 20,
                            resizeMode: 'contain',
                            alignSelf: "center",
                            height: '50%',
                            width: '10%',
                            tintColor: Colors.GreenBlue

                        }
                        }
                        source={Images.forwardArrowIcon}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('ContactUs')}
            // onPress={()=>Alert.alert("hello")}
            >
                <View style={Style.listView}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',

                            alignItems: 'center'
                        }}
                    >
                        <Image
                            style={{ marginLeft: 20, tintColor: Colors.GreenBlue }}
                            source={Images.contactUs}
                        />
                        <Text style={{ marginLeft: 15, color: Colors.DarkGray }}>Contact Us</Text>
                    </View>
                    <Image
                        style={{
                            alignSelf: 'center',
                            marginRight: 20,
                            width: 20,
                            height: 20,
                            resizeMode: 'contain',
                            alignSelf: "center",
                            height: '50%',
                            width: '10%',
                            tintColor: Colors.GreenBlue
                        }
                        }
                        source={Images.forwardArrowIcon}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={Style.listViewSecond}
                onPress={() => navigation.navigate('TermsOfUse')}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                        alignItems: 'center'
                    }}
                >
                    <Image
                        style={{ marginLeft: 20, tintColor: Colors.GreenBlue }}
                        source={Images.termsOfUse}
                    />
                    <Text style={{ marginLeft: 15, color: Colors.DarkGray }}>Terms of Use</Text>
                </View>
                <Image
                    style={{
                        alignSelf: 'center',
                        marginRight: 20,
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                        alignSelf: "center",
                        height: '50%',
                        width: '10%',
                        tintColor: Colors.GreenBlue
                    }
                    }
                    source={Images.forwardArrowIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity style={Style.listView}
                onPress={() => { navigation.navigate('PrivacyPolicy') }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                        alignItems: 'center'
                    }}
                >
                    <Image
                        style={{ marginLeft: 20, tintColor: Colors.GreenBlue }}
                        source={Images.privacyPolicy}
                    />
                    <Text style={{ marginLeft: 15, color: Colors.DarkGray }}>Privacy Policy</Text>
                </View>
                <Image
                    style={{
                        alignSelf: 'center',
                        marginRight: 20,
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                        alignSelf: "center",
                        height: '50%',
                        width: '10%',
                        tintColor: Colors.GreenBlue
                    }
                    }
                    source={Images.forwardArrowIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity style={Style.listViewSecond}
                onPress={() => navigation.navigate('CookiePolicy')}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        style={{ marginLeft: 20, tintColor: Colors.GreenBlue }}
                        source={Images.privacyPolicy}
                    />
                    <Text style={{ marginLeft: 15, color: Colors.DarkGray }}>Cookie Policy</Text>
                </View>
                <Image
                    style={{
                        alignSelf: 'center',
                        marginRight: 20,
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                        alignSelf: "center",
                        height: '50%',
                        width: '10%',
                        tintColor: Colors.GreenBlue
                    }
                    }
                    source={Images.forwardArrowIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => dispatch(logoutUser())}
            >
                <View style={Style.listView}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            style={{ marginLeft: 20, tintColor: Colors.GreenBlue }}
                            source={Images.privacyPolicy}
                        />
                        <Text style={{ marginLeft: 15, color: Colors.DarkGray }}>Logout</Text>
                    </View>
                    <Image
                        style={{
                            alignSelf: 'center',
                            marginRight: 20,
                            width: 20,
                            height: 20,
                            resizeMode: 'contain',
                            alignSelf: "center",
                            height: '50%',
                            width: '10%',
                            tintColor: Colors.GreenBlue
                        }
                        }
                        source={Images.forwardArrowIcon}
                    />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default SettingsProfile;