import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const OfflineScreen = () => {
  return (
    <View style={{width: '150%', alignItems: 'center', justifyContent: "center", height: '80%'}}>
        <LottieView
        source={ require('../../assets/Lottie/Animation - 1724817531592.json') }
        autoPlay
        loop
        style={{height: '70%', width: '50%'}}
      />
    </View>
  )
}

export default OfflineScreen