import React from 'react'
import { View, StyleSheet, Button, Image, Text } from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import CustomButton from '../components/CustomButton'

const GameOver = ({ roundsNumber, userNumber, restartGame }) => {
  return (
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
          style={{ backgroundColor: '#3282b8' }}
          title="NEW GAME"
          onPress={restartGame}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 300,
    height: 300,
    borderRadius: 150,
    // borderWidth: 3,
    // borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultWrapper: {
    width: '80%',
    marginVertical: 15,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
})

export default GameOver
