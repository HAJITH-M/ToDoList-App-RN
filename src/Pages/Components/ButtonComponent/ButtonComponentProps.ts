import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface ButtonComponentProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    
  }