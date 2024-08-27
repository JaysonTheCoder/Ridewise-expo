import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Card = ({ title, location }) => {
  return (
    <View style={styles.container}>
        <View style={[{}, styles.title]} >
            <Text style={{color: '#F4B446', fontSize: 30, fontFamily: 'Poppins-Regular'}}>{ title }</Text>
        </View>
        <View style={styles.body}>
            <View style={{flexDirection: 'row'}}>
                <Image source/>
                <Text>{ location.currentPosition }</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Image source/>
                <Text>{ location.FixedPosition }</Text>
            </View>
        </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '90%',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 0}
    },
    title: {
        flexGrow: 1,

    },
    body: {flexGrow: 20}
})