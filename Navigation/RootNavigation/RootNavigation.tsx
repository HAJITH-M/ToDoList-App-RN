import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './typesRootNavigatin';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../../src/Screens/SplashScreen/SplashScreen';
import CarouselScreen from '../../src/Screens/CarouselScreens/CarouselScreen';


const RootNavigation = () => {

    const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='splashscreen'>
            <Stack.Screen name="splashscreen" component={SplashScreen} options={{headerShown: false}} />
            <Stack.Screen name="carouselscreen" component={CarouselScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation