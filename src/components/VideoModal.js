import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Pressable, } from "react-native";
import Video from 'react-native-video';
import { Colors } from "../utils/Colors";
import CustomButton from "./customButton";
import Loader from "./Loader";

const VideoModal = (props) => {
    const [loading, setLoading] = useState(true)
    const {
        isVisible,
        source,
        onClose,
        loader
    } = props

    const onBuffer = (data) => {
        setLoading(true)
        console.log("Error =>>>>>>>>>>>>>>>>", data)
    }
    if (!isVisible) return null
    else return (
        <Pressable
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#00000050',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius:10,
                borderWidth:1,
                borderColor:Colors.LightBlue
            }}
            onPress={() => {
                onClose()
            }}>
            <Pressable style={[styles.mainContainer, props.mainContainer]}>
                <Video
                    resizeMode={'cover'}
                    source={source}
                    controls={true}
                    // onBuffer={false}
                    onLoadStart={() => {
                        setLoading(true)
                    }}
                    onLoad={() => {
                        setLoading(false)
                    }}
                    style={styles.videoContainer}
                />
            </Pressable>
            <Loader loading={loading} isShowIndicator={true} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        // backgroundColor: Colors.White,
        backgroundColor: Colors.White,
        width: '80%',
        height: 500,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: Colors.LightBlue,
        width: '60%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 5,
        marginTop: 'auto'
    },
    buttonText: {
        color: Colors.White,
        textAlign: 'center'
    },
    videoContainer: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default VideoModal