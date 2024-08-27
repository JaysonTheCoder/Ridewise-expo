import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { MapViewContext } from '../../contexts/ViewMapOf'
import { useContext } from 'react'
import { useNavigation } from 'expo-router'
const OperatorCards = ({ profile, route, bus_number, status, docID }) => {
    const navigation = useNavigation()
    const { setDocData } = useContext(MapViewContext)
    const handlePress = function() {
        try{
            console.log(navigation.getState().routeNames);
            
            if(docID) {
                setDocData({
                    bus_number: bus_number,
                    docID: docID,
                    status: status
                })
                navigation.navigate('components/Map')
            }
        }catch(err) {
            console.log("Error: ", err)
        }
    }
  return (
    <View style={styles.container}>
        <Image style={{
            borderColor: '#00000020',
            width: 60,
            height: 60,
            borderRadius: 50,
            backgroundColor: '#00000050',
        }} source={ profile }/>
        <View style={{
            flexDirection: 'column',
            marginLeft: 10
        }}>
            <Text style={{fontSize: 14, fontFamily: 'Roboto-Regular'}}>To: { route }</Text>
            <Text style={{fontSize: 11, fontFamily: 'Roboto-Regular'}}>Bus number: <Text style={{color: '#f4b446', fontSize: 13}}>{ bus_number }</Text></Text>
            <Text style={{fontSize: 9, fontFamily: 'Roboto-Regular'}}>status: <Text style={{color: `${status == 'online' ? 'limegreen':'red'}`}}>{status}</Text></Text>
        </View>
        <View style={{
            width: '100%',
            flex: 1,
            alignItems: 'flex-end',
            paddingRight: 18
        }}>
            <Pressable onPress={handlePress}>
                <Text style={{textDecorationLine: 'underline', letterSpacing: 0.2}}>View</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default OperatorCards

const styles = StyleSheet.create({
    container: {
        width: '99%',
        height: 80,
        margin: 8,
        alignItems: 'center',
        padding: 15,
        flexDirection: 'row',
        backgroundColor: '#00000010',
        borderRadius: 8,
    }
})