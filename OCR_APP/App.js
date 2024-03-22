import { StyleSheet, View,StatusBar, FlatList, Image,TouchableOpacity} from 'react-native';
import * as React from 'react';
import {useState, useCallback, useRef, useEffect} from 'react';
import { PaperProvider, MD3DarkTheme, Surface, Button,TouchableRipple,Text, Icon,MD3Colors} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import YoutubePlayer from 'react-native-youtube-iframe';
import {WebView} from 'react-native-webview';
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
        <Stack.Screen name="Mirror" component={MirrorScreen} />
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

      <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => navigation.navigate('Mirror')}>
        <View style={styles.square} elevation={1}>
          <Icon  style={styles.children} color={MD3Colors.primary20} source="fit-to-screen-outline" size={50} />
          <Text style={styles.children} variant="headlineLarge">Mirror</Text>
        </View>
      </TouchableRipple>

    </Surface>  

    </View>

    </PaperProvider>
  );
}

function YTScreen({navigation}) {
  const [playing, setPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState('iee2TATGMyI');

  const findRecommendations = async () => {
    const apiKey = 'AIzaSyBPTaSwsbeJbUnXxzmgEDrnGSdok7vu0tI';
    const apiUrl = `https://youtube-v31.p.rapidapi.com/search`;

    const url = apiUrl + '?relatedToVideoId=' + selectedVideoId + '&part=id%2Csnippet&type=video&maxResults=10' + apiKey;
    const headers = {
      'X-RapidAPI-Key': 'b97c961df3msh58d6c80732dc7bep1a4c67jsnc390a50a5b8f',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    };
    const options = {
      method: 'GET',
      headers: headers,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setRecommendations(data.items);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const playerRef = useRef(null);

  const onPlayerReady = useCallback(() => {
    setPlayerReady(true);
  }, []);

  const refreshScreen = async () => {
    setPlaying(false);

    await findRecommendations();
  };

  useEffect(() => {
    let animationFrameId;

    const update = () => {
      if (playerReady && playerRef.current) {
        playerRef.current.getCurrentTime().then(currentTime => {
          playerRef.current.getDuration().then(duration => {
            const normalizedTime = currentTime / duration;
          });
        });
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => {
      // Stop the animation frame when the component unmounts
      cancelAnimationFrame(animationFrameId);
    };
  }, [playerReady]);

  useEffect(() => {
    findRecommendations();
  }, [selectedVideoId]);

  return (
    <PaperProvider theme = {theme} style={styles.surface}>
    <View style={{flex: 1,backgroundColor: "#27222b"}}>
    <StatusBar hidden/>

    <Surface style={styles.surface} elevation={0} >
    <YoutubePlayer
        ref={playerRef}
        height={400}
        play={playing}
        videoId={selectedVideoId}
        onChangeState={onStateChange}
        onReady={onPlayerReady}
        onProgress={(e) => {
          const currentTime = e.currentTime / e.duration;
        }}
      />
      <View style={{ height: 400 }}>
        <FlatList
          data={recommendations}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedVideoId(item.id.videoId);
                setPlaying(true);
                refreshScreen();
              }}
            >
              <View style={{ flexDirection: 'row', flex: 1, padding: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                {item.snippet.thumbnails && item.snippet.thumbnails.medium && item.snippet.thumbnails.medium.url && (
                  <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={{ aspectRatio: 16 / 9, height: 90, marginRight: 10 }} />
                )}
                <Text style={{ fontWeight: 'bold', fontSize: 16, flexWrap: 'wrap' }}>{item.snippet.title}</Text>
                <Text style={{ color: 'gray', fontSize: 12 }}>{item.snippet.channel}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
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
    <View style={{backgroundColor: "#27222b"}}>
    <StatusBar hidden/>
    <View style={{width:'100%',height:'100%'}}>
      <WebView
        scalesPageToFit={false}
        source={{ uri: 'https://www.google.com' }}
        onLoad={console.log('Loaded')}
      />
    </View>
    </View>
    </PaperProvider>
  );
}


function MirrorScreen({navigation}) {
  return (
    <PaperProvider theme = {theme} style={styles.surface}>
    <View style={{flex: 1,backgroundColor: "#27222b"}}>
    <StatusBar hidden/>

    <Surface style={styles.surface} elevation={0} >
    <Text style={styles.children} variant="headlineLarge">Mirror</Text>
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
  youtubePlayer: {alignSelf: 'stretch',height: 200,},
  filebtn: {position: 'absolute', top:20,left:20,},
  

});
