import React, {useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Text, View,FlatList,Image,Button} from 'react-native';
import styles from './style/style.js';
import Logo from '../Manga_Info/Component/Logo';
import axios from "axios";
import { useEffect } from 'react/cjs/react.development';


export default function App() {


const apiURL = "http://localhost:5000/home";
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
const [mangas,getManga] = useState('');
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
									<Text numberOfLines={2}>Synonpsis: {item.synopsis}</Text>	
								</View>	
							</View>
						</View>
						<Button title="See More" onPress={() => navigation.navigate('Details' , {id:`${item.id}`,img:`${item.img}`,name:`${item.name}`,autor:`${item.autor}`,genre:`${item.genre}`,score:`${item.score}`,synopsis:`${item.synopsis}`})}/>
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

	function DetailsManga({ route,navigation }) {
		const {id,img,name,autor,genre,score,synopsis} = route.params
		const apiURLmore = apiURL+"/"+id
		const [Infomangas,getMangas] = useState('');
			useEffect(() => {
				getOneInfoManga();
			}, []);

		const getOneInfoManga = () => { 
			axios.get(apiURLmore).then((res) =>  {
				const dataOneManga = res.data.results;
			//console.log(dataOneManga);
				getMangas(dataOneManga); 	
				})
			.catch(error => console.error(`Error:${error}`));
			}
			const renderOneItem = ({ item }) => {
				return (
					<View>
						<Image style={{ height: 300, width: 600 }}source={{ uri: `${item.url_img}` }}/>
						<Text>Title : {item.title}</Text>
						<Text>Description : {item.description}</Text>
						<Text>{item.recipe}</Text>
						<Text>{item.info}</Text>
						<Text>{item.sauce}</Text>
					</View>
					);
				}
		return(
			<View>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<View style ={styles.flatListData}>
							<View style ={styles.manga_info}>
								<View style={styles.img}>
									<Image style={{ height: 300, width: 200 }}source={{ uri: `${img}` }}/>
								</View>
								<View style={styles.TwoColumn}>
									<View style={styles.title}>
										<Text>Name: {name}</Text>
									</View>
									<View style={styles.autor}>
										<Text>Autor: {autor}</Text>
									</View>
									<View  style={styles.genre}>
										<Text>Genre: {genre}</Text>
									</View>
									<View style={styles.score}>
										<Text>Score: {score}</Text>
									</View>
									<View style={styles.resume}>
										<Text>Synonpsis: {synopsis}</Text>	
									</View>	
								</View>
							</View>
							<Button title="Back Home" onPress={() => navigation.goBack()}/>
						</View>
				</View>
				<FlatList
				data={Infomangas}
				renderItem={renderOneItem}
				keyExtractor={item => item._id.$oid.toString()}
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