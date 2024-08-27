import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { MapViewContext } from '../../contexts/ViewMapOf';

const OperatorsMap = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { docData } = useContext(MapViewContext)
  useEffect(() => {
    const vehicleDocRef = doc(db, 'bus_location', docData.docID);

    const unsubscribe = onSnapshot(vehicleDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        console.log("data: ", data);
        console.log("id: ", docData.docID);
        
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
        <ActivityIndicator size="large" color="#F4B446" />
      </View>
    );
  }

  return (
      <View style={styles.main}>
        <Text style={{fontSize: 30}}>bus number: { docData.bus_number }</Text>
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
    height: '100%'
  }
});

export default OperatorsMap
