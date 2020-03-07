import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native'
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
  const initalGuess = genRandomBetween(1, 100, userChoice)
  const [currentGuess, setCurrentGuess] = useState([initalGuess ])
  // const [rounds, setRounds] = useState(0)
  const [pastGuesses, setPastGuesses] = useState([initalGuess ])

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [pastGuesses])

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
    // setRounds(currentRounds => currentRounds + 1)
    setPastGuesses(prevGuesses => [nextNumber , ...prevGuesses])
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
      <View style={styles.listContainer}>
        {/* 
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => (
            <View key={index} style={styles.listItem}>
              <BodyText>#{pastGuesses.length - index}</BodyText>
              <BodyText>{guess}</BodyText>
            </View>
          ))}
	</ScrollView> */}
        <FlatList
	  contentContainerStyle={styles.list}
          keyExtractor={(item, index) => index.toString()}
          data={pastGuesses}
          renderItem={item => (
            <View style={styles.listItem}>
              <BodyText>#{pastGuesses.length - item.index}</BodyText>
              <BodyText>{item.item}</BodyText>
            </View>
          )}
        />
      </View>
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
    marginTop: 10,
    width: 400,
    maxWidth: '80%',
  },
  listContainer: {
    width: '80%',
    flex: 1,
  },
  list: {
    justifyContent: 'flex-end',
    flexGrow: 1,
    // 'flexGrow' is flexible and take up 1 portion but not necesarrily take up all available space
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
})

export default GameScreen
