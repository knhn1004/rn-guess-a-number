import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const CustomButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          ...styles.btn,
          ...props.style,
          backgroundColor: props.bgColor || Colors.warning,
        }}
      >
        <Ionicons name={props.name} size={props.size} color={props.color} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  btnText: {
    color: '#fff',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
})

export default CustomButton
