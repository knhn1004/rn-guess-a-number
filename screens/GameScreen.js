import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import CustomButton from '../components/CustomButton'
import Colors from '../constants/colors'
import BodyText from '../components/BodyText'
import IconButton from '../components/IconButton'

const genRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const randomNum = Math.floor(Math.random() * (max - min)) + min
  if (randomNum === exclude) {
    return genRandomBetween(min, max, exclude)
  } else {
    return randomNum
  }
}

const GameScreen = ({ userChoice, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(
    genRandomBetween(1, 100, userChoice),
  )
  const [rounds, setRounds] = useState(0)

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds)
    }
  }, [rounds])

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction == 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ])
      return
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess
    }
    const nextNumber = genRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    )
    setCurrentGuess(nextNumber)
    setRounds(currentRounds => currentRounds + 1)
  }

  return (
    <View style={styles.screen}>
      <BodyText>Opponent&apos;s Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <IconButton
          onPress={() => nextGuessHandler('lower')}
          name="md-remove"
          color="white"
          size={24}
	  bgColor={Colors.danger}
        />
        <IconButton
          onPress={() => nextGuessHandler('greater')}
          name="md-add"
          color="white"
	  bgColor={Colors.success}
          size={24}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, // take up all available space
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '80%',
  },
})

export default GameScreen
