import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ButtonComponentProps } from './ButtonComponentProps'

const ButtonComponentView = (props:ButtonComponentProps) => {
  return (

    <TouchableOpacity onPress={props.onPress} style={[{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }, props.style]}>
      <Text style={[{ color: 'white', textAlign: 'center', fontSize: 18, width:110, padding:5 }, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>

  )
}

export default ButtonComponentView