import React from 'react'
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import CustomButton from '../components/CustomButton'

const GameOver = ({ roundsNumber, userNumber, restartGame }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
      <TitleText style={styles.title}>GAME OVER</TitleText>
	<View style={styles.imgWrapper}>
	<Image
	  style={styles.image}
	  // source={require('../assets/gameover.png')}
  source={{
    uri:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwEXvLDBfG0udW3t7JK1BGkg7oid6ln3SLXiaESD67tbt4yBbZ',
	  }}
	  resizeMode="cover"
	/>
	</View>
	<View style={styles.resultWrapper}>
	  <BodyText style={styles.resultText}>
	  It took your phone{' '}
	  <Text style={styles.highlight}>{roundsNumber}</Text> rounds to get
	  your number: <Text style={styles.highlight}>{userNumber}</Text>
	  </BodyText>
	</View>
	<View style={styles.buttonWrapper}>
	<CustomButton
	  style={styles.newGameBtn}
	  textStyle={styles.newGameBtnText}
	  title="NEW GAME"
	  onPress={restartGame}
	/>
	</View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  title: {
    fontSize: 38,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonWrapper: {
    marginTop: 20,
  },
  imgWrapper: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
    borderRadius: 150,
    // borderWidth: 3,
    // borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultWrapper: {
    width: '80%',
    marginVertical: Dimensions.get('window').height / 60,
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 550 ? 12 : 20,
  },
  newGameBtn: {
    backgroundColor: '#3282b8',
  },
  newGameBtnText: {
    fontSize: Dimensions.get('window').height < 550 ? 12 : 20,
  }
})

export default GameOver
