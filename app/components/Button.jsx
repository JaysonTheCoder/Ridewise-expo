import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
const Button = ({ onPress, title, styles, iconSource, size }) => {
  return (
    <TouchableOpacity style={ styles ? styles:style.button } onPress={ onPress }>
        { iconSource && <Image style={ size && { height: size, width: size }} source={ iconSource }/> }
        <Text style={{fontSize: 9, fontWeight: 600}}>{ title }</Text>
    </TouchableOpacity>
  )
}
const style = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        height: '100%',
        width: 'auto' ,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center' 
    }
})
export default Button

const styles = StyleSheet.create({})