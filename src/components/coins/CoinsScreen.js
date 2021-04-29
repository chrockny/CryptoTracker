import React ,{Component,useState,useEffect} from 'react';
import { render } from 'react-dom';
import {View,Text,FlatList,Pressable,StyleSheet,ActivityIndicator} from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import Colors from '../../res/colors';
import CoinsSearch from './CoinsSearch';

class CoinsScreen extends Component{
    //Declarando el estado inicial de Coins que tiene toda nuestra data.
    state = {
        coins:[],
        loading:true,
        allCoins:[],
    }
    componentDidMount = () =>{
        this.getCoins();
    }
    getCoins = async () => {
        //Llamando ala api y la informacion que nos reciba la guardamos como (res).
        const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');
        console.log("coins",res);
        this.setState({coins: res.data})
        this.setState({loading:false})
        this.setState({allCoins:res.data})
      };
    //Funcion cuando se da click en un boton.
    handlePress = (item) =>{
        console.log("Todo okey.",this.props);
        this.props.navigation.navigate("CoinDetail",{item})
    }
    //Evento cuando se cambie el textinput y capturar el texto y crear un nuevo array
    handleSearch = (query) =>{
        const {allCoins} = this.state;
        const coinsFiltered = allCoins.filter((coin) =>{
            return coin.name.toLowerCase().includes(query.toLowerCase())
            ||
            coin.symbol.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({coins:coinsFiltered})
    }

    render(){
    //Llamando ala data actual "estado" de coins luego de que se ejecute el llamado ala Api
    const {coins,loading} = this.state;

    return(
        <View style={styles.container}>
            <CoinsSearch
            onChange={this.handleSearch}/>
            {loading ?
            <ActivityIndicator
            color="#fff"
            size="large"
            style={styles.loader}
            />
            :null
            }
            <FlatList
            data={coins}
            renderItem={({item})=>
            <CoinsItem item={item}
            onPress={() =>{this.handlePress(item)}}/>
        }
        />
        </View>

    )
}}
const styles = StyleSheet.create({
    container :{
        flex:1,
        backgroundColor:Colors.charade,
        justifyContent:"center",
    },
    titleText:{
        color:"#fff",
        textAlign:"center",
    },
    btn:{
        padding:8,
        backgroundColor:"blue",
        borderRadius:8,
        margin:16,
    },
    btnText:{
        color:"#fff",
        textAlign:"center",
    },
    loader:{
       marginTop:60,
    }
    
})


export default CoinsScreen;