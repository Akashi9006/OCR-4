import { StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import { PaperProvider, MD3DarkTheme, Surface, Button,MD3Colors} from 'react-native-paper';
//import App from './src/App';

const theme = {
  ...MD3DarkTheme,
};
export default function App() {
  return (
    <PaperProvider theme = {theme} style={{ backgroundColor: theme.colors.primary }}>

    <View>
      <Text>hello world</Text>
    

    <Surface style={styles.surface} elevation={5}>
      <Button icon="youtube" mode="text" onPress={() => console.log('Youtube')}>yt</Button>
    </Surface>  
    <Button icon="youtube" mode="contained" onPress={() => console.log('Youtube')}>yt</Button>

    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  surface: {padding: 10,height: 70,width: 70,alignItems: 'center',justifyContent: 'center',},
});