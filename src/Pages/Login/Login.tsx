import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { LoginProps } from './LoginProps'
import LoginVM from './LoginVM'
import ButtonComponentView from '../Components/ButtonComponent/ButtonComponentView'

const Login = (props: LoginProps) => {
  const loginVM = LoginVM(props)


  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Login here</Text>
        <Text style={styles.description}>Welcome back you've been missed!</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => loginVM.handleFormChange('email', text)}
          value={loginVM.form.email}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          onChangeText={(text) => loginVM.handleFormChange('password', text)}
          value={loginVM.form.password}
        />
        
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText} onPress={() => loginVM.HandleLoginIn(loginVM.form.email, loginVM.form.password)}>Sign In</Text>
        </TouchableOpacity>

        <ButtonComponentView title='testButton' onPress={() => loginVM.HandleLoginIn(loginVM.form.email, loginVM.form.password)} textStyle={{color: 'white'}} style={{backgroundColor: '#007AFF'}} />

        <View>
        <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>Or continue with</Text>
        <View style={styles.orLine} />
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="windows" size={24} color="#888" />
        </TouchableOpacity>
      </View>
        </View>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity >
            <Text style={[styles.signUpText, styles.signUpLink]} onPress={loginVM.NavigateSignUp}>Sign up</Text></TouchableOpacity>
      </View>

      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 35,
  },
  contentContainer: {
    flex: 1,
    marginTop:60,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 90,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 15,
    
    paddingHorizontal: 15,
    color: 'white',
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 25,
  },
  forgotPassword: {
    color: '#888',
  },
  signInButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signUpText: {
    color: '#888',
    fontSize: 14,
  },
  signUpLink: {
    color: '#007AFF',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  orText: {
    color: '#888',
    marginHorizontal: 10,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
})

export default Login