import React, { useState } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import CreateProfileHeader from "./CreateProfileHeader";
import CustomButton from "./customButton"
import { Colors } from "../utils/Colors";
import Images from "../assets/Images";
import CustomInput from "./CustomInput";
import RNFC from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { candidateProfileAPI } from "../api/methods/auth";
// import Loader from './Loader'

export default UploadCVComponent = (props) => {

    const { onFinish,userData } = props

    // console.log("props========8888",props)
    const [singleFile, setSingleFile] = useState(null);

    const selectOneFile = async () => {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res[0].uri);
            console.log('Type : ' + res[0].type);
            console.log('File Name : ' + res[0].name);
            console.log('File Size : ' + res[0].size);
            //Setting the state to show single file attributes
            console.log("REssss===>>>",res)
            const source = {
                name: res[0].name,
                type: res[0].type,
                uri: res[0].uri
            }
            // const fileWithBase64 = await RNFC.readFile(res[0].uri, 'base64');
            setSingleFile(source);
            if(userData && typeof userData === 'function'){
                userData({resume:source})
            }

        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('You did not select any document');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const onFinishPress = async () => {
        if(onFinish && typeof onFinish === 'function'){
            onFinish()
        }
    //     try {
    //         setLoading(true)
    //         const formData = new FormData()
    //         formData.append('firstname', props.userData.firstname)
    //         formData.append('lastname', props.userData.lastname)
    //         formData.append('address_line1', props.userData.address_line1)
    //         formData.append('city', props.userData.city)
    //         formData.append('country_id', props.userData.country_id)
    //         formData.append('date_of_birth', props.userData.date_of_birth)
    //         formData.append('phone', props.userData.phone)
    //         formData.append('resume_headline', props.userData.resume_headline)
    //         formData.append('introduction_video', props. .introduction_video)
    //         formData.append('photo', 'photo')
    //         formData.append('resume', singleFile)
    //         //   console.log("->>>>>>>>>>>>>>",formData)
    //         const response = await candidateProfileAPI(formData)
    //         setLoading(false)
    //         // alert(response.status)
    //         console.log("API________________RESPONSE STATUS", response.status)
    //         console.log("API_DATA", response.data)
    //         if (response.status == 200) {
    //             console.log("Successful")
    //         }
    //         else {
    //             Alert.alert("API Error", response.status)
    //         }
    //     } catch (error) {
    //         console.log("Error-API", error)
    //         setLoading(false)
    //     }
    }

    return (

        <View style={styles.mainContainer}>
            <CreateProfileHeader
                heading={"Upload your CV"}
                paragraph={"Upload your CV or resume to apply for the jobs."}
                headerStyle={styles.headerStyle}
            />
            <View style={styles.imageContainer}>
                <Image
                    style={styles.cvImageStyle}
                    source={Images.cvImage}
                />
                {singleFile == null && (<CustomButton
                    label={"Upload CV"}
                    onPress={() => selectOneFile()}
                    style={styles.uploadButtonStyle}
                    textStyle={styles.buttonTextStyle}
                />)}
            </View>
            {singleFile != null && (<CustomInput
                icon={Images.crossIcon}
                fileIcon={Images.pdfIcon}
                fileIconStyle={styles.fileIconStyle}
                iconStyle={styles.iconStyle}
                mainStyle={styles.uploadField}
                editable={false}
                value={singleFile.name}
                placeholder={'File Name'}
                innerStyle={styles.uploadFieldText}
                openFile={() => selectOneFile()}
                onPress={() => setSingleFile(null)}
            />)}
            {/* <CustomButton
                label={"Finish"}
                onPress={() => onFinishPress()}
                style={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
            /> */}
            {singleFile != null && (<CustomButton
                label={"Finish"}
                onPress={() => onFinishPress()}
                style={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
            />)}
            
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.White,

    },
    headerStyle: {
        width: '93%',
        marginTop: 30
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
    uploadButtonStyle: {
        backgroundColor: Colors.LightBlue,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',
        height: 44,
        // marginTop:30
        // marginTop:'auto'

    },
    buttonTextStyle: {
        color: Colors.White,
        fontFamily: 'Roboto-Bold',
        fontSize: 16,

        textAlign: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 300,
        backgroundColor: Colors.White,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        margin: 20,
        marginTop: 20

    },
    cvImageStyle: {
        // width:'90%',
        resizeMode: 'contain',
        height: 250,
        margin: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadField: {
        backgroundColor: '#F5F6FA',
        marginTop: -10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor:'red'

    },
    uploadFieldText: {
        fontSize: 16,
        textAlign: 'justify',
        fontFamily: 'Roboto-Regular',
        marginRight: 'auto',
        color: '#CBC9D9',
    },
    iconStyle: {
        marginRight: 10,
        marginBottom: 20
    },
    fileIconStyle: {
        marginLeft: 10,
    }
})