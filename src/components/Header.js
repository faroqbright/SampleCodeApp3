import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, Dimensions } from "react-native";
import Images from "../assets/Images";
import { Colors } from "../utils/Colors";

const Header = (props) => {
    return (
        <View style={[styles.mainContainer, props.headerContainer]}>
            <TouchableOpacity style={[styles.backButton, props.backButtonStyle]}
                onPress={props.onPress}
            >
                <Image
                    style={[styles.backIconImage, props.iconImageStyle]}
                    source={Images.backIcon}
                />
            </TouchableOpacity>
            <View style={[styles.headingContainer,props.headerTextStyle]}>
                <Text style={[styles.headerText, props.headerText]}>
                    {props.label}
                </Text>
            </View>
            {props?.settingIconSource?<TouchableOpacity style={[styles.settingIconButton, props.settingButtonStyle]}
                onPress={props.settingIconPress}
            >
                <Image
                    style={[styles.settingIconImage, props.settingIconImageStyle]}
                    source={props.settingIconSource}
                />
            </TouchableOpacity>:null}
        </View>
    )

}
export default Header

const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width,
        height: 60,
    },
    headerText: {
        alignSelf: 'center',
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        textAlign: 'center',
        color: Colors.DarkBlue
    },
    backButton: {
        // ...StyleSheet.absoluteFill,
        left: 10,
        justifyContent: "center",
        // zIndex: 98
        position:'absolute',
        width:50,
        height:48,
        zIndex:1,
        paddingLeft:5,
        // top:10
    },
    backIconImage: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        tintColor:Colors.DarkBlue
    },
    settingIconButton: {
        position: "absolute",
        width: 50,
        height: 48,
        top:10,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingIconImage: {
        resizeMode: 'contain',
        width: 20
    },
    headingContainer: {
        justifyContent: "center",
        // height: '100%',
        width: "100%",
        marginTop:10
    }

})