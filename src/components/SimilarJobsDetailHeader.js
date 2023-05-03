import React, {useState} from "react";
import { StyleSheet, View, Dimensions, FlatList, Text, Image } from "react-native"
import { Colors } from '../utils/Colors'
import Header from './Header'
import Images from "../assets/Images";
import CustomButton from "./customButton";

// const jobInfo = [{
//     id: '1',
//     title: 'Company Name',
//     subHeading: "Position ",
//     salary: '5K/month',
//     location: 'Toronto, Canada',
//     Image: Images.dollarIcon,
//     locationImage: Images.locationIcon


// }
// ]

// const JobRenderItem = ({ item }) => (
//     <View style={styles.jobInfoContainer}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 48, }}>
//         <Image
//                 style={{width:48, height:48, marginLeft:20, marginTop:25 }}
//                 source={Images.companyImagePlaceHolder}
//             />
//             <View style={styles.CompanyNameContainer}>
//                 <Text style={styles.itemText}>{item.title}</Text>
//                 <Text style={styles.subText}>{item.subHeading}</Text>
//             </View>
//             <CustomButton
//             style={{backgroundColor:Colors.Yellow,
                
//                 borderColor:Colors.Yellow,
//                 width:78.67,
//                 height:25,
//                 marginRight:20,
//                 marginTop:30,
//                 justifyContent:'space-evenly',
//                 flexDirection:'row',
//                 alignItems:'center'}}
//                 disabled={true}
//             source={Images.briefCaseIcon}
//             imageStyle={styles.briefiCase}
//             label={"Full-time"}
//             textStyle={styles.yellowTextStyle}
//         />
//         </View>
//         <View style={styles.textContainer}>
//             <View style={styles.salaryLocationContainer}>
//                 <Image style={{ width: 20, 
//                                 height: 20,
//                                 marginLeft:65,
//                                 marginRight:0 
//                                 }} source={item.Image} />
//                 <Text style={styles.salary}>{item.salary}</Text>
//                 <Image style={{ width: 15, 
//                                 height: 20, 
//                                 marginRight:-10,
//                                 marginLeft:5,
//                                 // backgroundColor:'red'
//                                 }} source={item.locationImage} />
//                 <Text style={styles.location}>{item.location}</Text>
//             </View>
//         </View>
//         <View>

//         </View>
//     </View>
// );

export default SimilarJobsDetailHeader = (props) => {
    const [selectedId, setSelectedId] = useState('1');
    return (
        <View style={[styles.mainContainer, props.headerMainContainer ]}>
            <View>
            <Header
                headerContainer={styles.headerContainer}
                source={props.backIcon}
                backButtonStyle={styles.backButtonStyle}
                label={props.label}
                headerTextStyle={styles.headerTextStyle}
                settingIconSource={props.settingIconSource}
                settingIconImageStyle={styles.settingButtonStyle}
                settingIconPress={()=>props.settingIconPress()}
                onPress={()=>props.onBackButtonPress()}
            />
            {/* <View style={styles.secondFlatList}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={jobInfo}
                    renderItem={JobRenderItem}

                    keyExtractor={item => item.id}
                />
            </View> */}
            <View style={styles.jobInfoContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 48, }}>
        <Image
                style={{width:48, height:48, marginLeft:20, marginTop:25 }}
                source={require('../assets/Images/companyImagePlaceHolder.png')}
            />
            <View style={styles.CompanyNameContainer}>
                <Text style={styles.itemText}>{props?.detailParams?.user?.organization_name}</Text>
                <Text style={styles.subText}>{props?.detailParams?.position}</Text>
            </View>
            <CustomButton
            style={{backgroundColor:props?.detailParams?.job_type==1? Colors.Yellow : props?.detailParams?.job_type==2? Colors.Blue : props?.detailParams?.job_type==3? Colors.Maroon : props?.detailParams?.job_type==4?Colors.LightBlue:props?.detailParams?.job_type==5?Colors.LightGreen:props?.detailParams?.job_type==6?Colors.Red: Colors.Yellow,
                
                borderColor: props?.detailParams?.job_type==1? Colors.Yellow : props?.detailParams?.job_type==2? Colors.Blue : props?.detailParams?.job_type==3? Colors.Maroon : props?.detailParams?.job_type==4?Colors.LightBlue:props?.detailParams?.job_type==5?Colors.LightGreen:props?.detailParams?.job_type==6?Colors.Red: Colors.Yellow,
                width:78.67,
                height:25,
                marginRight:20,
                marginTop:30,
                justifyContent:'space-evenly',
                flexDirection:'row',
                alignItems:'center'}}
                disabled={true}
            source={Images.briefCaseIcon}
            imageStyle={styles.briefiCase}
            label={props?.detailParams?.job_type==1?'Job Trial':props?.detailParams?.job_type==2?'Permanent':props?.detailParams?.job_type==3?'Temporary':props?.detailParams?.job_type==4?'Contract':props?.detailParams?.job_type==5?'Remote':'Part Time'}
            textStyle={styles.yellowTextStyle}
        />
        </View>
        <View style={styles.textContainer}>
            <View style={styles.salaryLocationContainer}>
                <Image style={{ width: 20, 
                                height: 20,
                                marginLeft:65,
                                marginRight:0 
                                }} source={Images.dollarIcon} />
                <Text style={styles.salary}>{props?.detailParams?.salary}</Text>
                <Image style={{ width: 15, 
                                height: 20, 
                                marginRight:-10,
                                marginLeft:5,
                                // backgroundColor:'red'
                                }} source={Images.locationIcon} />
                <Text style={styles.location}>{props?.detailParams?.user?.city}{','} {props?.detailParams?.location}</Text>
            </View>
        </View>
        <View>

        </View>
    </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 'auto',
        // backgroundColor: 'red'
        backgroundColor:Colors.GreenBlue
    },
    headerContainer: {
        height: 'auto',
        width: '100%',
        // backgroundColor:'red',
        backgroundColor:Colors.GreenBlue,
        // marginBottom: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    backButtonStyle: {
        marginLeft: 20,
        marginTop: 20,
        width: 30,
        height: 30,
        // backgroundColor:'red'
    },
    headerTextStyle: {
        // marginLeft:'40%',
        marginLeft: 70,
        // backgroundColor:'blue',
        width: 150,
        height: 30,
        // alignContent:'center',
        color: Colors.White,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    settingButtonStyle: {
        marginLeft: 20,
        marginBottom:15,
        marginRight:20,
        // marginTop:'auto',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 22,
        width: 22,
        // backgroundColor:'red'
    },
    secondFlatList: {
        // height: Dimensions.get('window').height,
        // width:width+5,
        width:"100%",
        height:'auto',
        // backgroundColor:'red',
        borderBottomWidth: 0.5,
        borderColor:Colors.LightGray,
        justifyContent:'center',
        alignItems:'center', 
        
    },
    jobInfoContainer: {
        width: Dimensions.get('window').width,
        height: 'auto',
        marginBottom:0,
        alignSelf: 'center',
        backgroundColor: Colors.GreenBlue,

    },
    avatarCircle: {
        backgroundColor: Colors.White,
        borderRadius: 30,
        borderColor: Colors.LightGray,
        borderWidth: 1,
        width: 60,
        height: 60,
        marginTop: 20,
        marginLeft: 20

    },
    textContainer: {
        backgroundColor: Colors.GreenBlue,
        // backgroundColor:'red',
        marginTop: 35,
        marginBottom:10,
        width:Dimensions.get('window').width,
        marginLeft: 20,
        flexDirection: 'row'
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
    itemText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color:Colors.InputField,
        marginBottom: 0
    },
    subText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.InputField,
        marginBottom: 0
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
        color: Colors.InputField,
        marginLeft: 1,
        marginRight: 0,
        marginLeft:10
    },
    location: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: Colors.InputField,
        marginRight: 50,
        marginLeft: 20,
        // backgroundColor:'yellow'
    },
    CompanyNameContainer: {
        // backgroundColor: 'red',
        marginRight: 'auto',
        alignSelf:'center',
        // alignItems:'center',
        justifyContent:'center',
        marginTop:50,
        marginLeft:5,
        height:50
    }

});