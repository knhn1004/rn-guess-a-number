import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOver from './screens/GameOver'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

const fetchFonts = async () => {
  await Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
	onError={err => console.log(err)}
      />
    )
  }

  const startGamehandler = selectedNumber => {
    setUserNumber(selectedNumber)
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }

  const restartGame = () => {
    setUserNumber()
    setGuessRounds(0)
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {userNumber ? (
        guessRounds <= 0 ? (
          <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
        ) : (
          <GameOver
            roundsNumber={guessRounds}
            userNumber={userNumber}
            restartGame={restartGame}
          />
        )
      ) : (
        <StartGameScreen onStartGame={startGamehandler} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
