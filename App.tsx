import { StyleSheet, Text, View } from 'react-native';
import { Center, NativeBaseProvider, Spinner } from 'native-base';
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla';
import { StatusBar } from 'react-native';
import { Loading } from '@components/Loading';
import { THEME } from './src/theme';
import { SignUp } from '@screens/SignUp';
import { Routes } from '@routes/index';

import { AuthContext } from '@contexts/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContext.Provider
        value={{
          id: '1',
          name: 'Jeferson Couto',
          email: 'jeferson@email.com',
          avatar: 'jeferson.png',
        }}
      >
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
