import { View,Image } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreenProps } from './SplashScreenProps';
import images from '../../../assets/assets';
import SplashScreenVM from './SplashScreenVM';
import { SplashScreenStyles } from './SplashScreenStyles';

const SplashScreen = (props: SplashScreenProps) => {
  const splashScreenVM = SplashScreenVM(props);

  useEffect(() => {
    setTimeout(() => {
      console.log("Splash Screen");
      splashScreenVM.splashHandle();
      // props.navigation.replace('carouselscreen')
    }, 5000);
  }, [])

  return (
    <View style={SplashScreenStyles.container}>
      <Image 
        source={images.SplashIcon}
        style={SplashScreenStyles.image}
        resizeMode="contain"
      />
    </View>
  )
}



export default SplashScreen