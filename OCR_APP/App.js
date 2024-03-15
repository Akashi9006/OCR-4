import { StyleSheet, View,StatusBar} from 'react-native';
import * as React from 'react';
import { PaperProvider, MD3DarkTheme, Surface, Button,TouchableRipple,Text, Icon,MD3Colors} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import App from './src/App';

const Stack = createNativeStackNavigator();
const theme = {...MD3DarkTheme,};

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Youtube" component={YTScreen} />
        <Stack.Screen name="Browser" component={BrowserScreen} />
        <Stack.Screen name="Files" component={FilesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}) {
  return (
    <PaperProvider theme = {theme} style={styles.surface}>

    <View style={{flex: 1,backgroundColor: "#27222b"}}>

    <StatusBar hidden/>
    <Surface style={styles.surface} elevation={0} >

      <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => navigation.navigate('Youtube')}>
        <View style={styles.square} elevation={1}>
          <Icon  style={styles.children} color={MD3Colors.primary20} source="youtube" size={50} />
          <Text style={styles.children} variant="headlineLarge">YouTube</Text>
        </View>
      </TouchableRipple>

      <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => navigation.navigate('Browser')}>
        <View style={styles.square} elevation={1}>
          <Icon  style={styles.children} color={MD3Colors.primary20} source="web" size={50} />
          <Text style={styles.children} variant="headlineLarge">Browser</Text>
        </View>
      </TouchableRipple>

      <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => navigation.navigate('Files')}>
        <View style={styles.square} elevation={1}>
          <Icon  style={styles.children} color={MD3Colors.primary20} source="folder" size={50} />
          <Text style={styles.children} variant="headlineLarge">Files</Text>
        </View>
      </TouchableRipple>
    </Surface>  

    </View>

    </PaperProvider>
  );
}

function YTScreen({navigation}) {
  return (
    <PaperProvider theme = {theme} style={styles.surface}>
    <View style={{flex: 1,backgroundColor: "#27222b"}}>
    <StatusBar hidden/>

    <Surface style={styles.surface} elevation={0} >
      <Text style={styles.children} variant="headlineLarge">Youtube</Text>
      <Button compact="true" mode="contained" onPress={() => navigation.navigate("Home")}>
        Go Home
      </Button>
    </Surface>  

    </View>
    </PaperProvider>
  );
}

function BrowserScreen({navigation}) {
  return (
    <PaperProvider theme = {theme} style={styles.surface}>
    <View style={{flex: 1,backgroundColor: "#27222b"}}>
    <StatusBar hidden/>

    <Surface style={styles.surface} elevation={0} >
      <Text style={styles.children} variant="headlineLarge">Browser</Text>
      <Button compact="true" mode="contained" onPress={() => navigation.navigate("Home")}>
        Go Home
      </Button>
    </Surface>  

    </View>
    </PaperProvider>
  );
}

function FilesScreen({navigation}) {
  return (
    <PaperProvider theme = {theme} style={styles.surface}>
    <View style={{flex: 1,backgroundColor: "#27222b"}}>
    <StatusBar hidden/>

    <Surface style={styles.surface} elevation={0} >
      <Text style={styles.children} variant="headlineLarge">Files</Text>
      <Button compact="true" mode="contained" onPress={() => navigation.navigate("Home")}>
        Go Home
      </Button>
    </Surface>  

    </View>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  surface: {padding: 10,margin: 10 ,flexDirection:"row" ,height: 150 ,width: 200 ,alignItems:"flex-end",justifyContent: "center", alignSelf:"center", backgroundColor:"#27222b",borderRadius: 20},
  square: {padding: 15,margin: 10 ,height: 120 ,width: 150,alignItems: 'center',justifyContent: 'space-between', alignSelf:"center", backgroundColor:MD3Colors.primary80,borderRadius: 20},
  children: {padding: 0,margin: 0 ,alignItems:"flex-end",justifyContent: "space-evenly", alignSelf:"center", fontSize:28, fontWeight:"bold", color:MD3Colors.primary20,backgroundColor:MD3Colors.primary80},
});
