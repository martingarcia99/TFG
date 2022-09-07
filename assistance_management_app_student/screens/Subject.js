import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react'
import {useRoute} from '@react-navigation/native'
import NfcManager, {Ndef, NfcEvents} from 'react-native-nfc-manager';


const Subject = () => {

    const route = useRoute()

    const registrarAsistencia = () => {
        Alert.alert( 
            '', 
            'Acerca el dispositivo al lector NFC',  
            [  
                {text: 'OK', onPress: () => console.log('OK Pressed')},  
            ]
        );  
        NfcManager.start()
        let content = route.params.subject.id + route.params.idAlumno
        const bytes = Ndef.encodeMessage([ Ndef.textRecord('==='+ content) ])
        console.log(content)
    // Stores message to Senders phone. Now other android with enabled NFC can receive it
        NfcManager.setNdefPushMessage(bytes)
    }

    return(
        <View style={{flex: 1}}>
            <ScrollView>
                <Card>
                    <Text style={styles.title}>{route.params.subject.nombre}  {route.params.subject.curso}º</Text>
                    <Text style={{marginBottom: 10}}>
                        {route.params.subject.descripcion}  
                    </Text>
                </Card>
            </ScrollView>
            <View style={styles.boton}>
                <Card>
                    
                    <Text style={{marginBottom: 10}}>
                        Para registrar la asistencia pulsa el siguiente botón
                    </Text>
                    <Button
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='REGISTRAR' 
                        onPress={registrarAsistencia}/>
                </Card>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize: 24,
        marginBottom: 10
    },
    boton:{
        position:'absolute',
        bottom: 20
    }
})

export default Subject