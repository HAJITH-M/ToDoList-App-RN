import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { useState } from "react";
import { SignUpProps } from "./SignUpProps";

const SignUpVM = (props: SignUpProps) => {
  const [showToast, setShowToast] = useState(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
    if (key === 'email') {
      validateEmail(value);
    } else if (key === 'password') {
      validatePassword(value);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const isFormValid = () => {
    return form.email.length > 0 &&
            form.password.length > 0 &&
            !emailError &&
            !passwordError;
  };

  const apiurl = "https://rntodoapi.vercel.app";

  const HandleSignUp = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${apiurl}/register`, {
        email,
        password,
      });

      const token = response.data.token;
      await SecureStore.setItemAsync('userToken', token);

      // Set token expiry time (15 minutes from now)
      const expiryTime = new Date().getTime() + (15 * 60 * 1000);
      await SecureStore.setItemAsync('tokenExpiry', expiryTime.toString());

      await SecureStore.setItemAsync('userEmail', email);

      console.log(response.data);
      props.navigation.navigate("login");
      return token;
    } catch (error) {
      console.log(error);
      setShowToast(true);
      throw error;
    }
  };

  const NavigatesignIn = () => {
    props.navigation.navigate("login");
  };

  return {
    HandleSignUp,
    form,
    handleFormChange,
    NavigatesignIn,
    showToast,
    setShowToast,
    emailError,
    passwordError,
    isFormValid
  };
};

export default SignUpVM;