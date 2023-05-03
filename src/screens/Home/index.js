import React, { useEffect, useState, useRef } from "react";
import {
    View,
    ScrollView,
    Text,
    Alert,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    StatusBar
} from "react-native";

import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from 'react-native-simple-toast'

import { useDispatch } from 'react-redux'
import moment from 'moment';

import { Style } from './Style';
import HomeHeader from '../../components/HomeHeader';

import { Colors } from "../../utils/Colors";
import CustomButton from "../../components/customButton";
import Images from "../../assets/Images";
import CustomModal from '../../components/CustomModal';
import FilterModal from "../../components/FilterModal";
import Loader from '../../components/Loader';

import { logoutUser } from "../../redux/actions/userSession";
import { getAppliedJobs, jobFiltersAPi, jobTypeAPI } from "../../api/methods/auth";
import { useSelector } from 'react-redux'
import { useIsFocused } from "@react-navigation/native";


const tags = [{
    id: '1',
    title: "Job Trial",
},
{
    id: '2',
    title: "Permanent",
},
{
    id: '3',
    title: "Temporary",
},
{
    id: '4',
    title: "Contract",
},
{
    id: '5',
    title: 'Remote',
},
{
    id: '6',
    title: 'Part Time'
}

]



const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
);




// const width=Dimensions.get('window').width
const Home = ({ navigation, route }) => {

    const refRBSheet = useRef()

    const isFocused = useIsFocused()

    // const params = route?.params?.industryDetails
    // console.log("Params=========>>>>", params)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState('1');
    const [modalVisible, setModalVisible] = useState(false);
    const [allJobs, setAllJobs] = useState([])
    const [appliedJobs, setAppliedJobs] = useState('')
    const [searchJobs, setSearchJobs] = useState('')
    const [selectedJobType, setSelectedJobType] = useState('1')

    const [filteredSearchJobs, setFilteredSearchJobs] = useState('')


    const [gestureName, setGestureName] = useState('')
    const [refresh, setRefresh] = useState(false)
    const userPreferredIndustry = useSelector(state => state.userSession.isPreferredIndustry)
    const userPreferredJobType = useSelector(state => state.userSession.isPreferredJobType)
    // console.log("Preferred industry",userPreferredIndustry)

    // const onSwipe = () => {
    //     //   const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    //     //   setGestureName(gestureName)
    //     //   switch (gestureName) {
    //     //     case SWIPE_UP:
    //     //       this.setState({backgroundColor: 'red'});
    //     //       break;
    //     //     case SWIPE_DOWN:
    //     //       this.setState({backgroundColor: 'green'});
    //     //       break;
    //     //     case SWIPE_LEFT:
    //     //       this.setState({backgroundColor: 'blue'});
    //     //       break;
    //     //     case SWIPE_RIGHT:
    //     //       this.setState({backgroundColor: 'yellow'});
    //     //       break;
    //     //   }
    //     // console.log('gesture===>>', gestureName)
    //     setRefresh(true)
    //     filterAPI()
    // }



    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };
    useEffect(() => {
        refRBSheet.current.close()
        filterAPI(selectedJobType)
    }, [isFocused]);

    var filterSearch = require('lodash.filter')

    const filterData = (text) => {

        const filteredData = allJobs.filter(
            function (item) {
                // Applying filter for the inserted text in search bar
                const itemData = item.position?.toLowerCase()
                const textData = text
                return itemData.indexOf(textData) > -1;
            }
        );

        setFilteredSearchJobs(filteredData)
        // console.log(filteredData)



    }

    // const [filteredData, setFilteredData] = useState(allJobs)

    const updateSearch = (text) => {
        // let dataTemp = allJobs
        // dataTemp = dataTemp.filter((item) => {
        //     return item.title?.toLowerCase().indexOf((search + "").toLowerCase()) >= 0
        // })
        // setFilteredData(dataTemp)
        setSearchJobs(text)
        filterAPI(selectedJobType, text)
    }
    const filterAPI = async (job_type, searchText = "") => {
        try {
            setLoading(true)
            const response = await jobFiltersAPi({
                job_type: job_type,
                search_text: searchText
            })
            setAllJobs(response.data.data.all_jobs)
            setAppliedJobs(response.data.data.applied_jobs.slice(0, 7))
            setFilteredSearchJobs(response.data.data.all_jobs)
            // console.log("Checking JOBS====>>>",response.data.data.all_jobs)
            setRefresh(false)
        } catch (error) {
            if (error?.response?.data?.error?.message == 'Token has been expired.' || error?.response?.data?.error?.message == "Token is required.") {
                Toast.show("Session Expired")
                dispatch(logoutUser())
            }
            else {
                Toast.show(error?.response?.data?.error?.message)
            }
        }
        finally {
            setLoading(false)
        }
    }



    const renderItem = ({ item }) => {
        // const backgroundColor = item.id === selectedId ? Colors.LightBlue : Colors.White;
        const color = item.id === selectedId ? Colors.LightBlue : Colors.DarkGray;

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id);
                    setSelectedJobType(item.id);
                    filterAPI(item.id, searchJobs)
                }}
                textColor={{ color }}
            />
        );
    };
    // const filterJobs=({item})=>{
    //     <Text>
    //         {item?.user?.organization_name}
    //     </Text>
    // }


    const JobRenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('CompanyDetails', { itemDetails: item })}>
                <View style={styles.jobInfoContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 48, }}>
                        <View><Image
                            style={{ width: 48, height: 48, marginLeft: 20, marginTop: 10 }}
                            source={item?.user?.company_logo ? { uri: item?.user?.company_logo } : Images.companyImagePlaceHolder}
                        /></View>
                        <CustomButton
                            style={{
                                backgroundColor: selectedId == 1 ? Colors.Yellow : selectedId == 2 ? Colors.Blue : selectedId == 3 ? Colors.Maroon : selectedId == 4 ? Colors.LightBlue : selectedId == 5 ? Colors.LightGreen : selectedId == 6 ? Colors.Red : Colors.Yellow,

                                borderColor: selectedId == 1 ? Colors.Yellow : selectedId == 2 ? Colors.Blue : selectedId == 3 ? Colors.Maroon : selectedId == 4 ? Colors.LightBlue : selectedId == 5 ? Colors.LightGreen : selectedId == 6 ? Colors.Red : Colors.Yellow,
                                width: 75.67,
                                height: 22,
                                marginRight: 20,
                                marginTop: 30,
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
                    <View style={styles.textContainer}>
                        <View>
                            <Text style={styles.itemText}>{item?.user?.organization_name ? item?.user?.organization_name : 'Company Name'}</Text>
                            <Text style={styles.subText}>{item?.position ? item?.position : 'Position'}</Text>
                            <View style={styles.salaryLocationContainer}>
                                <Image style={{ width: 20, height: 20 }} source={Images.dollarIcon} />
                                <Text style={styles.salary}>{item.salary}</Text>
                                <Image style={{ width: 15, height: 20, marginRight: 5 }} source={Images.locationIcon} />
                                <Text style={styles.location}>{item?.user?.city}{','} {item?.location}</Text>
                            </View>
                        </View>

                    </View>
                    <View>

                    </View>

                </View>
            </TouchableOpacity>
        )
    };

    const AppliedJobRenderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('CompanyDetails', { itemDetails: item })}>
            <View style={styles.appliedJobContainer}>
                <View style={styles.textContainer2}>

                    <View>
                        <Image
                            style={{ width: 48, height: 48, }}
                            source={item?.user?.company_logo ? { uri: item?.user?.company_logo } : Images.companyImagePlaceHolder}
                        /></View>
                    <View style={{ width: '60%', height: 'auto' }}>
                        <Text style={styles.itemText1}>{item.user?.organization_name ? item.user?.organization_name : 'Company Name'}</Text>
                        <Text style={styles.subText1}>{item?.position ? item?.position : 'Position'}</Text>

                        <Text style={styles.dateStyle}>{moment(item.publish_date, 'YYYY-MM-DDTHH: mm: ss').format('YYYY-MM-DD ')}</Text>
                    </View>
                    {/* <TouchableOpacity style={{
                        width: 80, height: 20, justifyContent: 'center',

                        alignItems: 'center', alignSelf: 'center',
                        marginLeft: 0
                    }}
                        onPress={() => ''}
                    >
                        <Image style={
                            {
                                width: 30, height: 20, marginLeft: 20, marginBottom: 20
                            }} source={Images.menuButton} />
                    </TouchableOpacity> */}

                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={Style.mainContainer}>
            <ScrollView>
                <HomeHeader
                    isSessionExpired={(value) => console.log('isSessionExpired==>>>', value)}
                    // onPress={()=>setModalVisible(true)}
                    onProfile={() => {
                        // dispatch(logoutUser())
                        navigation.navigate('ResumeProfile')
                    }}
                    iconStyle={styles.iconStyle}
                    // value={searchJobs}
                    onChangeText={(text) => {
                        filterData(text.toLowerCase())
                    }}
                    onSearchPress={() => navigation.navigate('SearchResult', { 'jobsfilter': filteredSearchJobs })}
                    onPress={() => refRBSheet.current.open()}
                />
                {/* <GestureRecognizer
                //   onSwipe={(direction, state) => this.onSwipe(direction, state)}
                //   onSwipeUp={(state) => this.onSwipeUp(state)}
                //   onSwipeDown={(state) => this.onSwipeDown(state)}
                //   onSwipeLeft={(state) => this.onSwipeLeft(state)}
                //   onSwipeRight={(state) => this.onSwipeRight(state)}
                onSwipeDown={(direction) => onSwipe(direction)}
                config={config}
                style={{
                    flex: 1,
                    // backgroundColor: this.state.backgroundColor
                }}
            > */}
                {/* <Text>{this.state.myText}</Text> */}
                {/* <Text>onSwipe callback received gesture: {this.state.gestureName}</Text> */}

                <View style={styles.flatList}>
                    <FlatList
                        horizontal
                        data={tags}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        extraData={selectedId}

                    />
                </View>

                <View style={styles.secondFlatList}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={filteredSearchJobs}
                        renderItem={JobRenderItem}
                        // onRefresh={()=>onSwipe()}
                        // refreshing={refresh}
                        keyExtractor={item => item.id}
                    />
                </View>
                {/* <CustomButton
                    style={{
                        marginTop: 10,
                        backgroundColor: Colors.LightBlue
                    }}
                    textStyle={{
                        textAlign: 'center',
                        color: Colors.White,
                        fontSize: 15,
                    }}
                    label={"Referesh"}
                    onPress={() => filterAPI()}
                /> */}
                <View style={styles.jobsListContainer}>
                    <Text style={styles.listHeading}>Jobs you have applied</Text> 
                    {appliedJobs?.length > 0 && <CustomButton
                        label={appliedJobs?.length >= 5 ? "See all" : null}
                        style={styles.buttonStyle}
                        textStyle={styles.textStyle}
                        onPress={() => navigation.navigate('AppliedApplication')}
                    />}
                </View>
                {/* <KeyboardAwareScrollView style={{ height: '100%' }}> */}
                <View style={styles.appliedFlatList}>

                    <FlatList
                        // style={{ flexGrow: 1 }}
                        data={appliedJobs}
                        vertical
                        extraData={appliedJobs.slice(0, 3)}
                        showsVerticalScrollIndicator={false}
                        renderItem={AppliedJobRenderItem}

                        keyExtractor={item => item.id}
                    />
                </View>
                {/* </KeyboardAwareScrollView> */}
                {/* <FilterModal
                    isVisible={modalVisible}
                    onPress={() => (setModalVisible(false))}
                    onFinish={() => (setModalVisible(false))}
                    navigation={navigation}
                /> */}

                {/* </GestureRecognizer> */}
                <Loader loading={loading} isShowIndicator={true} />
            </ScrollView>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={550}
                // openDuration={3000}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                        // backgroundColor:'red',
                        height: '50%',
                        // marginTop:80,
                        // marginBottom:80,
                        // minClosingHeight:100,
                        // borderRadius: 25,
                        // borderWidth: 1,
                        // borderColor: 'red',
                        width: '100%',
                        alignSelf: 'center',
                        marginTop: '20%'
                    },
                    container: {
                        alignSelf: 'center',
                        // backgroundColor:"red",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        height: '100%',
                        width: '100%'
                    },
                    draggableIcon: {
                        backgroundColor: "white"
                    }
                }}
            >
                <FilterModal
                    // isVisible={modalVisible}
                    onPress={() => refRBSheet.current.close()}
                    onFinish={() => (setModalVisible(false))}
                    navigation={navigation}
                />
            </RBSheet>
        </SafeAreaView>


    )
}

export default Home;

const styles = StyleSheet.create({

    item: {
        padding: 20,
        marginLeft: 5,
        marginHorizontal: 2,
    },

    title: {
        fontSize: 14,
        fontFamily: 'Roboto-Bold'
    },
    flatList: {
        // backgroundColor:'red',
        width: '100%',
        // height: 'auto'
    },
    jobInfoContainer: {
        shadowColor: Colors.White,
        width: 350,
        height: 150,
        alignSelf: 'auto',
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
        marginLeft: 20,
        marginHorizontal: 2

    },
    itemText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        marginBottom: 0,
        color:Colors.DarkGray
    },
    subText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.LightGray,
        marginBottom: 0
    },
    itemText1: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        marginLeft: 30,
        color:Colors.DarkGray

    },
    salaryLocationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginRight: 5,
        width: '80%',
        // backgroundColor:'red'
    },
    salary: {
        fontSize: 12,
        fontFamily: 'Roboto-Medium',
        color: Colors.LightGray,
        marginLeft: 5,
        marginRight: 120
    },
    location: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: Colors.LightGray,
        marginRight: 50,
        marginLeft: 0,
        // backgroundColor:'red'
    },

    subText1: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.LightGray,
        marginLeft: 30
    },
    dateStyle: {
        fontFamily: 'Roboto-Medium',
        color: Colors.LightGray,
        fontSize: 10,
        marginLeft: 30
    },

    textContainer: {
        backgroundColor: Colors.White,
        marginTop: 10,
        marginLeft: 20,
        flexDirection: 'row',
        // backgroundColor:'red'
    },
    textContainer2: {
        marginTop: 15,
        marginLeft: 15,
        flexDirection: 'row',
        // width:Dimensions.get('window').width,
        // backgroundColor:'red'
    },
    secondFlatList: {
        height: 170,
        // width:width+5,
        width: "100%",
        borderBottomWidth: 0.5,
        borderColor: Colors.LightGray,
        justifyContent: 'center',
        alignItems: 'center',

    },

    jobsListContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',


    },
    buttonStyle: {
        backgroundColor: Colors.White,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 0,
        margin: 10,
        width: 50,
        height: 40,
        marginRight: 15
    },
    textStyle: {
        color: Colors.LightBlue,
        fontFamily: 'Roboto-Bold',
        fontSize: 14
    },
    listHeading: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginLeft: 20,
        color:Colors.DarkGray
    },
    appliedFlatList: {
        // height: '100%',
        marginBottom: 10,
        // flex: 1
        // backgroundColor:'red'

    },
    appliedJobContainer: {
        shadowColor: Colors.White,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,

        // elevation: 1,
        width: '90%',
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.LightGray,
        marginTop: 5,
        marginHorizontal: 20,
        // backgroundColor:'red'
    },

    avatarCircle: {
        backgroundColor: Colors.LightGray,
        borderRadius: 30,
        borderColor: Colors.LightGray,
        borderWidth: 1,
        width: 40,
        height: 38,
        marginTop: 20,
        marginLeft: 20

    },
    avatarCircle2: {
        backgroundColor: Colors.LightGray,
        borderRadius: 30,
        borderColor: Colors.LightGray,
        borderWidth: 1,
        width: 58,
        height: 58,

    },
    // yellowContainer:{
    //     backgroundColor:Colors.Yellow,
    //     borderColor:Colors.Yellow,
    //     width:75.67,
    //     height:22,
    //     marginRight:30,
    //     marginTop:30,
    //     justifyContent:'space-evenly',
    //     flexDirection:'row',
    //     alignItems:'center'
    // },
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
    listView: {
        height: '100%',
        fontSize: 20,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }

});