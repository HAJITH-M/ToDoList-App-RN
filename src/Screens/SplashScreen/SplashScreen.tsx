import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreenProps } from './SplashScreenProps';

const SplashScreen = (props: SplashScreenProps) => {

  useEffect(() => {
    setTimeout(() => {
      console.log("Splash Screen");
      props.navigation.replace('carouselscreen')
    }, 1000);
  }, [])

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen