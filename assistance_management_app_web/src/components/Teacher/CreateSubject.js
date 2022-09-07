import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection, addDoc,where,query,getDocs} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/authContext'

const CreateSubject = () => {

    const [nombre, setNombre] = useState('')
    const [error, setError] = useState('')
    const [desc, setDesc] = useState('')
    const [horario, setHorario] = useState('')
    const subjectsCollectionRef = collection(db,"subjects")
    const navigate = useNavigate()

    const {user} = useAuth()
    const [teacher, setTeacher] = useState('')
    const [curso, setCurso] = useState('')
    const [grupo, setGrupo] = useState('')

    useEffect(() => {
        setTeacher(user.email)
    },[])

    const createSubject = async () => {
        
        const q = query(subjectsCollectionRef, where("nombre", "==", nombre))
        
        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty) {
            try{
                await addDoc(subjectsCollectionRef,{nombre:nombre,descripcion:desc,curso:curso,profesor:teacher,grupo:grupo})
                //await sendPasswordResetEmail(auth.currentUser)
                navigate('/HomeTeacher')
            }catch(error){
                if(error.code === "auth/invalid-email"){
                    setError("Correo invalido")
                }
            }
        }else
            setError("la asignatura ya existe")
        
    }

    return (
        <div className="p-7 text-2xl font-semibold flex-1 overflow-y-hidden h-screen">
        <h1 className="flex tems-center justify-center">Alta Asignatura</h1>
        <div className="mt-16 ml-96 mr-96 shadow-2xl h-5/6">
            <Form className="ml-18 p-32">
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" onChange={(event) => {setNombre(event.target.value)}}/>
                    <Form.Text className="text-muted">
                        {error}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows={4} onChange={(event) => {setDesc(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Curso</Form.Label>
                    <Form.Control type="text" onChange={(event) => {setCurso(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Grupo</Form.Label>
                    <Form.Control type="text" onChange={(event) => {setGrupo(event.target.value)}}/>
                    <Form.Text className="text-muted">
                        (En el caso de que sea una asignatura de prácticas)
                    </Form.Text>
                </Form.Group>
                
                <Button className="text-center items-center justify-center center ml-52 mt-10" onClick={() => {createSubject()}}>
                    Crear Asignatura
                </Button>
            </Form>
        </div>
        </div>
    )
}

export default CreateSubject;