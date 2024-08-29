import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Login from './Layout/Form/Login'
import HomescreenOperator from './Layout/Screens/Operator/HomescreenOperator'
import { AuthProvider } from '../contexts/AuthContext'
import { useFonts } from 'expo-font'
import RegisterOperator from './Layout/Form/RegisterOperator'
import LoginOperator from './Layout/Form/LoginOperator'
import Register from './Layout/Form/Register'
import AppLoading from 'expo-app-loading'
import HomescreenClient from './Layout/Screens/Client/HomescreenClient'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OperatorsMap from './components/Map'
import { MapViewProvider } from '../contexts/ViewMapOf'
const App = () => {
  
  let [fontsLoaded] = useFonts({
    'Poppins-Regular':require('../assets/fonts/Poppins-Regular.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf')
  })
  if(!fontsLoaded) {
      return <AppLoading />
  }
  const Stack = createNativeStackNavigator()
  return (
      <MapViewProvider>
        <AuthProvider>
          <Stack.Navigator>
            <Stack.Screen name="Layout/Screens/Client/HomescreenClient" options={{headerShown: false}} component={HomescreenClient}/>
            <Stack.Screen name='Layout/Form/LoginOperator' options={{ headerShown: false}} component={LoginOperator}/>
            <Stack.Screen name="Layout/Screens/Operator/HomescreenOperator" options={{headerShown: false}} component={HomescreenOperator}/>
            <Stack.Screen name='Layout/Form/Register' options={{ headerShown: false}} component={Register}/>
            <Stack.Screen name='Layout/Form/RegisterOperator' options={{ headerShown: false}} component={RegisterOperator}/>
            
            <Stack.Screen name='components/Map' options={{headerShown: false}} component={OperatorsMap}/>
            <Stack.Screen name="Layout/Form/Login" options={{headerShown: false}} component={Login}/>
          </Stack.Navigator>
        </AuthProvider>
      </MapViewProvider>
  )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#fff'
    }
})

export default App