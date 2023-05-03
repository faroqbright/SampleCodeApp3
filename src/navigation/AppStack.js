import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from "react-redux";

import Splash from "../screens/Splash";
import Home from "../screens/Home";
import AppliedApplication from "../screens/AppliedApplication";
import ResumeProfile from "../screens/ResumeProfile";
import EditProfile from "../screens/EditProfile";
import SearchResult from "../screens/SearchResult";
import CompanyDetails from "../screens/CompanyDetails";
import ConformationScreen from "../screens/ConformationScreen"
import AppliedConformationScreen from "../screens/AppliedConformationScreen";
import SimiliarJobs from "../screens/SimiliarJobs";
import SimilarJobsDetail from "../screens/SimilarJobsDetail";
import FilteredSearchResult from "../screens/FilteredSearchResult";
import SettingsProfile from "../screens/SettingsProfile";
import ContactUs from "../screens/ContactUs";
import AccountSettings from "../screens/AccountSettings";
import ChangePassword from "../screens/ChangePassword";
import TermsOfUse from "../screens/TermsOfUse";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import CookiePolicy from "../screens/CookiePolicy";

const Stack = createStackNavigator();

export default AppStack = () => {

    const { isProfieCompleted } = useSelector((state) => state.userSession)

    return (
        <Stack.Navigator headerMode='none' initialRouteName='Home'>
            <Stack.Screen name="Home" component={isProfieCompleted ? Home : CreateProfile} />
            <Stack.Screen name="AppliedApplication" component={AppliedApplication} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ResumeProfile" component={ResumeProfile} />
            <Stack.Screen name="SearchResult" component={SearchResult} />
            <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
            <Stack.Screen name="ConformationScreen" component={ConformationScreen} />
            <Stack.Screen name="AppliedConformationScreen" component={AppliedConformationScreen} />
            <Stack.Screen name="SimiliarJobs" component={SimiliarJobs} />
            <Stack.Screen name="SimilarJobsDetail" component={SimilarJobsDetail} />
            <Stack.Screen name="FilteredSearchResult" component={FilteredSearchResult} />
            <Stack.Screen name="SettingsProfile" component={SettingsProfile} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="AccountSettings" component={AccountSettings} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="CookiePolicy" component={CookiePolicy} />
        </Stack.Navigator>
    )
}