import { React, useState, useEffect } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

const initialState = {
  email: '',
  password: '',
};

// State при фокусе
const initialStateInFocus = {
  email: false,
  password: false,
};

//Подключение шрифтов
const loadFonts = async () => {
  await Font.loadAsync({
    'Roboto-Regulat': require('../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
  });
};

//----------*LOGIN*----------
export default function Login() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  const [isInFocus, setInFocus] = useState(initialStateInFocus);
  const [dimensions, setDimensions] = useState(
    Dimensions.get('window').width - 16 * 2
  );

  //Вычисление ширины, учитывая ориентацию экрана
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width - 16 * 2;
      setDimensions(width);
    };

    const dimensionsHandler = Dimensions.addEventListener('change', onChange);
    return () => dimensionsHandler.remove();
  }, []);

  //Изменение флагов и скрытие клавиатуры
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  //Отправка формы
  const onSubmit = () => {
    console.log(state);
    Keyboard.dismiss();
    setState(initialState);
    setIsShowKeyboard(false);
  };

  //При фокусе
  const onFocusInput = key => {
    setIsShowKeyboard(true);
    setInFocus(prevState => ({ ...prevState, [key]: true }));
  };

  //Шрифты
  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../../assets/images/background.jpg')}
        >
          <View style={styles.form}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <Text style={styles.title}>Log in</Text>
              <TextInput
                style={{
                  ...styles.input,
                  marginBottom: 16,
                  width: dimensions,
                  borderColor: isInFocus.email ? '#FF6C00' : '#E8E8E8',
                }}
                placeholder={'Email'}
                onFocus={() => onFocusInput('email')}
                onBlur={() => setInFocus(initialStateInFocus)}
                value={state.email}
                onChangeText={value =>
                  setState(prevState => ({ ...prevState, email: value }))
                }
              />

              <TextInput
                style={{
                  ...styles.input,
                  marginBottom: 43,
                  width: dimensions,
                  borderColor: isInFocus.password ? '#FF6C00' : '#E8E8E8',
                }}
                placeholder={'Password'}
                secureTextEntry={true}
                onFocus={() => onFocusInput('password')}
                onBlur={() => setInFocus(initialStateInFocus)}
                value={state.password}
                onChangeText={value =>
                  setState(prevState => ({ ...prevState, password: value }))
                }
              />

              <TouchableOpacity
                style={{ ...styles.button, width: dimensions }}
                activeOpacity={0.8}
                onPress={onSubmit}
              >
                <Text style={styles.buttonText}>Log in</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text
                  style={{
                    ...styles.text,
                    marginBottom: isShowKeyboard ? 32 : 144,
                  }}
                >
                  Don't have an account? Register
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  form: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  title: {
    marginTop: 32,
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    color: '#212121',
  },
  input: {
    padding: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    color: '#212121',
    backgroundColor: '#F6F6F6',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  text: {
    marginTop: 16,
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
});
