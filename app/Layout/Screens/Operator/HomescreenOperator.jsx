import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image, Pressable } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../../firebaseConfig'
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import Logo from '../../../../assets/images/driver.png'
import busIcon from '../../../../assets/images/icons8-bus-24.png'
import messagingIcon from '../../../../assets/images/icons8-comment-50.png'
import { AuthContext } from '../../../../contexts/AuthContext';
import { signOut, getAuth } from 'firebase/auth';
import ModalMessage from '../../../components/Modal';
import { useNavigation } from 'expo-router';
import Arrow from '../../../../assets/images/icons8-arrow-right-30.png'
//76Q3bONQed53XdBjAMGt operatorID 
const HomescreenOperator = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const isFocused = useIsFocused()
  const { id, driver, bus_number, status } = useContext(AuthContext)
  const [ openModal, setOpenModal ] = useState(false)
  const auth = getAuth()
  const navigation = useNavigation()
  const handleModalClose = function() {
    setOpenModal(false)
  }
  const handleSignOut = async function() {
      try {
        await signOut(auth)
        await navigation.replace('Layout/Screens/Client/HomescreenClient')
        console.log("user signed out")
        
      }catch(err) {
        console.log("error: ", err)
      }
  }
  const handleOpen = function() {
    setOpenModal(true)
  }
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const updateLocationInFirestore = async (coords) => {
        try {
          const userDoc = doc(db, 'bus_location', id);
          updateDoc(userDoc, {
            coordinates: {
              latitude: coords.latitude,
               longitude: coords.longitude
            },
            isOnline: isFocused
          })
          
        } catch (error) {
          console.error("Error updating location in Firestore: ", error);
        }
      };
      const locationSubscription = await Location.watchPositionAsync(
        { 
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
          distanceInterval: 1
        },
        (newLocation) => {
          setLocation(newLocation.coords);
          console.log("nedata");
          if(id) updateLocationInFirestore(newLocation.coords);
          
          console.log(newLocation.coords);
        }
      )
      return () => {
        locationSubscription.remove();
      };
    };

    getLocation();
  }, []);

  if (errorMsg) {
    return <View><Text>{errorMsg}</Text></View>;
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={ 60 } color="#F4B446" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#000'/>
      <ModalMessage confirm={()=> handleSignOut() } close={handleModalClose} open={openModal}  title="Confirm logout" message="Are you sure you want to logout?"/>
      <View style={[styles.navbar, {backgroundColor: 'transparent'}]}>
        <View style={styles.navbarContent}>
            <View style={[{flexGrow: 1, justifyContent: 'center', flexBasis: '5%' }]}>
              <View style={{width: '100%', flexDirection: 'row'}}>
                <View style={[{width: 80, height: 80, backgroundColor: '#00000010', borderRadius: 50}]}>
                  <Image style={[{height: 80, width: 80, borderRadius: 50}]} source={Logo}/>
                </View>
                <View style={{ width: '100%', justifyContent: 'center', paddingLeft: 10}}>
                  <Text style={{fontFamily: "Poppins-Regular", fontSize: 20}}>{ driver ? driver:'Default N.' }</Text>
                  <Text style={{fontFamily: "Poppins-Regular", fontSize: 12}}>bus number: {bus_number ? bus_number:'Unavailable' }</Text>
                  <Text style={{fontFamily: "Poppins-Regular", fontSize: 10}}>status: <Text style={{color: `${ status ? 'limegreen':'red' }`}}>{ status ? 'Online':'Offline' }</Text></Text>
                </View>
              </View>

            </View>
            
        </View> 
      </View>
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
            <Image style={{height: 40, width: 40}} source={require('../../../../assets/images/New Project 1 [C24A8F0].png')}/>
          </Marker>
        </MapView>
            <View style={styles.info}>
              <View style={[{
                height: 50,
                width: '100%',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center'
              },styles.card]}>

              </View>
              <View style={[{
                height: 80,
                width: '100%',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }, styles.card]}>
                  <View style={[{width: '90%', height: '90%', alignItems: 'center', flexDirection: 'row', position: 'relative'}]}>
                    <Image source={Logo} style={{width: 50, height: 50, borderRadius: 50}}/>
                    <View style={{ marginLeft: 15}}>
                      <Text style={{color: '#F4B446', fontFamily: 'Poppins-Regular', fontSize: 20}}>{ bus_number ? bus_number:'Unavailable' } <Text style={{color: '#000', fontSize: 13}}>Operator.</Text></Text>
                      <Text style={{fontSize: 11, color: '#00000090'}}>{  driver ? driver:'Default N.' }</Text>
                    </View>
                    <View style={{position: 'absolute', width: '20%', right: 0, height: '70%', alignItems: 'center', justifyContent: 'center'}}>
                        <Pressable style={{color: '#F4B446', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}} onPress={()=> handleOpen() }>
                          <Text style={{color: '#000', textDecorationLine: 'underline'}}>LOGOUT</Text>
                        </Pressable>
                    </View>
                  </View>
              </View>
              <View style={[{
                height: 100,
                width: '100%',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10
              }, styles.card]}>
                <View style={{
                  width: '90%',
                  height: '70%',
                  justifyContent: 'center',
                }}>
                  <View style={{height: '50%', width: '100%', justifyContent: 'center'}}>
                    <Text style={{
                      fontSize: 20,
                      color: '#F4B446',
                      marginLeft: 10
                    }}>Destination</Text>
                  </View>
                  <View style={{height: '50%', alignItems: 'center', paddingLeft: 10, flexDirection: 'row',fontFamily: 'Poppins-Regular'}}>
                      <Image source={require('../../../../assets/images/icons8-location-24.png')}/>
                      <Text style={{marginLeft: 10, fontFamily: 'Poppins-Regular'}}>Cat'express port, Virac, Catanduanes</Text>
                  </View>
                </View>
              </View>
          </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: "100%",
  },
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
    
  },
  navbar: {
    height: 150,
    justifyContent: "center",
    position: 'absolute',
    zIndex: 2,
    top: 0,
  },
  navbarContent: {
    width: 500,
    height: '90%',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  nav: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 30
  },
  nav_button: {
    width: "100%",
    height: '100%',
    alignItems: "center",
    justifyContent: "center"
  },
  nav_chld: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  info: {
    position: 'absolute',
    bottom: 50,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    shadowColor: '#00000098',
    shadowOffset: { width: 0, height: 0},
    shadowRadius: 40,
    elevation: 5
  }
});

export default HomescreenOperator;
