import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, SafeAreaView } from "react-native";

import { Colors } from "../utils/Colors";
import Header from "./Header";
import Images from "../assets/Images";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import CustomButton from "./customButton";
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, candidateProfileAPI } from "../api/methods/auth";
import Loader from "./Loader";
import { onUserSessionChangeState } from '../redux/actions/userSession';
import Toast from 'react-native-simple-toast';
import VideoModal from "./VideoModal";
import { createThumbnail } from "react-native-create-thumbnail";
import moment from "moment";
import ImageResizer from 'react-native-image-resizer';
import { useIsFocused } from "@react-navigation/native";



const options = {
    opacity: 0.3,
    mediaType: 'video',
    videoQuality: 'low',
    quality: 1,

}
//for profile photo
const photoOptions = {
    opacity: 0.3,
    mediaType: 'photo',
    videoQuality: 'low',
    quality: 1,

}
export default ResumeHeader = (props) => {

    const { currentUser, hasProfileChanges } = useSelector((state) => state.userSession);

    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    // console.log('current user==?>',currentUser)

    const [profilePhoto, setProfilePhoto] = useState(null)
    const [firName, setFirName] = useState('')
    const [surName, setSurName] = useState('')
    const [userTown, setUserTown] = useState('')
    const [city, setCity] = useState('')
    const [loading, setLoading] = useState(false)

    const [modalVisible, setModalVisible] = useState(false);
    const [photModalVisible, setPhotoModalVisible] = useState(false)
    const [videoModal, setVideoModal] = useState(false)
    const [video, setVideo] = useState(null)
    const [path, setPath] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [timeStamp, setTimeStamp] = useState('1000');

    const [reduxFirstName, setReduxFirstName] = useState(currentUser?.firstname)
    const [reduxLastName, setReduxLastName] = useState(currentUser?.lastname)
    const [reduxPhoto, setReduxPhoto] = useState(currentUser?.photo)
    const [videoThumbnail, setVideoThumbnail] = useState(null)

    const getUserProfile = async () => {
        try {
            setLoading(true)
            const response = await getProfile()
            setProfilePhoto(response.data.data.photo)
            setFirName(response.data.data.firstname)
            setSurName(response.data.data.lastname)
            setUserTown(response.data.data.address_line1)
            setCity(response.data.data.city)
            setVideo(response.data.data.introduction_video)
            setVideoThumbnail(response?.data?.data?.video_thumbnail)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("User profile API - Error", error)
        }
    }

    let reduxUri = reduxPhoto

    useEffect(() => {
        if (isFocused) {
            getUserProfile()
        }
    }, [isFocused])

    const showCamera = () => {
        launchCamera(options, callback);

    }
    const showLibrary = () => {
        launchImageLibrary(options, callback)
    }

    const callback = response => {
        // console.log('my response=====>', response)
        if (response.didCancel) {
            console.log("User Cancelled Image Picker")
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else {
            const source = {
                uri: response.assets[0].uri,
                name: moment().format('x') + ".mp4",
                type: response.assets[0].type
            }
            setModalVisible(false)
            setVideo(source)
            setPath(source)
            setTimeStamp(1000)
            generateThumbnail(source, source.uri, 1000)
        }
    }
    const onBuffer = (data) => {
        console.log("Error =>>>>>>>>>>>>>>>>", data)
    }
    const VideoError = (data) => {
        console.log("Error =>>>>>>>>>>>>>>>>>", data)
    }

    const generateThumbnail = async (a, b, c) => {
        if (!b) {
            return;
        }
        // console.log('dsadsad im hrerer')

        // setIsLoading(true);

        try {
            const response = await createThumbnail({
                url: b,
                timeStamp: parseInt(c, 10),
                format: 'jpeg',
            }
            );
            console.log('response', response)
            const imageObject = {
                uri: response.path,
                type: response.mime,
                name: moment().format('x') + ".jpeg",
            }
            setThumbnail(imageObject);

            updateProfileAPI(null, a, imageObject)
            // imageResize(a, imageObject)
        } catch (err) {
            console.error(err);
        } finally {
            // setIsLoading(false);
        }
    }

    const imageResize = (_video, thumb) => {
        console.log("thumbnail==>>", thumb)
        console.log('a==>>>', _video)
        ImageResizer.createResizedImage(thumb.uri, 300, 300, 'JPEG', 0.1)
            .then(response => {
                // response.uri is the URI of the new image that can now be displayed, uploaded...
                // response.path is the path of the new image
                // response.name is the name of the new image with the extension
                // response.size is the size of the new image
                console.log("size===>>", response)
                const source = {
                    name: moment().format('x') + ".jpeg",
                    uri: response.uri,
                    type: 'image/jpeg'
                }
                setThumbnail(source)
                updateProfileAPI(null, _video, source)
            })
            .catch(err => {
                console.log('err==>>', err)
                // Oops, something went wrong. Check that the filename is correct and
                // inspect err to get more details.
            });
    }

    //for profile photo

    const photoShowCamera = () => {
        launchCamera(photoOptions, photoCallback);

    }
    const photoShowLibrary = async () => {
        // const result = await launchImageLibrary(photoOptions,photoCallback);
        // console.log("im here",result)
        // setPhotoModalVisible(false)
        launchImageLibrary(photoOptions, photoCallback)
    }

    const photoCallback = response => {
        try {
            if (response.didCancel) {
                console.log("User Cancelled Image Picker")
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                const imgSource = {
                    uri: response.assets[0].uri,
                    name: response.assets[0].fileName,
                    type: response.assets[0].type
                }

                setProfilePhoto(imgSource)
                updateProfileAPI(imgSource)
                setPhotoModalVisible(false)
                // console.log('profile photo after update profile API ====>>>', profilePhoto)
            }
        } catch (error) {
            console.log('saasasasasa', error)
        }

    }

    const updateProfileAPI = async (imgSource = null, _video = null, thumb = null) => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('firstname', currentUser.firstname)
            formData.append('lastname', currentUser.lastname)
            formData.append('address_line1', currentUser.address_line1)
            formData.append('city', currentUser.city)
            formData.append('country_id', currentUser.country_id)
            formData.append('state', currentUser.state)
            formData.append('date_of_birth', currentUser.date_of_birth)
            // formData.append('phone', '+923206364313')
            typeof currentUser.phone == 'string' && formData.append('phone', currentUser.phone)
            formData.append('zipcode', currentUser.zipcode)
            formData.append('resume_headline', currentUser.resume_headline)
            if (imgSource) {
                formData.append('photo', imgSource ? imgSource : currentUser.photo)
            }
            if (_video) {
                formData.append('introduction_video', _video)
                formData.append('video_thumbnail', thumb)
            }
            const response = await candidateProfileAPI(formData)
            console.log('update profile API response===>>', response.status)
            if (response.status == 200) {
                getUserProfile()
                dispatch(onUserSessionChangeState({
                    hasProfileChanges: false
                }))
                Toast.show(response.data.message)
                setLoading(false)
                console.log('Videooooo====>>>', video)
            }
        } catch (error) {
            setLoading(false)
            console.log("Error-API", error?.response?.data?.error)
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            {/* <Header
                headerContainer={styles.headerContainer}
                source={Images.whiteBackIcon}
                onPress={() => props.onBackPress()}
                backButtonStyle={styles.headerIcon}
                settingIconSource={props.settingIconSource}
                settingIconImageStyle={styles.settingIconImage}
                settingIconPress={() => props.onSettingPress()}
            /> */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                height: 44,
                // marginTop:35,
                // backgroundColor: 'red'
            }}>
                <TouchableOpacity
                    style={{ width: 54, alignItems: 'center' }}
                    onPress={props.onBackPress}
                >
                    <Image
                        style={{
                            height: 24,
                            width: 22,
                            marginTop: 10,
                            // marginLeft: 12,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        source={Images.whiteBackIcon}
                    />
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor:'black'
                }}>
                    <TouchableOpacity
                        style={{ width: 54, alignItems: 'center', }}
                        onPress={props.onEditPress}
                    >
                        <Image
                            style={{
                                height: 24,
                                width: 22,
                                marginTop: 10,
                                // marginLeft: 150,
                                alignItems: 'center',
                                justifyContent: 'center',
                                tintColor: 'white'
                            }}
                            source={Images.editProfileIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 54, marginLeft: 'auto' }}
                        onPress={props.onSettingPress}
                    >
                        <Image
                            style={{
                                height: 24,
                                width: 22,
                                marginTop: 10,
                                marginLeft: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                tintColor: 'white'
                            }}
                            source={Images.settingIcon}
                        />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.textHeadingContainer}>
                <Text style={styles.heyThereText}>HEY THERE!</Text>
                <View
                    style={{ borderRadius: 50, borderWidth: 1, borderColor: 'black', marginBottom: 20 }}
                >
                    <Image
                        style={{
                            width: 90,
                            height: 90,
                            borderRadius: 50
                        }}
                        // source={profilePhoto}
                        source={profilePhoto ? profilePhoto?.uri ? profilePhoto : { uri: profilePhoto } : reduxUri ? { uri: reduxUri } : Images.avatar}
                    />
                    <TouchableOpacity
                        style={{
                            marginTop: 80,
                            height: 44,
                            width: 44,
                            // backgroundColor:'red', 
                            position: 'absolute',
                            alignSelf: 'center'
                        }}
                        onPress={() => {
                            setPhotoModalVisible(true)
                            dispatch(onUserSessionChangeState({
                                currentUser: {
                                    ...currentUser,
                                    photo: profilePhoto
                                },
                                hasProfileChanges: true
                            }))
                        }
                        }
                    >
                        <Image
                            style={styles.uploadButtonPhotoStyle}
                            source={Images.uploadButtonIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.nameText}>{firName == null ? reduxFirstName : firName} {surName == null ? reduxLastName : surName}</Text>
                <Text style={styles.locationText}>{userTown == null ? "Town" : userTown}, {city == null ? "City" : city}</Text>
            </View>
            <TouchableOpacity style={styles.videoContainer}
                onPress={() => {
                    if (video !== '') {
                        setVideoModal(true)
                    }
                    else {
                        Toast.show("Video not available")
                    }
                }}
            >
                {/* <Image
                style={styles.placeHolderImage}
                source={{uri:'https://resources.construx.com/wp-content/uploads/2016/08/video-placeholder-brain-bites.png'}}

            /> */}
                <View
                    style={{ height: "95%", width: '100%', }}
                // onPress={()=> video?setVideoModal(true):''}
                >
                    <Image
                        source={video && { uri: videoThumbnail }}
                        resizeMode="cover"
                        style={{ height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center', borderRadius: 15 }}
                    />
                </View>
                <TouchableOpacity
                    style={{ top: 80, position: 'absolute' }}
                    onPress={() => setModalVisible(true)}
                >
                    <Image
                        style={styles.uploadButtonImageStyle}
                        source={Images.uploadButtonIcon}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
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
            {/* for profile photo */}
            <CustomModal isVisible={photModalVisible}
                onCancel={() => (setPhotoModalVisible(false))}
                LibraryPress={() => {
                    photoShowLibrary()
                    // setPhotoModalVisible(false)
                }}

                openCamera={() => {
                    photoShowCamera()
                    // setPhotoModalVisible(false)
                }}
            />

            <View style={styles.headerFooter}>
                <Text style={styles.videoProfileText}>Video Profile</Text>
                <Text style={styles.videoInstructionText}>Make the perfect impression in 30 secs, get a chance to convince the recruiters why you are the best candidate.</Text>
            </View>
            <VideoModal
                source={{ uri: video }}
                isVisible={videoModal}
                onClose={() => setVideoModal(false)}
                mainContainer={{
                    width: '80%',
                    height: '90%',
                    borderWidth: 1,
                    // borderRadius:10,
                    borderColor: Colors.LightBlue,
                    marginBottom: 'auto',
                    marginTop: 20
                }}
            />
            <Loader loading={loading} isShowIndicator={true} color={Colors.DarkBlue} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: 'auto',
        backgroundColor: Colors.LightBlue
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 35,
        // backgroundColor:'red',
        height: 'auto',
        alignItems: 'center',
        alignSelf: 'center'
    },
    headerIcon: {
        // marginLeft:25,
        marginTop: 10

    },
    settingIconImage: {
        marginRight: 30,
        marginBottom: 20,
        // alignSelf:'center',
        // alignItems:'center',
        // justifyContent:'center',


    },
    textHeadingContainer: {
        width: '100%',
        height: 'auto',

        // backgroundColor:'red',

        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    heyThereText: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        color: Colors.White
    },
    nameText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        color: Colors.White
    },
    locationText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.White
    },
    videoContainer: {
        width: 106,
        height: 106,

        backgroundColor: 'gray',
        marginTop: 5,
        paddingHorizontal: 2,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 20
    },

    uploadButtonImageStyle: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor:'red,',
        // marginBottom:20,
        // marginTop:90
    },
    uploadButtonPhotoStyle: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor:'red',
        // marginBottom:20,
        // marginTop:10
    },
    headerFooter: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 8
        // backgroundColor:'red'
    },
    videoProfileText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        color: Colors.White
    },
    videoInstructionText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.White,
        textAlign: 'center'
    }
})