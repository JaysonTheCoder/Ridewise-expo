import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
const LoadingScreen = () => {
  return (
    <View style={[styles.background]}>
        <ActivityIndicator color='#f4b446' size={40}/>
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#00000090',
        position: 'absolute',
        height: '100%',
        flex: 1,
        width: '100%',
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 4,
    }
})