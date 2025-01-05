import { StyleSheet } from "react-native";

const LoginStyles = StyleSheet.create({
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
      paddingHorizontal: 20,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#333',
      borderRadius: 10,
      marginBottom: 5,
      borderWidth: 1,
      borderColor: 'transparent',
      paddingHorizontal: 15,
      color: 'white',
    },
    forgotPasswordContainer: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 25,
      marginTop: 10,
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
  
  export default LoginStyles