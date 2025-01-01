import axios from "axios"
import * as SecureStore from 'expo-secure-store'
import { useState } from "react"
import { LoginProps } from "./LoginProps";

const LoginVM = (props: LoginProps ) => {

    
    const [form, setForm] = useState({
        email: '',
        password: '',
      });

    const handleFormChange = (key: string, value: string) => {
      setForm({ ...form, [key]: value });
    };

    const apiurl = "https://rntodoapi.vercel.app"

    const HandleLoginIn =  async (email:string, password:string) =>{
        try{
            const response = await axios.post(`${apiurl}/login`,{
                email,
                password
            })
            
            const token = response.data.token
            await SecureStore.setItemAsync('userToken', token)
            
            // Set token expiry time (15 minutes from now)
            const expiryTime = new Date().getTime() + (15 * 60 * 1000)
            await SecureStore.setItemAsync('tokenExpiry', expiryTime.toString())
           
            console.log(response.data)
            props.navigation.navigate('homepage')
            return token
        }
        catch(error){
            console.log(error)
            throw error
        }
    }
    
      const NavigateSignUp = () => {
        props.navigation.navigate('signup');
      };



  return {

    HandleLoginIn,
    form,
    handleFormChange,
    NavigateSignUp,
    
  }
}

export default LoginVM