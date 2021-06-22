import React, {useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Text, View,SafeAreaView,FlatList,Image,Button} from 'react-native';
import styles from './style/style.js';
import Logo from '../Manga_Info/Component/Logo';
import axios from "axios";
import { useEffect } from 'react/cjs/react.development';


export default function App() {

const [mangas,getManga] = useState('');
const apiURL = "http://localhost:5000/home";
useEffect(() => {
	getAllManga();
}, []);

const getAllManga = () => { 
	axios.get(apiURL).then((res) =>  {
	const dataManga = res.data.results;
	//console.log(dataManga);
	getManga(dataManga); 	
	})
.catch(error => console.error(`Error:${error}`));
}

const Stack = createStackNavigator();
  
function HomeScreen({ navigation }) {	
			const renderItem = ({ item }) => {
				return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<View style ={styles.flatListData}>
						<View style ={styles.manga_info}>
							<View style={styles.img}>
								<Image style={{ height: 300, width: 200 }}source={{ uri: `${item.img}` }}/>
							</View>
							<View style={styles.TwoColumn}>
								<View style={styles.title}>
									<Text>Name: {item.name}</Text>
								</View>
								<View style={styles.autor}>
									<Text>Autor: {item.autor}</Text>
								</View>
								<View  style={styles.genre}>
									<Text>Genre: {item.genre}</Text>
								</View>
								<View style={styles.score}>
									<Text>Score: {item.score}</Text>
								</View>
								<View style={styles.resume}>
									<Text numberOfLines={2}>Synonpsis: {item.synopsis}[...]</Text>	
								</View>	
							</View>
						</View>
						<Button title="See More" onPress={() => navigation.navigate('Details')}/>
					</View>
				</View>
					);
				}
		return(
			<View>
			<FlatList
			data={mangas}
			renderItem={renderItem}
			keyExtractor={item => item.id.toString()}
		/>
		</View>
		);
	} 

	function DetailsManga({ navigation }) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Button
				title="Back To Home"
				onPress={() => navigation.navigate('Home')}
				/>
			</View>
		);
	  }

	return (
	<NavigationContainer>
		<Stack.Navigator initialRouteName="Home" screenOptions={{headerTitle:(<Logo/>)}}>
			<Stack.Screen name="Home" component={HomeScreen}/>
			<Stack.Screen name="Details" component={DetailsManga}/>	
		</Stack.Navigator>
	</NavigationContainer>
  );
}