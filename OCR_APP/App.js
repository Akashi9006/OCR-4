import { StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import { PaperProvider, MD3DarkTheme, Surface, Button,withTheme} from 'react-native-paper';
//import App from './src/App';


const theme = {
  ...MD3DarkTheme,
};
export default function App() {
  return (
    <PaperProvider theme = {theme} style={styles.surface}>
    <View style={{flex: 1,backgroundColor: "#27222b"}}>

    <Surface style={styles.surface} elevation={0} >
      <Button icon="youtube"  mode="contained" style={{ fontSize:70, width: 150, height:100, padding: 25,alignItems:"center" }} onPress={() => console.log('Youtube')}>YouTube</Button>
      <Button icon="web" mode="contained" onPress={() => console.log('Browser')}>Browser</Button>
      <Button icon="folder" mode="contained" onPress={() => console.log('Files')}>Files</Button>
    </Surface>  

    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  surface: {padding: 10,margin: 10 ,height: 150 ,width: 200,alignItems: 'center',justifyContent: 'space-between', alignSelf:"center", backgroundColor:"#27222b",}
});