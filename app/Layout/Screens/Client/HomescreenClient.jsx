import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { doc, onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../../../firebaseConfig'
import OperatorCards from '../../../components/operatorCards'
import LoadingScreen from '../../../components/LoadingScreen'
import { useNavigation } from 'expo-router'
import OfflineScreen from '../../../components/OfflineScreen'
import { MaterialIcons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
const HomescreenClient = () => {
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData ] = useState(false)
  const operators = useRef([])
  const navigation = useNavigation()
  const [documentsData, setDocumentIds] = useState([]);
  useEffect(() => {
    setFetchingData(true)
    const unsubscribe = onSnapshot(collection(db, 'bus_location'), (querySnapshot) => {
      const ids = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setDocumentIds(ids)
      setFetchingData(false)
    }, (error) => {
      console.error('Error fetching document IDs: ', error);
      setLoading(false)
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      { loading && <LoadingScreen />}
      <View style={styles.nav}>
        <View style={{
          height: '90%',
          justifyContent: 'center',
          flex: 1,
          flexBasis: '80%'
        }}>
          <Text style={{color: '#112A46', fontFamily: 'Poppins-Regular', fontSize: 35, height: 50}}>Ridewise</Text>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 5, color: '#112A46'}}>have a real-time update on Cat-Express bus</Text>
        </View>
        <View style={{
          flex: 1,
          flexBasis:'20%',
          alignItems: 'flex-end',
          justifyContent: "center",
          height: '90%',
          paddingRight: 18
        }}>
          <Pressable onPress={()=> navigation.navigate('Layout/Form/LoginOperator')}>
            <MaterialIcons color="#112A46" name="menu" size={25}/>
          </Pressable>
        </View>
      </View>
      <View style={styles.content}>
        {
          fetchingData ?
          <OfflineScreen />:documentsData.map( item => {
              return (
                <View>
                  {
                    item &&
                    <OperatorCards docID={item.id} route={item.route} bus_number={item.bus_number} status={ item.isOnline ? 'online':'offline'}/>
                  }
                </View>
              )
            })
        }
      </View>
      
      <StatusBar backgroundColor='#000'/>
    </View>
  )
}

export default HomescreenClient

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    flex: 1,
  },
  nav: {
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#8BBBEE',
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 150,
    elevation: 15,
    flexDirection: 'row',
    padding: 20
  },
  content: {
    height: '100%',
    alignItems: "center",
    padding: 10,
  }
})