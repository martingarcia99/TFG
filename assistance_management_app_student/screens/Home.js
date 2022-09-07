import React from 'react';
import {useState,useEffect} from 'react'
import {useRoute} from '@react-navigation/native'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import {db} from '../database/firebase'
import {collection, getDocs,doc,deleteDoc,getDoc,query,where} from 'firebase/firestore'
import "firebase/firestore";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const Home = () => {

    const studentsCollectionRef = collection(db,"students")
    const scheduleCollectionRef = collection(db,"schedule")

    const [subject, setSubject] = useState([])
    const [idStudent, setIdStudent] = useState('')
    const [subjects, setSubjects] = useState([])
    const [student, setStudent] = useState('')
    //const [perteneceAsig, setPerteneceAsig] = useState(false)
    const [show, setShow] = useState(false)

    const route = useRoute()
    const navigation = useNavigation()

    const goSubject = (item) => {
        console.log("Home: id - ",idStudent)
        console.log(item)
        navigation.navigate('Asignatura',{subject:item, idAlumno: idStudent})
    }

    async function perteneceSubject(subject){
    
        let pertenece = false

        const q1 = query(scheduleCollectionRef,where("idAsignatura", "==", subject))
        const querySnapshot2 = await getDocs(q1);
        let schedule = {}
        querySnapshot2.forEach((doc) => {
            schedule = doc.data()
        })

        let dateToday = new Date()
        let date = (dateToday.toDateString()).substring(0,3)
        //console.log(date)
        let hours = dateToday.getHours();
        let minutes = dateToday.getMinutes();
        let horaActual = hours+ ":" +minutes

        
        console.log(schedule.idAsignatura)
        

        if(date === "Thu"){
            if( schedule.JHoraFin > horaActual && horaActual > schedule.JHoraIni ){
                pertenece = true
            }
                
        }else if (date === "Mon"){
            if( schedule.LHoraFin > horaActual && horaActual > schedule.LHoraIni ){
                pertenece = true
            }
                
        }else if (date === "Tue"){
            if( schedule.MHoraFin > horaActual && horaActual > schedule.MHoraIni ){
                console.log("entra")
                pertenece = true
            }
                
        }else if (date === "Wed"){
            if( schedule.XHoraFin > horaActual && horaActual > schedule.XHoraIni ){
                pertenece = true
            }
                
        }else{
            if( schedule.VHoraFin > horaActual && horaActual > schedule.VHoraIni ){
                pertenece = true
            }
                
        }
        console.log(pertenece)
        return pertenece

    }   

    async function getSubject(subject){

        const q = doc(db,"subjects",subject)
        const querySnapshot = await getDoc(q);

        let res = querySnapshot.data()
        res.id = querySnapshot.id
        return res

    }

    async function getSubjects() {
    
        let resultsubjects = []

        for await (const subject of subjects){

            let pertence = await perteneceSubject(subject)

            if( pertence == true){
                let sub = {}
                sub = await getSubject(subject)
                resultsubjects.push(sub)
            }
           //console.log(resultsubjects)
        }
        setSubjects(resultsubjects)
        setShow(true)
    }

    useEffect(() => {
        async function loadData(){
            try{
                console.log("Home: id - ",route.params.id)
                const email = "" + route.params.correo.trim() + ""
                
                //Obtenemos las asignaturas del estudiante
                const q = query(studentsCollectionRef,where("correo", "==", email))
                const querySnapshot = await getDocs(q);
                
                querySnapshot.forEach((doc) => {
                    setStudent(doc.data())
                    setSubjects(doc.data().asignaturas)
                });

                const q2 = query(studentsCollectionRef,where("correo", "==", email))
                const querySnapshot2 = await getDocs(q2);

                querySnapshot2.forEach((doc) => {
                    setIdStudent(doc.id)
                })
    
            }catch(e){
                console.log(e)
            }
        }
    
        
        
        loadData()
        getSubjects()
        setShow(false)
    },[])

   
    return (
        <View>
                <Card
                    image={require('../images/logo.png')}>
                    
                    <Text style={{marginBottom: 10}}>
                        Bienvenido {student.nombre} a la aplicación de Asistencia Automática.
                    </Text>
                </Card>
                
                <Card 
                    title="Cargar Asignaturas">
                    
                    <Text style={{marginBottom: 10}}>
                        Pulsa el siguiente botón para visualizar las asignaturas disponibles para pasar asistencia.
                    </Text>
                    <Button
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='ASIGNATURAS' 
                        onPress={async () => getSubjects()}/>
                </Card>
                {show ? 
                    <FlatList
                    data={subjects}
                    renderItem={({item}) => 
                        <TouchableOpacity onPress={() => goSubject(item)}>
                        <Card>
                            <Text style={styles.subTitle}>{item.nombre}</Text>
                        </Card>
                        </TouchableOpacity>     
                        }
                    /> : <View></View>
                }
            
        </View>
    )
    
}

const styles = StyleSheet.create({
        subTitle:{
            textAlign: 'center',
            marginBottom: 20,
            marginTop: 20
        }
})

export default Home
