import axios from "axios";
import { useState } from "react";
import { SignUpProps } from "./SignUpProps";

const SignUpVM = (props: SignUpProps) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const apiurl = "https://rntodoapi.vercel.app";

  const HandleSignUp = async (email: string, password: string) => {
    try {
      const respose = await axios.post(`${apiurl}/register`, {
        email,
        password,
      });

      console.log(respose.data);
      props.navigation.navigate("login");
    } catch (error) {
      console.log(error);
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
  };
};

export default SignUpVM;
