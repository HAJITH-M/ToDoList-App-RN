import { SplashScreenProps } from "./SplashScreenProps"
import * as SecureStore from 'expo-secure-store';

const SplashScreenVM = (props: SplashScreenProps) => {

    const Token = SecureStore.getItemAsync('Token')
    
         const splashHandle = () => {
            if(!Token){
                props.navigation.replace('carouselscreen')
              }
              else{
                props.navigation.replace('homepage')
              }
            }
    
    return{
        splashHandle
    }
}

export default SplashScreenVM