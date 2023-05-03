import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

//Screens
import Splash from "../screens/Splash";
import Welcome from "../screens/Welcome";

//Stacks
import AuthStack from "./AuthStack"
import AppStack from "./AppStack"

import { useSelector } from "react-redux";

const Stack = createStackNavigator()



export default Routes = () => {

    // useEffect(() => {
        // GoogleSignin.configure({
        //     webClientId: '185261002481-2bso1e4bqf2j9gppko3l2094pmrsu6e9.apps.googleusercontent.com',
        // });
    // }, [])

    const { isOnboardingVisited, isSignedIn } = useSelector((state) => state.userSession)

    const getNextScreen = () => {
        if (isOnboardingVisited) {
            if (isSignedIn) return <Stack.Screen name='AfterSplash' component={AppStack} />
            else return <Stack.Screen name='AfterSplash' component={AuthStack} />
        } else return <Stack.Screen name="AfterSplash" component={Welcome} />
    }
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={'none'}>
                <Stack.Screen name='Splash' component={Splash} />
                {getNextScreen()}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
