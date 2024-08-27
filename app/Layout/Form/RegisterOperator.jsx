import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useNavigation } from 'expo-router'
const RegisterOperator = () => {
    const navigation = useNavigation()
    const router = useRouter()
  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Pressable onPress={()=> navigation.navigate('Layout/Form/LoginOperator')}>
            <Text style={{
                width: 50,
                height: 30,
                marginLeft: 40,
                marginTop: 10,
                fontSize: 18
            }}>back</Text>
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={{fontSize: 35, fontFamily: 'Poppins-Regular', marginTop: 80}}>Registration</Text>
      </View>
      <View style={styles.form}>
        <TextInput
            placeholder='Enter your ID'
            style={[styles.input]}
        />
        <TextInput
            placeholder='Enter your email'
            style={[styles.input]}
        />
        <TextInput
            placeholder='Enter your password'
            style={[styles.input]}
            secureTextEntry={true}
        />
        <TextInput
            placeholder='Confirm your password'
            style={[styles.input]}
            secureTextEntry={true}
        />
        <Pressable style={({pressed})=>[{
            backgroundColor: `${pressed ? '#00000010':'#F4B446'}`
        },styles.button]}>
            <Text style={{color: '#FFF', fontSize: 16, fontWeight: 600, letterSpacing: 1, fontFamily: 'Poppins-Regular'}}>REGISTER</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default RegisterOperator

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    header: {
        height: 150,
        justifyContent: 'center',
        width: '90%'
    },
    body: {
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%'
    },
    input: {
        height: 65,
        width: '100%',
        margin: 15,
        paddingLeft: 40,
        fontSize: 18,
        backgroundColor: '#00000009',
        fontFamily: 'Poppins-Regular'
    },
    form: {
        height: 450,
        width: '90%',
        alignItems: 'center'
    },
    button: {
        width: '100%',
        height: 65,
        margin: 15,
        alignSelf: 'flex-start',
        marginLeft: 0,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})