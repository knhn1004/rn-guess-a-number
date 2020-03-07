import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Alert, FlatList, Dimensions } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import Colors from '../constants/colors'
import BodyText from '../components/BodyText'
import IconButton from '../components/IconButton'
// import { ScreenOrientation } from 'expo'

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
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

  const initalGuess = genRandomBetween(1, 100, userChoice)
  const [currentGuess, setCurrentGuess] = useState([initalGuess])
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width,
  )
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height,
  )
  // const [rounds, setRounds] = useState(0)
  const [pastGuesses, setPastGuesses] = useState([initalGuess])

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width)
      setAvailableDeviceHeight(Dimensions.get('window').height)
    }
    Dimensions.addEventListener('change', updateLayout)
    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  })

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
    setPastGuesses(prevGuesses => [nextNumber, ...prevGuesses])
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <BodyText>Opponent&apos;s Guess</BodyText>
        <View style={styles.controls}>
          <IconButton
            onPress={() => nextGuessHandler('lower')}
            name="md-remove"
            color="white"
            size={24}
            bgColor={Colors.danger}
          />
          <NumberContainer>{currentGuess}</NumberContainer>
          <IconButton
            onPress={() => nextGuessHandler('greater')}
            name="md-add"
            color="white"
            bgColor={Colors.success}
            size={24}
          />
        </View>
        <View
          style={{
            ...styles.listContainer,
            width: availableDeviceWidth > 320 ? '60%' : '80%',
          }}
        >
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

  return (
    <View style={styles.screen}>
      <BodyText>Opponent&apos;s Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card
        style={{
          ...styles.buttonContainer,
          marginTop: availableDeviceHeight > 600 ? 20 : 5,
        }}
      >
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
    // marginTop: availableDeviceHeight > 600 ? 20 : 5,
    width: 400,
    maxWidth: '80%',
  },
  listContainer: {
    // width: availableDeviceWidth > 320 ? '60%' : '80%',
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
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center',
  },
})

export default GameScreen

GameScreen.propTypes = {
  userChoice: PropTypes.number,
  onGameOver: PropTypes.func.isRequired,
}
