import React,{Component} from 'react';
import {View,StyleSheet,FlatList,Text} from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../res/colors';
import Storage from '../../libs/storage';
import CoinsItem from '../coins/CoinsItem';

class FavoriteScreen extends Component{

    state = {
        favorites:[],
    }
    getFavorites = async() =>{
        try{
            //Obteniendo las keys con el item desde el LocalStorage
            const allKeys = await Storage.instance.getAllKeys();
            //Filtrando las allkeys para que solo devuleva la key
            const keys = allKeys.filter((key)=>key.includes("favorite-"))
            
            const favs = await Storage.instance.multiGet(keys);

            const favorites = favs.map((fav) =>JSON.parse(fav[1]));
            
            //Pasandole al estado las AllKeys 

            this.setState({favorites :favorites})
        }
        catch(error){
            console.log("get favorites err",error);
        }
    }
    //Navegar entre tabs
    handlePress=(item)=>{
        this.props.navigation.navigate("CoinDetail",{item});
    }
    componentDidMount(){
        //Montar de nuevo el component
        this.props.navigation.addListener("focus",this.getFavorites);
    }
    componentWillUnmount(){
    //Remover el Did Mount
        this.props.navigation.removeListener("focus",this.getFavorites);
    }
    render() {
        const {favorites} = this.state;
        return(
            <View 
            style={styles.container}>
                {//Comprobando si nuestro array favorites tiene algo dentro
                favorites.length == 0 && 
                <FavoritesEmptyState/>
                }
                {
                //mayor que 0 
                favorites.length > 0 && 
                <FlatList
                data={favorites}
                renderItem={({item}) =>
                <CoinsItem item={item}
                onPress={()=>this.handlePress(item)}/>}
                />
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.charade,
        flex:1,
    },
})
export default FavoriteScreen;