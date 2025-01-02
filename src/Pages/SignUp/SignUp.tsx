import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { SignUpProps } from './SignUpProps'
import SignUpVM from './SignUpVM'
import { ToastComponentView } from '../Components/ToastComponent/ToastComponentView'

const SignUp = (props: SignUpProps) => {
  const signUpVM = SignUpVM(props)

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.description}>Create an account so you can explore all the existing jobs</Text>

        {signUpVM.showToast && (
          <ToastComponentView
            message="User already exists"
            type="error"
            duration={3000}
            position="bottom"
            showIcon={true}
            onClose={() => signUpVM.setShowToast(false)}
          />
        )}
        
        <View style={{width: '100%', marginBottom: 10}}>
          <TextInput
            style={[styles.input, signUpVM.emailError ? {borderColor: 'red'} : null]}
            placeholder="Email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => signUpVM.handleFormChange('email', text)}
            value={signUpVM.form.email}
          />
          {signUpVM.emailError && <Text style={{color: 'red', fontSize: 12, flex:0, textAlign: 'left'}}>{signUpVM.emailError}</Text>}
        </View>
        
        <View style={{width: '100%'}}>
          <TextInput
            style={[styles.input, signUpVM.passwordError ? {borderColor: 'red'} : null]}
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry
            onChangeText={(text) => signUpVM.handleFormChange('password', text)}
            value={signUpVM.form.password}
          />
          {signUpVM.passwordError && <Text style={{color: 'red', fontSize: 10}}>{signUpVM.passwordError}</Text>}
        </View>
        
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.signInButton}
          onPress={() => signUpVM.HandleSignUp(signUpVM.form.email, signUpVM.form.password)}
          disabled={!signUpVM.isFormValid()}
        >
          <Text style={styles.signInText}>Submit</Text>
        </TouchableOpacity>

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
        <TouchableOpacity>
          <Text style={[styles.signUpText, styles.signUpLink]} onPress={signUpVM.NavigatesignIn}>Sign in</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
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

export default SignUp