import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, {useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import {auth,db} from '../database/firebase'
import { signInWithEmailAndPassword} from "firebase/auth";
import {collection, getDocs, query,where} from 'firebase/firestore'

const carta = () => {
    
    const [email, setEmail] = useState('')
    const [idStudent, setIdStudent] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    const studentsCollectionRef = collection(db,"students")

    async function handleSignIn(){

        //navigation.navigate('HomeScreen',{email,password})
        try{
            //navigation.navigate('Assitance Management App',{id:idStudent, correo:email.toString()})
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigation.navigate('Assitance Management App',{correo:email.toString()})
            })
            .catch(error => {
                console.log(error)
                if (error.message == 'Firebase: Error (auth/wrong-password).') {
                    Alert.alert("Contraseña Incorrecta")
                }else if(error.message == 'Firebase: Error (auth/user-not-found).'){
                    Alert.alert("El usuario no existe")
                }
            })
        }catch(e){
            console.log(e)
        }
    }

return(

    <View style={styles.vista}>
        <Image source={require('../images/logo.png')} style={styles.image}>
        </Image>
        
        <TextInput
            style = { styles.input }
            placeholder="Email"
            placeholderTextColor='#546574'
            onChangeText={(text) => setEmail(text)}
            //value={task.title}
        />
        <TextInput
            style = { styles.input }
            placeholder="Password"
            placeholderTextColor='#546574'
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            //value={task.title}
        />
        <TouchableOpacity 
            style={styles.boton}
            onPress={handleSignIn}
        >
            <Text style={{color:'#fff'}}>Login</Text>
        </TouchableOpacity>
    </View>
)}
  
  const styles = StyleSheet.create({
    titulo: {
      fontSize: 60,
      color: '#000',
      fontWeight: 'bold',
      alignItems: 'center'
    },
    input: {
      width: '80%',
      fontSize: 14,
      borderColor: 'gray',
      height: 35, 
      textAlign: 'center',
      padding: 4,
      borderRadius: 20, 
      marginTop: 20,
      backgroundColor: '#fff',
      elevation: 8
    },
    vista:{
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        margin: 40,
        height: 'auto', 
        borderRadius: 20,
        marginTop: '50%',
        elevation: 10,
        left: 0,
        right: 0,
        overflow: 'hidden',
        zIndex:1000
    },
    image:{
        width: '80%', 
        height: '40%',
    },
    boton:{
        marginTop: '15%',
        backgroundColor: '#001890',
        width: '60%',
        borderRadius: 20, 
        alignItems: 'center',
        height: 25, 
    }
    
  
  
  })


export default carta