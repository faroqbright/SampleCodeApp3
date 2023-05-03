import React, { useEffect, useState } from "react";
import { View, ScrollView, FlatList, Text, TouchableOpacity, Image, Alert, SafeAreaView } from "react-native";
import moment from 'moment'
import { Style } from "./Style";
import Header from "../../components/Header";
import DropDownModal from "../../components/DropDownModal";
import CustomButton from "../../components/customButton";
import Images from "../../assets/Images"
import ModalDropdown from 'react-native-modal-dropdown';
import { Colors } from "../../utils/Colors";
import { jobFiltersAPi, jobStatusAPI, getSimilarJobsAPI } from "../../api/methods/auth";
import Loader from '../../components/Loader'
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { stat } from "react-native-fs";

export default SimiliarJobs = ({ navigation, route }) => {

    const userToken = useSelector(state => state.userSession.authenticationToken)
    const params = route?.params?.jobId
    const isFocused = useIsFocused()

    useEffect(() => {
        // filterAPI()
        onViewSimilarJobsPress()
        // appliedStatusAPI()   
        console.log("usertoken==>>", userToken);
    }, [isFocused]);

    const [appliedJobs, setAppliedJobs] = useState('');
    const [loading, setLoading] = useState(false);
    const [jobStatus, setJobStatus] = useState("");
    const [simiJobs, setSimiJobs] = useState('')


    const onViewSimilarJobsPress = () => {
        console.log("ID=================>>>>>>>>>>>>", params)
        setLoading(true)
        fetch(`https://dev.jobtrial.co.uk/api/similar-jobs/${params}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + userToken,
            },
        }).then(response => response.json())
            .then(response => {
                console.log("responseClientlogin-->", "-" + JSON.stringify(response));
                setSimiJobs(response)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log('Error:', error?.response?.data);
                alert("Error: " + error);
            });
    }

    const AppliedJobRenderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('SimilarJobsDetail', { itemDetails: item })}
        >
            <View style={Style.appliedJobContainer}>
                <View style={Style.textContainer2}>

                    {/* <View>
                        <Image
                            style={{ width: 48, height: 48, }}
                            source={{ uri: item.user.company_logo }}
                        /></View> */}
                    <View style={{ width: '60%', height: 'auto' }}>
                        <Text style={Style.itemText1}>{item.position}</Text>
                        <Text style={Style.subText1}>{item.position}</Text>

                        <Text style={Style.dateStyle}>{item.salary}</Text>
                        <Text style={Style.dateStyle}>{moment(item.created_at, 'YYYY-MM-DDTHH: mm: ss').format('YYYY-MM-DD ')}</Text>
                    </View>
                    {/* <TouchableOpacity style={{ width: 130, height: 30, justifyContent: 'center', marginLeft: 0, marginTop: 20 }}
                        onPress={() => Alert.alert("Button is Pressed")}
                    >
                        <Image style={{ width: 30, height: 20, marginLeft: 30, marginBottom: 20 }} source={Images.menuButton} />
                    </TouchableOpacity> */}
                </View>
                {/* <CustomButton
                    style={Style.appliedButton}
                    label={"Applied"}
                    textStyle={Style.appliedButtonText}
                    onPress={()=>setShowDropDown(!showDropDown)}
                    // secondIconSource={Images.downArrowIcon}
                    // secondIcon={Style.appliedButtonIconStyle}
                /> */}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={Style.mainContainer}>
            <Header
                label={"Similar Jobs"}
                settingIconImageStyle={{ tintColor: Colors.DarkBlue }}
                headerText={{ color: Colors.DarkBlue }}
                source={Images.backIcon}
                onPress={() => navigation.navigate('Home')}
                backButtonStyle={Style.headerIcon}
            // headerTextStyle={Style.headerTextStyle}
            // headerContainer={Style.headerContainer}
            />
            <ScrollView>
                {/* {appliedJobs?.length==0&&<Text style={{
                        alignItems:'center',
                        alignSelf:'center',
                        justifyContent:'center',
                        fontFamily:'Roboto-Regular',
                        color:Colors.DarkBlue,
                        marginTop:'50%'
                    }}>
                        There are no applied jobs!
                    </Text>} */}
                <View style={Style.appliedFlatList}>

                    {simiJobs.length > 0 ? <FlatList
                        data={simiJobs}
                        vertical
                        showsVerticalScrollIndicator={false}
                        renderItem={AppliedJobRenderItem}

                        keyExtractor={item => item.id}
                    /> : <Text
                        style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: '50%' }}
                    >{"There are no similar jobs"}</Text>}

                    <CustomButton
                        style={{
                            backgroundColor: Colors.LightBlue,
                            borderColor: Colors.LightBlue,
                            marginTop: 5,
                            marginBottom: 5
                        }}
                        onPress={() => navigation.navigate("Home")}
                        label={"Go to dashboard"}
                        textStyle={{
                            textAlign: 'center',
                            color: Colors.White,
                            fontFamily: 'Roboto-Bold',
                            fontSize: 15
                        }}
                    />
                </View>
            </ScrollView>
            {/* <DropDownModal
                isVisible={modalVisible}
                onCancel={()=>(setModalVisible(false))}
            /> */}
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}