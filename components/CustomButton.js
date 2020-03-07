import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native'
import Colors from '../constants/colors'

const CustomButton = props => {
  const ButtonComponent =
    Platform.OS === 'android' && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity
  return (
    <View style={styles.btnWrapper}>
      <ButtonComponent onPress={props.onPress}>
        <View style={{ ...styles.btn, ...props.style }}>
          {props.title && (
            <Text style={{ ...styles.btnText, ...props.textStyle }}>
              {props.title}
            </Text>
          )}
        </View>
      </ButtonComponent>
    </View>
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
  btnWrapper: {
    borderRadius: 25,
    overflow: 'hidden',
  },
})

export default CustomButton

CustomButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
}
