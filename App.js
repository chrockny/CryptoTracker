import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Image, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CoinsStack from './src/components/coins/CoinsStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from './src/res/colors';
import FavoriteStack from './src/components/favorites/FavoritesStack';
const Tabs = createBottomTabNavigator();


export default function App() {

  return (
      <NavigationContainer>
      <StatusBar style="auto" />
      <Tabs.Navigator
      tabBarOptions={{
        tintColor:"#fefefe",
        style:{
          backgroundColor:Colors.blackPearl,
        }
        }}>
          <Tabs.Screen
          name="Coins"
          component ={CoinsStack}
          options={{
          tabBarIcon:({size,color}) =>(
              <Image 
              style={{tintColor:color,width:size,height:size}}
              source={require('./assets/bank.png')}/>
            
          )}}
          />
           <Tabs.Screen
          name="Favorites"
          component ={FavoriteStack}
          options={{
          tabBarIcon:({size,color}) =>(
              <Image 
              style={{tintColor:color,width:size,height:size}}
              source={require('./assets/star.png')}/>
            
          )}}
          />
        </Tabs.Navigator>



      </NavigationContainer>
  );
}