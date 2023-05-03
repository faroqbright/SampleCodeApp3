import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Image,
    Alert,
    Dimensions,
    SafeAreaView
} from "react-native";
import Images from "../../assets/Images";
import Header from "../../components/Header";
import { Style } from "./Style";
import { Colors } from "../../utils/Colors";
import CustomButton from "../../components/customButton";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { jobFiltersAPi, jobTypeAPI } from "../../api/methods/auth";
import Loader from '../../components/Loader';
import { useIsFocused } from '@react-navigation/native';




const jobInfo = [{
    id: '1',
    title: 'Company Name',
    subHeading: "Position ",
    salary: '5K/month',
    location: 'Toronto, Canada',
    Image: Images.dollarIcon,
    locationImage: Images.locationIcon


},
{
    id: '2',
    title: 'Company Name',
    subHeading: "Position ",
    salary: '5K/month',
    location: 'Toronto, Canada',
    Image: Images.dollarIcon,
    locationImage: Images.locationIcon
},
{
    id: '3',
    title: 'Company Name',
    subHeading: "Position ",
    salary: '5K/month',
    location: 'Toronto, Canada',
    Image: Images.dollarIcon,
    locationImage: Images.locationIcon
},
{
    id: '4',
    title: 'Company Name',
    subHeading: "Position ",
    salary: '5K/month',
    location: 'Toronto, Canada',
    Image: Images.dollarIcon,
    locationImage: Images.locationIcon
},
{
    id: '5',
    title: 'Company Name',
    subHeading: "Position ",
    salary: '5K/month',
    location: 'Toronto, Canada',
    Image: Images.dollarIcon,
    locationImage: Images.locationIcon
},
{
    id: '6',
    title: 'Company Name',
    subHeading: "Position ",
    salary: '5K/month',
    location: 'Toronto, Canada',
    Image: Images.dollarIcon,
    locationImage: Images.locationIcon
},
    // {
    //     id: '7',
    //     title: 'Company Name',
    //     subHeading: "Position ",
    //     salary: '5K/month',
    //     location: 'Toronto, Canada',
    //     Image: Images.dollarIcon,
    //     locationImage: Images.locationIcon
    // }
]




export default SearchResult = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false);
    const [allJobs, setAllJobs] = useState([])
    const [selectedJobType, setSelectedJobType] = useState()

    const filterParams=route.params.jobsfilter
    const isFocused = useIsFocused()

    useEffect(() => {
        filterAPI(selectedJobType)
        // jobTypes()
    }, [isFocused]);
    
    const filterAPI = async (job_type, searchText = "") => {
        try {
            setLoading(true)
            const response = await jobFiltersAPi({
                job_type: job_type,
                search_text: searchText
            })
            console.log("API Response=======>>>", response.status)
            console.log("API Data================>>", response.data.data.all_jobs)
            console.log("Applied Jobs Data================>>", response.data.data.applied_jobs)
            setAllJobs(response.data.data.all_jobs)
            setLoading(false)
        } catch (error) {
            console.log("API Error=================>>>", error)
            setLoading(false)
        }
    }

    const JobRenderItem = ({ item }) => (
        // const onNavigate=(navigation.navigate("CompanyDetails"))
        <TouchableOpacity
            onPress={() => navigation.navigate('CompanyDetails', { itemDetails: item })}
        >
            <View style={styles.jobInfoContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 48, }}>
                    <Image
                        style={{ width: 48, height: 48, marginLeft: 8, marginTop: 15 }}
                        source={item?.user?.company_logo?{ uri: item?.user?.company_logo}:Images.companyImagePlaceHolder}
                        // source={Images.companyImagePlaceHolder}
                    />
                    {/* <View style={styles.textContainer}> */}
                    <View style={{
                        marginTop: 40,
                        marginRight: 'auto',
                        height: 50,
                        width: 150,
                        marginLeft: 8,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        // backgroundColor:'red',
                    }}>
                        <Text style={styles.itemText}>{item.user.organization_name}</Text>
                        <Text style={styles.subText}>{item.position}</Text>

                    </View>

                    {/* </View> */}
                </View>
                <View style={styles.salaryLocationContainer}>
                    <Image style={{
                        width: 20,
                        height: 20,
                        // marginLeft: 20,
                        marginBottom: 0
                    }} source={Images.dollarIcon} />
                    <Text style={styles.salary}>{item.salary}</Text>
                    <Image style={{
                        width: 15,
                        height: 20,
                        // marginRight: 5,
                        // marginLeft: 20
                    }} source={Images.locationIcon} />
                    <Text style={styles.location}>{item?.user?.city}{','} {item?.location}</Text>
                    <CustomButton
                        style={{
                            backgroundColor: item.job_type == 1 ? Colors.Yellow : item.job_type == 2 ? Colors.Blue : item.job_type == 3 ? Colors.Maroon : item.job_type==4? Colors.LightBlue:item.job_type==5? Colors.LightGreen:item.job_type==6?Colors.Red: Colors.Yellow,

                            borderColor: item.job_type == 1 ? Colors.Yellow : item.job_type == 2 ? Colors.Blue : item.job_type == 3 ? Colors.Maroon : item.job_type==4? Colors.LightBlue:item.job_type==5? Colors.LightGreen:item.job_type==6?Colors.Red: Colors.Yellow,
                            width: 75.67,
                            height: 22,
                            marginRight: 0,
                            marginTop: 0,
                            justifyContent: 'space-evenly',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        disabled={true}
                        source={Images.briefCaseIcon}
                        imageStyle={styles.briefiCase}
                        label={item.job_type == 1 ? 'Job Trial' : item.job_type == 2 ? 'Permanent' : item.job_type == 3 ? 'Temporary' : item.job_type == 4 ? 'Contract' : item.job_type == 5 ? 'Remote' : 'Part Time'}
                        textStyle={styles.yellowTextStyle}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={Style.mainContainer}>
            <Header
                // headerContainer={Style.headerContainer}
                label={"Search Result"}
                // headerTextStyle={Style.headerTextStyle}
                source={Images.backIcon}
                onPress={() => navigation.navigate('Home')}
                // backButtonStyle={Style.backButtonStyle}
                iconImageStyle={{tintColor:Colors.DarkBlue}}
                headerText={{color:Colors.DarkBlue}}
                settingIconImageStyle={{
                    width: 30,
                    height: 30,
                }}
                settingButtonStyle={{
                    width: 30,
                    height: 30,
                    backgroundColor: Colors.Yellow,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    marginBottom: 10,
                    marginRight: 20
                }}
            />
            <ScrollView style={{ height: '100%' }} >
                <View style={Style.jobFlatList}>

                    <FlatList
                        showsVerticalScrollIndicator={true}
                        data={filterParams}
                        renderItem={JobRenderItem}

                        keyExtractor={item => item.id}
                    />

                </View>
            </ScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    jobInfoContainer: {
        shadowColor: Colors.White,
        // width: 330,
        width: '95%',
        height: 120,
        alignSelf: 'center',
        borderWidth: 1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        backgroundColor: Colors.White,
        borderRadius: 10,
        borderColor: Colors.LightGray,
        shadowOpacity: 0.25,
        shadowRadius: 1,

        // elevation: 1,
        marginVertical: 8,
        marginHorizontal: 5,
        marginTop: 5,
        // marginBottom:10


    },
    avatarCircle: {
        backgroundColor: Colors.LightGray,
        borderRadius: 30,
        borderColor: Colors.LightGray,
        borderWidth: 1,
        width: 50,
        height: 48,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10

    },
    itemText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        marginBottom: 0
    },
    subText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.LightGray,
        marginBottom: 0
    },
    salaryLocationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 'auto',
        marginBottom: 5,
        paddingHorizontal: 10,
        marginLeft: 2,
        width: '100%',
        // backgroundColor: 'red'
    },
    salary: {
        fontSize: 12,
        fontFamily: 'Roboto-Medium',
        color: Colors.LightGray,
        // marginLeft: 20,
        // marginRight:120
    },
    location: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: Colors.LightGray,
        marginRight: 40,
        // marginLeft: 15,
        // backgroundColor:'red'
    },
    briefiCase: {
        width: 10,
        height: 10,
        justifyContent: 'center',

    },
    yellowTextStyle: {
        color: Colors.White,
        fontFamily: 'Roboto-Regular',
        fontSize: 10,
        textAlign: 'center'
    },
    textContainer: {
        backgroundColor: Colors.White,
        marginTop: 10,
        marginLeft: 20,
        flexDirection: 'row'
    },

})