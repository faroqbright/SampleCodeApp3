import React, { useEffect } from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import userSession from '../../redux/reducers/userSession';
import Images from "../../assets/Images";
import { useSelector } from "react-redux";
// LogBox.ignoreLogs(['Warning: ...']);

const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('AfterSplash')
        }, 3000);
    }, [])


    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <ImageBackground
                    style={styles.imageContainer}
                    source={Images.Splash}
                >
                    <Image
                        style={styles.headingImage}
                        source={Images.SplashHeading}
                    />
                </ImageBackground>
            </View>

        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: '100%'
    },
    backGroundImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    headingImage: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        margin: '80%',
        width: 198.46,
        height: 56.77
    }
})