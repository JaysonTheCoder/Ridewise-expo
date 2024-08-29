import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import Illu from '../../assets/images/3d-buddy-white-no-wifi-icon.png'
import { useNavigation } from 'expo-router'
const Offline = () => {
    const navigation = useNavigation()
  return (
    <View style={{
        height: '100%',
        borderWidth: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: "center"
    }}>
        <Image source={Illu} style={{ height: 250, width: 250}}/>
        <Text style={{fontFamily: 'Poppins-Regular', fontSize: 16}}>The operator of this bus is not on active.</Text>
        <Pressable onPress={()=> navigation.navigate('Layout/Screens/Client/HomescreenClient')} style={{padding: 10, width: 100, alignItems: 'center', backgroundColor: '#8bbbee', color: '#112466', margin: 10, borderRadius: 7}}>
            <Text style={{ fontFamily: 'Poppins-Regular'}}>Go back</Text>
        </Pressable>
    </View>
  )
}

export default Offline

const styles = StyleSheet.create({})