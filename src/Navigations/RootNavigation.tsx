import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './typesRootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../Pages/SplashScreen/SplashScreen';
import CarouselScreen from '../Pages/CarouselScreens/CarouselScreen';
import Login from '../Pages/Login/LoginView';
import SignUp from '../../src/Pages/SignUp/SignUp';
import HomePage from '../Home/ToDoHomePageView';

import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import ProfilePage from '../Pages/ProfilePage/ProfilePageView';

// Configure Reanimated logger at the app root level
configureReanimatedLogger({
  level: ReanimatedLogLevel.error, // Only show errors, suppress warnings
  strict: false, // Disable strict mode to prevent value access warnings
});


const RootNavigation = () => {

    const Stack = createStackNavigator<RootStackParamList>();
  return (
    <>
    <StatusBar  />
    <NavigationContainer>
        <Stack.Navigator id={undefined} initialRouteName='splashscreen'>
            <Stack.Screen name="splashscreen" component={SplashScreen} options={{headerShown: false}} />
            <Stack.Screen name="carouselscreen" component={CarouselScreen} options={{headerShown: false}} />
            <Stack.Screen name="login" component={Login} options={{headerShown: false}} /> 
            <Stack.Screen name="signup" component={SignUp} options={{headerShown: false}} />
            <Stack.Screen name="homepage" component={HomePage} options={{headerShown: false}} />
            <Stack.Screen name="profile" component={ProfilePage} options={{headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
    </>

  )
}

export default RootNavigation