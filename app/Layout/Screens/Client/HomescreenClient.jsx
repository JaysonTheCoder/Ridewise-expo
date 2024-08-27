import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { doc, onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../../../firebaseConfig'
import OperatorCards from '../../../components/operatorCards'
import LoadingScreen from '../../../components/LoadingScreen'
import OfflineScreen from '../../../components/OfflineScreen'
const HomescreenClient = () => {
  const [loading, setLoading] = useState(false)
  const operators = useRef([])

  const [documentsData, setDocumentIds] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'bus_location'), (querySnapshot) => {
      const ids = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setDocumentIds(ids)
    }, (error) => {
      console.error('Error fetching document IDs: ', error);
      setLoading(false)
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      { loading && <LoadingScreen/>}
      <StatusBar backgroundColor='#000'/>
      <View style={styles.nav}>
        <View style={{
          width: '90%',
          height: '90%',
          justifyContent: 'center'
        }}>
          <Text style={{color: '#fff', fontFamily: 'Poppins-Regular', fontSize: 35, height: 50}}>Ridewise</Text>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 5, color: '#f9f9f9'}}>have a real-time update on Cat-Express bus</Text>
        </View>
      </View>
      <View style={styles.content}>
        {
          operators &&
            documentsData.map( item => {
              return (
                <View>
                  {
                    item ? 
                    <OperatorCards docID={item.id} route={item.route} bus_number={item.bus_number} status={ item.isOnline ? 'online':'offline'} />:<OfflineScreen />
                  }
                </View>
              )
            })
        }
      </View>
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
    backgroundColor: '#F4B446',
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 150,
    elevation: 15
  },
  content: {
    height: '100%',
    alignItems: "center",
    padding: 10,
  }
})