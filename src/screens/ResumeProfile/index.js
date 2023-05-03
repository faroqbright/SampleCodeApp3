import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ScrollView, Image, Picker, Linking, SafeAreaView } from "react-native";
import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';
import MultiSelect from 'react-native-multiple-select';


import { Style } from "./Style";
import Images from "../../assets/Images";
import { Colors } from "../../utils/Colors";

import ResumeHeader from "../../components/ResumeHeader";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/CustomInput";
import VideoModal from "../../components/VideoModal";

import { useDispatch, useSelector } from 'react-redux'
import { onUserSessionChangeState, preferredIndustry, preferredJobType } from '../../redux/actions/userSession';

import {
    getProfile,
    getPreferredIndustry,
    getPreferredJob,
} from "../../api/methods/auth";
import Loader from '../../components/Loader';
import userSession from "../../redux/reducers/userSession";

export default ResumeProfile = ({ navigation }) => {

    const textRef = useRef(null)

    const { currentUser, hasProfileChanges } = useSelector((state) => state.userSession);
    const userPreferredIndustry = useSelector(state => state.userSession.isPreferredIndustry)
    const userPreferredJobType = useSelector(state => state.userSession.isPreferredJobType)

    const vRef = useRef(null)
    const jobTypeRef = useRef(null)

    const [resHeadLine, setResHeadline] = useState('')
    const [singleFile, setSingleFile] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [onEditPress, setOnEditPress] = useState(false)
    const [selectedValue, setSelectedValue] = useState("");
    const [jobTypeEdit, setJobTypeEdit] = useState(false)


    const [industryValue, setIndustryValue] = useState("");
    const [jobIndustryEdit, setJobIndustryEdit] = useState(false)
    const [loading, setLoading] = useState(false);

    const [preferredIndustryState, setSelectedPreferredInustryState] = useState([])
    // const [selectedIndustry, setSelectedIndustry] = useState(userPreferredIndustry)
    const [selectedIndustry, setSelectedIndustry] = useState([])

    const [preferredJobTypeState, setPreferredJobTypeState] = useState([])
    const [selectedJobType, setSelectedJobType] = useState([])

    const [modalVisible, setModalVisible] = useState(false)

    const dispatch = useDispatch()

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            getUserProfile()
            industryAPI()
            jobTypeAPI()
        }
    }, [isFocused])

    useEffect(() => {
       
        if (onEditPress && typeof textRef?.current?.focus === 'function') {
            setTimeout(() => {
                textRef?.current?.focus()
            }, 300);
        }
    }, [isFocused, onEditPress])

    const getUserProfile = async () => {
        try {
            setLoading(true)
            const response = await getProfile()
            setResHeadline(response.data.data.resume_headline)
            setSingleFile(response.data.data.resume)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("User profile API - Error", error)
        }
    }

    const selectOneFile = async () => {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            setSingleFile(res[0].name);

        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const industryAPI = async () => {
        try {
            setLoading(true)
            const response = await getPreferredIndustry()
            if (response.status == 200) {
                setSelectedPreferredInustryState(response.data.data.industries)
            }
            setLoading(false)
        } catch (error) {
            // console.log("Preferred Industry API Error", error)
            setLoading(false)
        }
    }

    const onSelectedItemsChange = (selectedIndustry) => {
        setSelectedIndustry(selectedIndustry);
        dispatch(preferredIndustry(preferredIndustryState))
    };

    const jobTypeAPI = async () => {
        try {
            setLoading(true)
            const response = await getPreferredJob()
            if (response.status == 200) {
                setPreferredJobTypeState(response.data.data.jobtypes)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const onJobTypeSelect = (selectedJobType) => {
        setSelectedJobType(selectedJobType);
        dispatch(preferredJobType(selectedJobType))

    };
    // console.log("===>>",preferredJobTypeState)

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[Style.item, backgroundColor]}
            disabled={true}
        >
            <Text style={[Style.title, textColor,]}>{item.title}</Text>
            <Image
                style={{ width: 12.67, height: 12.67, marginTop: 2 }}
                source={item.Image !== '' ? item.Image : null}
            />
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        const color = Colors.White

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                textColor={{ color }}
            />
        );
    };

    const JobItem = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[Style.jobItem, backgroundColor]}
            disabled={true}
        >
            <Image
                style={{ width: 12.67, height: 11.67, }}
                source={item.Image !== '' ? item.Image : null}
            />
            <Text style={[Style.jobTitle, textColor,]}>{item.title}</Text>
            <Image
                style={{ width: 12.67, height: 11.67, }}
                source={item.Image2 !== '' ? item.Image2 : null}
            />
        </TouchableOpacity>
    );

    const jobRenderItem = ({ item }) => {
        const color = Colors.White

        return (
            <JobItem
                item={item}
                onPress={() => setSelectedId(item.id)}
                textColor={{ color }}
            />
        );
    };
    return (

        <SafeAreaView style={Style.mainContainer}>
            <ScrollView style={{ backgroundColor: Colors.White, width: '100%' }}>
            <ResumeHeader
                onBackPress={() => navigation.navigate('Home')}
                onEditPress={() => navigation.navigate('EditProfile')}
                onSettingPress={() => navigation.navigate('SettingsProfile')}
                settingIconSource={Images.settingIcon}
            />
                <CustomTextInput
                    label={"Resume Headline"}
                    placeholder={"Resume Headline"}
                    value={resHeadLine}
                    defaultValue={resHeadLine}
                    editable={false}
                    textInputContainer={{ marginBottom: 10, marginTop: 5 }}
                    fieldRef={textRef}
                />
                <View style={{ width: '100%', height: 120, borderBottomWidth: 0.5, borderColor: Colors.LightGray }}>
                    <View>
                        <View style={Style.headingContainer}>
                            <Text style={Style.headlineText}>Resume</Text>
                        </View>
                    </View>
                    <CustomInput
                        // icon={singleFile !== '' ? Images.crossIcon : null}
                        fileIcon={Images.pdfIcon}
                        fileIconStyle={Style.fileIconStyle}
                        iconStyle={Style.iconStyle}
                        mainStyle={Style.uploadField}
                        editable={false}
                        value={singleFile.split('/').pop()}
                        fileButtonDisabled={false}
                        placeholder={'File Name'}
                        innerStyle={Style.uploadFieldText}
                        openFile={() => Linking.openURL(singleFile)}
                        onPress={() => setSingleFile("File Name")}
                    />
                </View>
                <View style={Style.headingContainer}>
                    <Text style={Style.headlineText}>Preferred Industry</Text>
                </View>
                <View style={Style.flatListContainer}>

                    <View style={Style.flatListContainer}>
                        <MultiSelect
                            styleDropdownMenuSubsection={{ backgroundColor: "transparent", height: 60, marginTop: 5 }}
                            // hideTags={true}
                            items={preferredIndustryState}
                            uniqueKey="id"
                            ref={vRef}
                            onSelectedItemsChange={onSelectedItemsChange}
                            selectedItems={selectedIndustry}
                            selectText="Preferred Industry"
                            searchInputPlaceholderText="Search Industry"
                            onChangeInput={(text) => console.log(text)}
                            altFontFamily="Roboto-Regular"
                            tagRemoveIconColor={Colors.White}
                            tagBorderColor={Colors.LightBlue}
                            tagTextColor={Colors.White}
                            tagContainerStyle={{ backgroundColor: Colors.LightBlue }}
                            selectedItemTextColor={Colors.LightBlue}
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            hideSubmitButton
                            styleMainWrapper={{ width: '90%', alignSelf: 'center' }}
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor={Colors.LightBlue}
                            submitButtonText="Submit"

                        />
                    </View>


                    {/* Preferred job type */}
                    <View style={Style.headingContainer}>
                        <Text style={Style.headlineText}>Preferred Job Type</Text>
                    </View>
                    <View style={Style.flatListContainer}>
                        <MultiSelect
                            styleDropdownMenuSubsection={{ backgroundColor: "transparent", height: 60, marginTop: 5 }}
                            // hideTags={true}
                            items={preferredJobTypeState}
                            uniqueKey="id"
                            ref={jobTypeRef}
                            onSelectedItemsChange={onJobTypeSelect}
                            selectedItems={selectedJobType}
                            selectText="Preferred Job Type"
                            searchInputPlaceholderText="Search Job"
                            onChangeInput={(text) => console.log(text)}
                            altFontFamily="Roboto-Regular"
                            tagRemoveIconColor={Colors.White}
                            tagBorderColor={Colors.Yellow}
                            tagTextColor={Colors.White}
                            tagContainerStyle={{ backgroundColor: Colors.Yellow }}
                            selectedItemTextColor={Colors.Yellow}
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            // hideSubmitButton
                            styleMainWrapper={{ width: '90%', alignSelf: 'center' }}
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor={Colors.Yellow}
                            submitButtonText="Submit"


                        />
                    </View>

                    <VideoModal
                        // source={{ uri: params?.user?.introduction_video }}
                        isVisible={modalVisible}
                        onClose={() => setModalVisible(false)}
                    />
                </View>
            {/* </ScrollView> */}
            <Loader loading={loading} isShowIndicator={true} />
            </ScrollView>
        </SafeAreaView>

    )
}