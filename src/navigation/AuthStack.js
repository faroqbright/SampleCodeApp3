import React, { useState, useEffect } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';




import SignIn from "../screens/SignIn";
import ForgotPassword from "../screens/ForgotPassword";
import Verify from "../screens/Verify";
import SignUp from "../screens/SignUp";
import CreateProfile from "../screens/CreateProfile";
import VideoComponent from "../components/VideoComponent";
import ResetPassword from "../screens/ResetPassword";

const Stack = createStackNavigator();


export default AuthStack = () => {

    const { routeToSignIn = true } = useSelector((state) => state.userSession)

    return (
        <Stack.Navigator headerMode='none' initialRouteName={routeToSignIn ? "SignIn" : "SignUp"}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Verify" component={Verify} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}