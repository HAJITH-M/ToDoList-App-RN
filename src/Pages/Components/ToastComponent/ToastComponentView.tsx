import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity,  View, Dimensions, Platform } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { ToastComponentProps } from './ToastComponentProps';
import { ToastComponentVM } from './ToastComponentVM';
const SCREEN_WIDTH = Dimensions.get('window').width;


export const ToastComponentView = (props: ToastComponentProps) => {

    const toastComponentVM = ToastComponentVM(props);

  return (
    <Animated.View 
      style={[
        styles.container,
        toastComponentVM.getPosition() as any,
        {
          opacity: toastComponentVM.fadeAnim,
          transform: [{ translateY: toastComponentVM.slideAnim }]
        }
      ]}
    >

    
      <View style={[styles.toast, { backgroundColor: toastComponentVM.colors[props.type] }]}>
        {props.showIcon && (
          <Icon 
            name={toastComponentVM.icons[props.type] as any} 
            size={24} 
            color="white" 
            style={styles.icon} 
          />
        )}
        <Text style={styles.message} numberOfLines={2}>
          {props.message}
        </Text>
        <TouchableOpacity 
          onPress={() => {
            Animated.parallel([
              Animated.timing(toastComponentVM.fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(toastComponentVM.slideAnim, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
              })
            ]).start(() => {
              if (props.onClose) {
                props.onClose();
              }
            });
          }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Icon 
            name="close" 
            size={20} 
            color="white" 
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    maxWidth: SCREEN_WIDTH - 30,
    minWidth: 300,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  icon: {
    marginRight: 10,
  },
  message: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 10,
  }
});

export default ToastComponentView;