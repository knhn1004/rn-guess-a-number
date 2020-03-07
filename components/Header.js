import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Platform } from 'react-native'
import TitleText from './TitleText'
import Colors from '../constants/colors'

const Header = props => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  headerIOS: {
    height: 150,
    // backgroundColor: '#fff',
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
  },
  headerAndroid: {
    height: 90,
    // backgroundColor: Colors.primary,
  },
  headerTitle: {
    fontSize: Platform.OS === 'ios' ? 42 : 32,
    // color: Platform.OS === 'android' ? '#fff' : Colors.primary,
    color: '#fff'
  },
})

export default Header

Header.propTypes = {
  title: PropTypes.string.isRequired,
}
