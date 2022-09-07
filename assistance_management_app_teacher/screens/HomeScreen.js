import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import NdefMessage from '../components/NdefMessage'
import NfcManager, {Ndef, NfcEvents} from 'react-native-nfc-manager';
import {db} from '../database/firebase'
import {doc,getDoc, addDoc, collection, getDocs, query, where} from 'firebase/firestore'

// Pre-step, call this before any NFC operations
NfcManager.start();

function App() {

  const [ndef,setNdef] = useState([])
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const assistanceCollectionRef = collection(db,"assistance")

  const registerAssistance = async (idAlumno, idAsignatura) => {
      
      console.log("alumno",idAlumno)
      console.log("asignatura",idAsignatura)
      const studentRef = doc(db,"students",idAlumno)
      const student = await getDoc(studentRef)
      let nombre = student.data().nombre
      let apellidos = student.data().apellidos

      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;
      let horaActual = hours+ ":" +minutes+ ":" +seconds
      console.log(hours+ ":" +minutes+ ":" +seconds);
      console.log(date.toDateString())
      console.log(date)

      //comprobar para ese estudiante, esa asignatura y esa fecha si hay algun registro

      const q = query(assistanceCollectionRef, where("asignatura", "==", idAsignatura),where("alumno", "==", idAlumno),where("fecha", "==", date.toDateString()))
        
      const querySnapshot = await getDocs(q)

      if(querySnapshot.empty) {
          await addDoc(assistanceCollectionRef,{alumno: idAlumno, nombre: nombre, apellidos: apellidos, hora: horaActual, fecha: date.toDateString(), asignatura:idAsignatura, presencia: true})
           setError("Asistencia registrada para el alumno " + nombre + " "+ apellidos)
      }else
          setError("Ya se ha registrado la asistencia para el alumno " + nombre + " "+ apellidos +" el dia " +  date.toDateString())

  }

  async function readNdef() {
    setError("Activado")
    NfcManager.start()
    NfcManager.registerTagEvent()
    // Listens for NFC when u put phones together and tap the screen
    NfcManager.setEventListener(NfcEvents.DiscoverTag, ({ ndefMessage: [{ payload }]}) => {
      const [{ type }] = Ndef.decodeMessage(payload)
      console.log(type) //Message u should receive from sender
      registerAssistance(type.substring(20,41),type.substring(0,20))
    })
    
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Activar Lector NFC</Text>
      </TouchableOpacity>

      <Text style={styles.error}>{error}</Text>
     
      {/* <View style={styles.section}>
        <Text style={styles.sectionLabel}>NDEF</Text>
        {show ? <NdefMessage ndef={ndef} /> : <Text>---</Text>}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  sectionLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray',
  },
  error: {
    padding: 30, 
  }
});

export default App;