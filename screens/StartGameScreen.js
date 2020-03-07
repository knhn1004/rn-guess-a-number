import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import CustomButton from '../components/CustomButton'

const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [selectedNum, setSelectedNum] = useState()
  const [btnWidth, setBtnWidth] = useState(Dimensions.get('window').width / 3)

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }


  useEffect(() => {
    const updateLayout = () => {
      setBtnWidth(Dimensions.get('window').width /4)
    }
    Dimensions.addEventListener('change', updateLayout)
    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  })

  const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Keyboard.dismiss()
      setTimeout(() => {
        Alert.alert(
          'Invalid number!',
          'Number has to be a number between 1 and 99',
          [{ text: 'Okay', style: 'desctructive', onPress: resetInputHandler }],
        )
      }, 50)
      return
    }
    setConfirmed(true)
    setSelectedNum(chosenNumber)
    setEnteredValue('')
    Keyboard.dismiss()
  }

  let confirmedOutput

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNum}</NumberContainer>
        <CustomButton
          title="START GAME"
          onPress={() => onStartGame(selectedNum)}
        />
      </Card>
    )
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
		<View style={{width: btnWidth}}>
                  <Button
                    title="Reset"
                    color={Colors.accent}
                    onPress={resetInputHandler}
                  />
                </View>
		<View style={{width: btnWidth}}>
                  <Button
                    title="Confirm"
                    color={Colors.primary}
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  inputContainer: {
    width: '80%',
    // maxWidth: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  button: {
    // width: 100,
    // width: Dimensions.get('window').width / 3,
  },
  input: {
    width: 100,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
})

export default StartGameScreen

StartGameScreen.propTypes = {
  onStartGame: PropTypes.func.isRequired,
}
