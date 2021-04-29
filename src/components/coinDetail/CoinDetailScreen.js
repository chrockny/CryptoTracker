import React,{Component} from 'react';
import {View,
    Button,
    Text,
    Pressable,
    StyleSheet,
    SectionList,
    ActivityIndicator,
    FlatList,
    Platform,
    Image,
  TouchableOpacity,
  Alert} from 'react-native';
import Colors from '../../res/colors';
import Http from '../../libs/http';
import CoinMarketItem from  './CoinMarketItem';
import Storage from '../../libs/storage';

class CoinDetailScreen extends Component{
    //El estado inicial es vacio
    state = {
        item:{},
        markets:[],
        loadingMarket:true,
        isFavorite:false,
    }
    //Agregar a favorito o eliminar de favorito
    toogleFavorite = () =>{
    if(this.state.isFavorite){
        this.removeFavorite();
    }
    else{
        this.addFavorite();
    }
    }
    //Agregar a favorito
    addFavorite = async() =>{
        //Convertir el item en formato JSON en un string "cadena"
        const item = JSON.stringify(this.state.item);
        //Key unica de cada item.id
        const key = `favorite-${this.state.item.id}`;
        const stored = Storage.instance.store(key,item);
        console.log("stored",stored);
        if(stored){
            this.setState({isFavorite:true});
        }
    }
    //Eliminar de favorito
    removeFavorite = async()=>{
        Alert.alert("Remove favorite",
        "Are you sure?",[
            {
                text:"Cancel",
                onPress:async()=>{},
                style:"cancel"
            },
            {
                text:"Remove",
                onPress:async()=>{
                //Key unica de cada item.id
                const key = `favorite-${this.state.item.id}`;
               //Metodo "remove" del storage para eliminar de favoritos
                await Storage.instance.remove(key);
                //Cambiamos el estado a falso para hacer saber que no esta agregado a favoritos
                this.setState({isFavorite:false});
                console.log("removed")

            },
            style:"destructive"
        }
        ])
    }
    //Obtener el estado del item desde el storage
    getFavorite = async()=>{
        try{
        const key = `favorite-${this.state.item.id}`;
        //Haciendo una peticion del storage para saber si a sigo agregado o no
        const favStr = await Storage.instance.get(key);

        if(favStr != null){
            this.setState({isFavorite:true})
        }
    
    }

        catch(err){
            console.log("error getFavorite",err)
        }
    }

    //Metodo para traer la imagen
    getSymbolIcon = () =>{
        const imageCoin = this.props.route.params.item.nameid;
        return `https://c1.coinlore.com/img/25x25/${imageCoin}.png`;
    }
    //Obtener Secciones de nuestra pantalla
    getSections = (item) =>{
        const sections = [
        {
            title:"Market Cap",
            data:[item.market_cap_usd],
        },
        {
            title:"Volume 24h",
            data:[item.volume24],
        },
        {
            title:"Change 24h",
            data:[item.percent_change_24h],
        }
    ]
    return sections;
    }
    //Funcion para obtener los mercados dependiendo del Id del item
    getMarkets = async(itemId) =>{
        const url = `https://api.coinlore.net/api/coin/markets/?id=${itemId}`;
        const markets = await Http.instance.get(url);
        this.setState({markets});
        this.setState({loadingMarket:false});
    }
    //Obteninedo los parametros de la Coin desde la pantalla de CoinsScreen
    componentDidMount() {
        const {item} = this.props.route.params;
        this.props.navigation.setOptions({title:item.symbol})
        //Llamando ala funcion
        this.getMarkets(item.id);
        this.setState({item},()=>{
            this.getFavorite()
        });
    }
    
    render(){
        const {item,isFavorite,loadingMarket,markets} = this.state;
    return(
        <View style={styles.container}>
            <View style={styles.subHeader}>
            <View style={styles.row}>
                <Image
            style={styles.coinImage}
            source={{uri:this.getSymbolIcon()}}
            />
            <Text 
            style={styles.titleText}>
                {item.name}
            </Text>
            </View>
<TouchableOpacity
onPress = {this.toogleFavorite}
style={[styles.btnFavorite,
isFavorite ?
styles.btnFavoriteRemove:
styles.btnFavoriteAdd]}>
    <Text
    style={styles.btnFavoriteText}>
    {isFavorite 
    ? "Remove Favorite"
    : "Add Favorite"
    }
    </Text>
</TouchableOpacity>
            </View> 
            <SectionList
            style={styles.section}
            sections={this.getSections(item)}
            keyExtractor={(item) =>item}
            renderItem=
            {
            ({item})=>
            <View 
            style={styles.sectionItem}>
            <Text styles={styles.itemText}>{item}</Text>
            </View>
            }
            renderSectionHeader=
            {
            ({section}) => 
            <View 
            style={styles.sectionHeader}>
            <Text 
            style={styles.sectionText}>
                {section.title}
            </Text>
            </View>
            }
            />
            <Text style={styles.marketsTitle}>Markets</Text>
            {loadingMarket ?
            <ActivityIndicator
            color="#fff"
            size="large"
            style={styles.loader}
            />
            :null
            }
            <FlatList
            style={styles.list}
            horizontal={true}
            data={markets}
            keyExtractor={({itemList}) =>{itemList}}
            renderItem={({item}) =>
            <CoinMarketItem item={item}/>}
            />
        </View>
    )
}
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.charade,
    },
    row:{
        flexDirection:"row",
    },
    subHeader:{
        backgroundColor:"rgba(0,0,0,0.2)",
        padding:16,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    titleText:{
        fontSize:16,
        marginTop:8,
        fontWeight:"bold",
        color:"#fff",
        marginLeft:8,
    },
    coinImage:{
        width:35,
        height:35,
    },
    section:{
        maxHeight:220,
    },
    sectionHeader:{
        backgroundColor:"rgba(0,0,0,0.2)",
        padding:8,
    },
    sectionItem:{
        padding:8,
    },
    itemText:{
        color:Colors.white,
        fontSize:14,
    },
    sectionText:{
        color:"#fff",
        fontSize:14,
        fontWeight:"bold",
    },
    list:{
        maxHeight:150,
        paddingLeft:10,
    },
    marketsTitle:{
        color:"#fff",
        marginBottom:16,
        fontWeight:"bold",
        marginLeft:10,


    },
    loader:{
        marginTop:40,
    },
    btnFavorite:{
        padding:8,
        borderRadius:8,
    },
    btnFavoriteText:{
        color:Colors.white,

    },
    btnFavoriteAdd:{
        backgroundColor:Colors.picton
    },
    btnFavoriteRemove:{
        backgroundColor:Colors.carmine
    },
})





export default CoinDetailScreen;