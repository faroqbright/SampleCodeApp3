import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView,useWindowDimensions, ScrollView } from 'react-native';

import {Style} from './Style'
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { getTermsOfUse } from '../../api/methods/auth';
import { useIsFocused } from '@react-navigation/native';

import RenderHtml from 'react-native-render-html';

export default TermsOfUse = ({navigation}) => {

    const [loading, setLoading] = useState(false)
    const [termsConditions, setTermsConditions] = useState('')

    const getTermsAndConditions = async () =>{
        try {
            setLoading(true)
            const response = await getTermsOfUse()
            console.log("Response=====>>>>",response.data.data)
            setTermsConditions(response.data.data.description)
            setLoading(false)
        } catch (error) {
            console.log(response.error)
            setLoading(false)
        }
    }

    const isFocused = useIsFocused()

    useEffect(()=>{
        if(isFocused){
            getTermsAndConditions()
        }
    },[isFocused])

    const source = {
        html: termsConditions
      };

    return (
        <SafeAreaView style={Style.mainContainer}>
            <Header
                label={"Terms of Use"}
                onPress={() => navigation.goBack()}
            />
                <ScrollView style={{height:'100%'}}>
            <View style={Style.innerContainer}>
            {/* <Text style={{
                fontSize:15,
                fontFamily:'Roboto-Regular'
            }}>
                {termsConditions?termsConditions:'There is nothing to show'}
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