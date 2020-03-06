import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/colors'

const CustomButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.btn, ...props.style }}>
        {props.title && <Text style={styles.btnText}>{props.title}</Text>}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.warning,
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
