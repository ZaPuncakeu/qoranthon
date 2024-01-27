import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/pages/SplashScreen';
import Camera from './src/pages/MyCamera';
import Core from './src/pages/Core';
import Home from './src/pages/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen options={{headerShown: false, animation: "slide_from_right"}} name="Home" component={Home} />
        <Stack.Screen options={{headerShown: false, animation: "slide_from_right"}} name="Camera" component={Camera} />
        {/*<Stack.Screen options={{headerShown: false }} name="AddPhone" component={AddPhone} />*/}
        {/*<Stack.Screen options={{headerShown: false, animation: "slide_from_right"}} name="AddName" component={AddName} />*/}
        {/*<Stack.Screen options={{headerShown: false, animation: "slide_from_right"}} name="AddBabysName" component={AddBabysName} />*/}
        {/*<Stack.Screen options={{headerShown: false, animation: "slide_from_right"}} name="PickGender" component={PickGender} />*/}
        {/*<Stack.Screen options={{headerShown: false, animation: "slide_from_right"}} name="BDay" component={BDay} />*/}
        {/*<Stack.Screen options={{headerShown: false, animation: "slide_from_right"}} name="Connect" component={Connect} />*/}
        {/*<Stack.Screen options={{headerShown: false, animation: "slide_from_right"}} name="Main" component={Main} />*/}
        {/*<Stack.Screen options={{headerShown: false, animation: "slide_from_right"}} name="Camera" component={Camera} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
