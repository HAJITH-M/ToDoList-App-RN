import { useEffect, useRef } from 'react';
import { Animated,  Dimensions, Platform } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { ToastComponentProps } from './ToastComponentProps';
const SCREEN_WIDTH = Dimensions.get('window').width;

export const ToastComponentVM = (props: ToastComponentProps) => {
    
const fadeAnim = useRef(new Animated.Value(0)).current;
const slideAnim = useRef(new Animated.Value(-100)).current;

const icons = {
  success: 'check-circle',
  error: 'alert-circle',
  info: 'information',
  warning: 'alert'
};

const colors = {
  success: '#4caf50',
  error: '#f44336',
  info: '#2196f3',
  warning: '#ff800'
};

const getPosition = () => {
  switch (props.position) {
    case "bottom":
      return { bottom: Platform.OS === 'ios' ? 50 : 30 };
    case 'center':
      return { top: '40%' };
    default:
      return { top: Platform.OS === 'ios' ? 50 : 30 };
  }
};

useEffect(() => {
  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.spring(slideAnim, {
      toValue: 0,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    })
  ]).start();

  const timer = setTimeout(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      if (props.onClose) {
        props.onClose();
      }
    });
  }, props.duration || 3000);

  return () => clearTimeout(timer);
}, []);

return {
  getPosition,
  icons,
  colors,
  fadeAnim,
  slideAnim,
  SCREEN_WIDTH
};
}