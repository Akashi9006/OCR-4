import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Appearance } from 'react-native';
import * as React from 'react';

import { PaperProvider, useTheme, MD3DarkTheme as DarkTheme} from 'react-native-paper';
//import App from './src/App';
const theme = {
  ...DarkTheme,
};
export default function App() {
  return (
    <PaperProvider theme = {theme} style={{ backgroundColor: theme.colors.primary }}>

    <View>
      <Text>hello world</Text>
    </View>

    </PaperProvider>
  );
}

