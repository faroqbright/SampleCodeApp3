import React, { useState } from "react";
import { View, StyleSheet, Alert, Modal, Image, Dimensions } from "react-native";
import CreateProfileHeader from "./CreateProfileHeader";
import CustomButton from "./customButton"
import { Colors } from "../utils/Colors";
import CustomModal from "./CustomModal";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import RNFC from 'react-native-fs';
import Images from '../assets/Images'
const options = {
    opacity: 0.3,
    mediaType: 'photo',
    videoQuality: 'low',
    quality: 0.1,
}

export default PhotoComponent = (props) => {
    const { onNext } = props
    const [modalVisible, setModalVisible] = useState(false);
    const [photo, setPhoto] = useState(null)

    const showCamera = () => {
        launchCamera(options, callback);

    }
    const showLibrary = () => {
        launchImageLibrary(options, callback)
    }

    const callback = async response => {
        console.log('my response=====>', response)
        if (response.didCancel) {
            console.log("User Cancelled Image Picker")
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else {
            const source = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
            };
            setPhoto(source)
            console.log("Source===>>>",source)
        }
    }


    return (
        <View style={styles.mainContainer}>
            <CreateProfileHeader
                heading={"Upload Photo"}
                paragraph={"Upload Your Photo which represents your profile."}
                headerStyle={styles.headerStyle}
            />

            <View style={styles.videoContainer}>
                {photo == null && (<Image
                    style={styles.placeHolderImage}
                    source={Images.companyImagePlaceHolder}

                />)}

                {photo != null && (<Image
                    // resizeMode={"contain"}
                    style={{
                        height: 300,
                        borderWidth:1,
                        borderRadius:360,
                        borderColor:'black',
                        width: 300,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        // marginLeft:110,
                        // aspectRatio: 100/50,
                    }}
                    source={{uri:photo.uri}}
                />)}
            </View>

            <CustomModal isVisible={modalVisible}
                onCancel={() => (setModalVisible(false))}
                LibraryPress={() => {
                    showLibrary();
                    setModalVisible(false)
                }}

                openCamera={() => {
                    showCamera()
                    setModalVisible(false)
                }}
            />
            <CustomButton
                label={photo == null ? "Upload Photo" : "Next"}
                onPress={() => {
                    if (photo == null) {
                        setModalVisible(true)
                    } else {
                        if (onNext && typeof onNext === 'function') {
                            onNext({ photo: photo })
                        }
                    }
                }} style={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.White
    },

    headerStyle: {
        width: '93%',
        marginTop: 15,
        // backgroundColor:'red'
    },

    buttonStyle: {
        backgroundColor: Colors.LightBlue,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',
        height: 44,
        // marginTop:'auto'
    },
    buttonTextStyle: {
        color: Colors.White,
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        textAlign: 'center'
    },
    imagePlaceholder: {
        width: '80%',
        height: 80,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

    videoContainer: {
        width: Dimensions.get('window').width,
        height: 300,
        // backgroundColor:'gray',
        margin: 40,
        // marginLeft:100,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    placeHolderImage: {
        width: 300,
        borderRadius: 20,
        alignItems: 'center',
        height: 500,
        justifyContent: 'center',
        alignSelf: 'center',
        resizeMode: 'contain'
    }
})