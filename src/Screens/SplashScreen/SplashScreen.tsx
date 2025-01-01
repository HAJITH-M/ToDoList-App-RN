import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreenProps } from './SplashScreenProps';
import images from '../../../assets/assets';

const SplashScreen = (props: SplashScreenProps) => {

  useEffect(() => {
    setTimeout(() => {
      console.log("Splash Screen");
      props.navigation.replace('carouselscreen')
    }, 5000);
  }, [])

  return (
    <View style={styles.container}>
      <Image 
        source={images.SplashIcon}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'

  },
  image: {
    width: 120,
    height: 120,
  }
});

export default SplashScreen