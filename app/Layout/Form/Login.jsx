import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import LoginIllustration from '../../../assets/images/login-illus.jpg'
import { useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { auth } from '../../../firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from 'expo-router'
import ArrowRight from '../../../assets/images/icons8-arrow-right-30.png'
import LoadingScreen from '../../components/LoadingScreen'
const Login = () => {
    const router = useRouter()
    const navigation = useNavigation()
    const [ EmailFocus, setEmailFocus ] = React.useState(false)
    const [ PasswordFocus, setPasswordFocus ] = React.useState(false)
    const [ email, setEmail ] = React.useState('')
    const [ password, setPassword ] = React.useState('')
    const [ loading, setLoading ] = React.useState(false)
    const [ errorMessage, setErrorMsg ] = React.useState('')

    const handleSubmit = async function() {
        try {
            setLoading(true)
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                setLoading(false)
                navigation.replace('Layout/Screens/Client/HomescreenClient')
            }
        }catch(err) {
            if(err) {
                setLoading(false)
                console.log("ERROR-Login: ", err);
                switch (err.code) {
                    case 'auth/invalid-email':
                      setErrorMsg('The email address is badly formatted.')
                      break;
                    case 'auth/user-disabled':
                      setErrorMsg('The user account has been disabled by an administrator.')
                      break;
                    case 'auth/user-not-found':
                      setErrorMsg('No user found with this email address.')
                      break;
                    case 'auth/wrong-password':
                      setErrorMsg('The password is incorrect.')
                      break;
                    case 'auth/network-request-failed':
                      setErrorMsg('Network error. Please check your internet connection.');
                      break;
                    default:
                      setErrorMsg(err.code)
                  }
                return
            }
        }
    } 



  return (
    <View style={ styles.container }> 
        <StatusBar backgroundColor='#000'/>
        {errorMessage && <Text>{errorMessage}</Text>}
        { loading && <LoadingScreen />}
        <View style={ styles.title }>
            <View style={{
                fontSize: 35,
                color: '#F4B446',
                fontFamily: 'Poppins-Regular',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 35,
                    color: '#F4B446',
                    fontFamily: 'Poppins-Regular',
                    width: '70%',
                    justifyContent: 'center'
                }}>Authentication</Text>
                <View style={{
                    borderColor: 'red',
                    height: 'auto',
                    width: '30%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Pressable onPress={()=> navigation.navigate('Layout/Form/LoginOperator')}>
                        <Text style={{textDecorationLine: 'underline'}}>Operator</Text>
                    </Pressable>
                </View>
            </View>
            <Text style={{
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                letterSpacing: 1,
                lineHeight: 23,
            }}>
                {/* Be the first commuter to try our first free Cat Express tracking app develop by BSIS student of Catanduanes State University */}
                Commuter
            </Text>
        </View>
        
        {/* <Image source = { LoginIllustration } style={{ width: '90%', height: 500 }}/> */}
        <View style={styles.form}>
            <TextInput 
                placeholder='Enter your email'
                style={ [
                    {
                        borderColor: `${ EmailFocus ? '#F4B446':'#00000009' }`,
                        borderWidth: 1
                    }, styles.input] }
                onFocus={()=> setEmailFocus(true)}
                onBlur={()=> setEmailFocus(false)}
                value={ email }
                onChangeText={setEmail}
                // onChange={()=> console.log("Email: ",email)}
            />
            <TextInput 
                placeholder='Enter your password'
                secureTextEntry={true}
                style={ [
                    {
                        borderColor: `${PasswordFocus ? '#F4B446':'#00000009'}`,
                        borderWidth: 1
                    }, styles.input] }
                onFocus={()=> setPasswordFocus(true)}
                onBlur={()=> setPasswordFocus(false)}
                value={password}
                onChangeText={setPassword}
                // onChange={()=> console.log("password: ",password)}
            />
            <View style={{ width: '100%', height: 80, alignItems: 'center', flexDirection: 'row' }}>
                <View style={{flexGrow: 1, height: '100%', justifyContent: 'center'}}>
                    <Pressable
                        style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#fff' : '#F4B446', 
                            borderWidth: 2,
                            borderColor: '#F4B446'
                        },
                        styles.button,
                        ]}
                        onPress={handleSubmit}
                    >
                        <Text style={{fontSize: 15, color: '#FFF', textTransform: 'uppercase'}}>signin</Text>
                    </Pressable>
                </View>
                <View style={{ height: '100%', flexGrow: 5, alignItems: 'center', justifyContent: 'center'}}>
                    <Pressable onPress={()=> navigation.navigate('Layout/Form/Register')}>
                        <Text style={{fontSize: 16, color: '#00000080', fontFamily: 'Roboto-Regular', textDecorationLine: 'underline'}}>create new account</Text>
                    </Pressable>
                </View>
            </View>
        </View>
        
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#fff'
    },
    title: {
        height: 170,
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingTop: 15
    },
    form: {
        width: '90%',
        height: 350,
        display: 'flex',
        alignItems: 'center',
        padding: 10
    },
    input: {
        height: 65,
        width: '100%',
        paddingLeft: 40,
        fontSize: 18,
        backgroundColor: '#00000009',
        borderRadius: 5,
        margin: 15,
        fontFamily: 'Poppins-Regular'
    },
    button: {
        width: 180,
        height: 65,
         alignItems: 'center',
         justifyContent: 'center',
         borderRadius: 5,
         elevation: 5,
        shadowOffset: { width: 0, height: 0},
        shadowColor: '#00000070',
        shadowRadius: 1,
        shadowOpacity: 0.1
    }
})