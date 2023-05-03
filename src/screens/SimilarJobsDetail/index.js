import React, { useState } from "react";
import { Alert, Dimensions, ScrollView, Text, View, Image, SafeAreaView } from "react-native";
import Toast from 'react-native-simple-toast';

import { applyJobAPI } from "../../api/methods/auth";
import Images from "../../assets/Images";
import CustomButton from "../../components/customButton";
import SimilarJobsDetailHeader from "../../components/SimilarJobsDetailHeader";
import JobDetailsHeader from "../../components/JobDetailsHeader";
import { Colors } from "../../utils/Colors";
import { Style } from "./Style";
import Loader from '../../components/Loader'
import { TouchableOpacity } from "react-native-gesture-handler";
import VideoModal from '../../components/VideoModal';


export default SimilarJobsDetail = ({ navigation, route }) => {
    const params = route?.params?.itemDetails
    const screenParams = route?.scrParams?.scscreenName
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const onApplyPress = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("job_id", params.id)
            const response = await applyJobAPI(formData)
            if (response.status == 200) {
                Toast.show("Job Applied")
                navigation.navigate('AppliedConformationScreen',{jobId:params.id})
            }

            console.log("API Status==========>>>", response.status)
            console.log("Paramd ID=============>>>>", params.id)
            console.log("API Data==========>>>", response.data)
            setLoading(false)
        } catch (error) {
            console.log('Apply API Error==============>>>>>', error)
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={Style.mainContainer}>
            {/* <SimilarJobsDetailHeader
                detailParams={params}
                label={"Job Details"}
                headerMainContainer={Style.headerMainContainer}
                onBackButtonPress={() => navigation.goBack()}
                settingIconPress={() => Alert.alert("Button is Pressed")}
                backIcon={Images.whiteBackIcon}
                settingIconSource={Images.threeDotMenu}
            /> */}
            <JobDetailsHeader
                detailParams={params}
                label={"Job Details"}
                headerMainContainer={Style.headerMainContainer}
                onBackButtonPress={() => navigation.goBack()}
                settingIconPress={() => {''}}
                backIcon={Images.whiteBackIcon}
                settingIconSource={Images.threeDotMenu} 
                
            />
            <ScrollView style={{ height: '100%', }}>
                <View style={Style.secondContainer}>
                    <Text style={Style.DescriptionHeading}>Job Description</Text>
                    <Text style={Style.description}>
                        {params?.description}
                    </Text>
                    <Text style={Style.VideoHeading}> Video</Text>
                    <View style={Style.videoContainer}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                        >
                            <View style={{
                                width: 100,
                                height: 80,
                                backgroundColor: Colors.LightGray,
                                borderRadius: 10
                            }}><Image
                                    source={Images.videoPlaceHolder}
                                    style={{
                                        width: 100,
                                        height: 80,
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                        <Text style={Style.videoDescription}> {params?.company_description} </Text>
                    </View>
                    <Text style={Style.QualificationsHeading}>Qualifications</Text>
                    <Text style={Style.description}>
                        {params?.qualifications}
                    </Text>
                    <Text style={Style.SkillsRequiredtionHeading}>Skills Required</Text>
                    <Text style={Style.description}>
                        {params?.skills}
                    </Text>
                    <CustomButton
                        // onPress={()=>navigation.navigate('ConformationScreen')}
                        onPress={() => onApplyPress()}
                        label={"Apply Now"}
                        style={Style.applyButton}
                        textStyle={Style.applyButtonText}
                    />

                </View>
                <Loader loading={loading} isShowIndicator={true} />
            </ScrollView>
            {params?.user?.introduction_video?<VideoModal
                source={{ uri: params?.user?.introduction_video }}
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            />:Toast.show("Video not available!")}
        </SafeAreaView>
    )
}