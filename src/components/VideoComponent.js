import React, { useState } from "react";
import { View, StyleSheet, Alert, Modal, Image, Dimensions } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { createThumbnail } from "react-native-create-thumbnail";
import moment from "moment";
import VideoPlayer from "react-native-video-player";

import CreateProfileHeader from "./CreateProfileHeader";
import CustomButton from "./customButton"
import { Colors } from "../utils/Colors";
import CustomModal from "./CustomModal";
import Video from 'react-native-video';
import RNFC from 'react-native-fs';
import Images from '../assets/Images'

const placeholderImage = Images.videoPlaceHolder;

const options = {
    opacity: 0.3,
    mediaType: 'video',
    videoQuality: 'low',
    quality: 0.1,

}

export default VideoComponent = (props) => {
    const { onNext } = props
    const [modalVisible, setModalVisible] = useState(false);
    const [video, setVideo] = useState(null)
    const [videoBase64, setVideoBase64] = useState(null)
    const [path, setPath] = useState('');
    const [thumbnail, setThumbnail] = useState();
    const [timeStamp, setTimeStamp] = useState('1000');
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
            setModalVisible(false)
            const source = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
            };
            setVideo(source)
            setPath(source)
            setTimeStamp(1000)
            generateThumbnail(source.uri, 1000)
            console.log('===========>>>>', source)
        }
    }
    const onBuffer = (data) => {
        console.log("Error =>>>>>>>>>>>>>>>>", data)
    }
    const VideoError = (data) => {
        console.log("Error =>>>>>>>>>>>>>>>>>", data)
    }

    const generateThumbnail = async (b, c) => {
        if (!b) {
            return;
        }
        console.log('dsadsad im hrerer')

        // setIsLoading(true);

        try {
            const response = await createThumbnail({
                url: b,
                timeStamp: parseInt(c, 10),
                format: 'jpeg'
            });
            console.log("response===>>",response)
            const imageObject = {
                uri: response.path,
                type: response.mime,
                name: moment().format('x') + ".jpeg"
            }
            setThumbnail(imageObject);
            console.log('response path===>>>', imageObject)
        } catch (err) {
            console.error(err);
        } finally {
            // setIsLoading(false);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <CreateProfileHeader
                heading={"Video Profile"}
                paragraph={"Make the perfect impression in 30 secs, get a chance to convince the recruiters why you are the best candidate."}
                headerStyle={styles.headerStyle}
            />

            <View style={styles.videoContainer}>
                {video==null&&<Image
                    style={styles.placeHolderImage}
                    // source={thumbnail?.uri ? thumbnail : placeholderImage}
                    source={placeholderImage}
                />}
                {/* {video != null && (<Video
                    // paused={true}
                    repeat={false}

                    source={{ uri: video.uri }}
                    onBuffer={onBuffer}
                    onError={VideoError}
                    controls={true}
                    resizeMode={"contain"}

                    duration={30000}
                    style={{
                        height: 300,
                        width: Dimensions.get('window').width,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        // marginLeft:110,
                        // aspectRatio: 100/50,
                    }}
                />)} */}
                {video != null && <VideoPlayer
                    style={{
                        paddingHorizontal:20,
                        height: 300,
                        width: Dimensions.get('window').width,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        // marginLeft:110,
                        // aspectRatio: 100/50,
                    }}
                    
                    // video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                    video={{ uri: video.uri }}
                    videoWidth={2000}
                    videoHeight={900}
                    // thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                    thumbnail={{ uri: thumbnail?.uri }}
                    
                />}
            </View>

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
            <CustomButton
                label={video == null ? "Record Now" : "Next"}
                onPress={() => {
                    if (video == null || false) {
                        setModalVisible(true)
                    } else {
                        if (onNext && typeof onNext === 'function') {
                            onNext({
                                introduction_video: video,
                                video_thumbnail: thumbnail
                            })
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
        height: 200,
        justifyContent: 'center',
        alignSelf: 'center',
        resizeMode: 'contain'
    }
})