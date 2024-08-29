import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { MapViewContext } from '../../contexts/ViewMapOf';
import Offline from './Offline';
import { StatusBar } from 'expo-status-bar';
const OperatorsMap = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { docData, setDocData } = useContext(MapViewContext)
  useEffect(() => {
    const vehicleDocRef = doc(db, 'bus_location', docData.docID);

    const unsubscribe = onSnapshot(vehicleDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        console.log("data: ", data);
        setDocData({
          ...docData,
          driver: data.driver,
          route: data.route,
          isOnline: data.isOnline
        })
        
        
        if(data.isOnline) {
          setLocation({
            latitude: data.coordinates.latitude,
            longitude: data.coordinates.longitude,
          });
        }
        setLoading(false);
      } else {
        console.log('No such document!');
        setLoading(false)
      }
    }, (error) => {
      console.error("Error fetching real-time data: ", error);
      setLoading(false)
    });

    return () => unsubscribe();
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.container}>
        <Offline />
      </View>
    );
  }

  return (
      <View style={styles.main}>
          <StatusBar backgroundColor='#000'/>
          <View style={styles.con}>
            <View style={styles.nav}>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20, color: '#112466' }}>{ docData.driver }</Text>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14 }}>{ docData.bus_number }</Text>
            </View>
            <MapView
              style={styles.map}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
            >
              <Marker coordinate={location != null && location  } />
            </MapView>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  main: {
    borderwidth: 1,
    height: '100%',
    alignItems: 'center'
  },
  nav: {
    width: "97%",
    height: 100,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    margin: 10,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: '#fff',
    shadowColor: '#00000090',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 100,
    elevation: 15
  }, 
  con: {
    width: '100%',
    height: '100%'
  }
});

export default OperatorsMap
