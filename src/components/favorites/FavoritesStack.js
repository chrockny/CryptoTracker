import React from 'react';
import {Text,View,Image,StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import FavoriteScreen  from './FavoritesScreen';
import Colors from '../../res/colors';


const Stack = createStackNavigator();

const FavoriteStack = () =>{
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle:{
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    textAlign: 'center',
                },}}>
            <Stack.Screen 
            name="Favorites"
            component={FavoriteScreen}
            />

        </Stack.Navigator>
    )
}

export default FavoriteStack;
