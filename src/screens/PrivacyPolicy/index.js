import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, useWindowDimensions, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';

import {Style} from './Style'
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { getPrivacyPolicy } from '../../api/methods/auth';
import { useIsFocused } from '@react-navigation/native';


export default PrivacyPolicy = ({navigation}) => {

    const [loading, setLoading] = useState(false)
    const [privacyPolicyData, setPrivacyPolicyData] = useState('')

    const privacyPolicy = async () =>{
        try {
            setLoading(true)
            const response = await getPrivacyPolicy()
            console.log("Response=====>>>>",response.data.data)
            setPrivacyPolicyData(response.data.data.description)
            setLoading(false)
        } catch (error) {
            console.log(response.error)
            setLoading(false)
        }
    }

    const isFocused = useIsFocused()

    useEffect(()=>{
        if(isFocused){
            privacyPolicy()
        }
    },[isFocused])

    const source = {
        html: privacyPolicyData
      };

    return (
        <SafeAreaView>
            <Header
                label={"Privacy Policy"}
                onPress={() => navigation.goBack()}
            />
                <ScrollView style={{height:'100%'}}>
            <View style={Style.innerContainer}>
            {/* <Text style={{
                fontSize:15,
                fontFamily:'Roboto-Regular'
            }}>
                {privacyPolicyData?privacyPolicyData:'There is nothing to show'}
            </Text> */}
            <RenderHtml
                contentWidth={useWindowDimensions}
                source={source}
            />
            </View>
            </ScrollView>
            <Loader
                loading={loading} isShowIndicator={true}
            />
        </SafeAreaView>
    )
}