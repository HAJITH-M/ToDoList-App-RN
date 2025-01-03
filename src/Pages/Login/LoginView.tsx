import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { LoginProps } from './LoginProps'
import LoginVM from './LoginVM'
import ButtonComponentView from '../Components/ButtonComponent/ButtonComponentView'
import { ToastComponentView } from '../Components/ToastComponent/ToastComponentView'
import LoginStyles from './LoginStyles'

const Login = (props: LoginProps) => {

  const loginVM = LoginVM(props)

  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.contentContainer}>
        <Text style={LoginStyles.title}>Login here</Text>
        <Text style={LoginStyles.description}>Welcome back you've been missed!</Text>

        {loginVM.showToast && (
          <ToastComponentView
            message="Invalid User"
            type="error"
            duration={3000} 
            position="bottom"
            showIcon={true}
            onClose={() => loginVM.setShowToast(false)}
          />   
        )}

        <View style={{width: '100%', marginBottom: 10}}>

        <TextInput
          style={[LoginStyles.input, loginVM.emailError ? {borderColor: 'red'} : null]}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => loginVM.handleFormChange('email', text)}
          value={loginVM.form.email}
        />
        {loginVM.emailError && <Text style={{color: 'red', fontSize: 12, flex:0, textAlign: 'left'}}>{loginVM.emailError}</Text>}
        
        </View>

        <View style={{width: '100%'}}>
        <TextInput
          style={[LoginStyles.input, loginVM.passwordError ? {borderColor: 'red'} : null]}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          onChangeText={(text) => loginVM.handleFormChange('password', text)}
          value={loginVM.form.password}
        />
        {loginVM.passwordError && <Text style={{color: 'red', fontSize: 10}}>{loginVM.passwordError}</Text>}
        
        </View>
        <View style={LoginStyles.forgotPasswordContainer}>
          <TouchableOpacity>
            <Text style={LoginStyles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[LoginStyles.signInButton,
            //  (!loginVM.isFormValid() ? {opacity: 0.5} : null)
            ]} 
          onPress={() => loginVM.HandleLoginIn(loginVM.form.email, loginVM.form.password)}
          disabled={!loginVM.isFormValid()}
        >
          <Text style={LoginStyles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <View>
          <View style={LoginStyles.orContainer}>
            <View style={LoginStyles.orLine} />
            <Text style={LoginStyles.orText}>Or continue with</Text>
            <View style={LoginStyles.orLine} />
          </View>

          <View style={LoginStyles.socialButtonsContainer}>
            <TouchableOpacity style={LoginStyles.socialButton}>
              <FontAwesome name="google" size={24} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={LoginStyles.socialButton}>
              <FontAwesome name="facebook" size={24} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={LoginStyles.socialButton}>
              <FontAwesome name="windows" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={LoginStyles.signUpContainer}>
        <Text style={LoginStyles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={[LoginStyles.signUpText, LoginStyles.signUpLink]} onPress={loginVM.NavigateSignUp}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login