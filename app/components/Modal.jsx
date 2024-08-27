import React, { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet, Pressable } from "react-native";

const ModalMessage = function({ message, open, title, close, confirm }) {
    return (
        <Modal style={styles.modal} transparent={ true } animationType="fade" visible={ open }>
            <View style={styles.container}>
                <View style={{width: '80%', height: 250, backgroundColor: '#fff', borderRadius: 5, shadowOffset:{ height: 2, width: 2}, shadowColor: '#00000080', shadowRadius: 125, elevation: 20}}>
                    <View style={{flex: 1, flexBasis: '40%', justifyContent: 'center'}}>
                        <Text style={{marginLeft: 30, fontSize: 21, fontFamily: 'Poppins-Regular'}}>{ title }</Text>
                    </View>
                    <View style={{flex: 1, flexBasis: '35%'}}>
                        <Text style={{marginLeft: 30, fontSize: 17, fontFamily: 'Poppins-Regular'}}>{ message }</Text>
                    </View>
                    <View style={{flex: 1, flexBasis: '25%', flexDirection: 'row'}}>
                        <View style={{flex: 1,justifyContent: 'center', paddingLeft: 30, paddingRight: 20}}>
                            <Pressable onPress={ ()=> close() } style={{borderWidth: 1, height: '70%', alignItems: 'center', justifyContent: "center", shadowColor: '#00000060', shadowOffset: { width: 0, height: 0}, shadowRadius: 100, elevation: 10, backgroundColor: '#fff', borderColor: '#00000010', borderRadius: 5}}>
                                <Text style={{color: '#00000080', fontFamily: 'Poppins-Regular'}}>cancel</Text>
                            </Pressable>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 20, paddingRight: 30}}>
                            <Pressable onPress={ confirm } style={{borderWidth: 1, height: '70%', alignItems: 'center', justifyContent: "center", shadowColor: '#00000060', shadowOffset: { width: 0, height: 0}, shadowRadius: 100, elevation: 10, backgroundColor:'#2196f3', borderColor: '#00000010', borderRadius: 5}}>
                                <Text style={{color: '#00000080', fontFamily: 'Poppins-Regular', color: '#fff', fontSize: 17}}>ok</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        backgroundColor: "#00000090",
        position: 'absolute',
        height: '100%',
        alignItems: "center",
        justifyContent: 'center'
    },
    modal: {
        height: '100%',
        zIndex: 0,
        width: '100%',
        position: 'relative',
        borderWidth: 1,
    }
})
export default ModalMessage