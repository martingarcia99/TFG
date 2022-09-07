import React from 'react'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection,getDocs,getDoc,doc,updateDoc,query,where} from 'firebase/firestore'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useParams, useNavigate} from 'react-router-dom'

const EditSubject = () => {

    const subjectCollectionRef = collection(db,"subjects")
    const [desc, setDescripcion] = useState('')
    const [nombre, setNombre] = useState('')
    const [curso, setCurso] = useState('')
    const [horario, setHorario] = useState('')
    const [profesor, setProfesor] = useState('')
    const [error, setError] = useState('')
    const [grupo, setGrupo] = useState('')

    const navigate = useNavigate()
    var newFields ={}
    const{id} = useParams()

    const editTeacher = async () => {

        const subject = doc(db, "subjects", id) 
        newFields = {nombre:nombre,descripcion:desc,curso:curso,profesor:profesor}
        await updateDoc(subject,newFields)
        navigate('/HomeTeacher')
        
    }



    useEffect(() => {
        const setData = async () => {
            const docRef = doc(db, "subjects", id)
            const docSubject = await getDoc(docRef)
            
            setNombre(docSubject.data().nombre)
            setDescripcion(docSubject.data().descripcion)
            setCurso(docSubject.data().curso)
            setProfesor(docSubject.data().profesor)
            setGrupo(docSubject.data().grupo)
    
        }
        setData()
    },[])

    return (
        <div className="p-7 text-2xl font-semibold flex-1 overflow-y-hidden h-screen">
        <h1 className="flex tems-center justify-center">Editar Asignatura</h1>
        <div className="mt-16 ml-96 mr-96 shadow-2xl h-5/6">
            <Form className="items-center justify-center ml-20 p-32 h-48 mr-20 ">
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={nombre} onChange={(event) => {setNombre(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3 w-96">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows={4} value={desc} onChange={(event) => {setDescripcion(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Curso</Form.Label>
                    <Form.Control type="text" value={curso} onChange={(event) => {setCurso(event.target.value)}}/>
                </Form.Group>
                
                {grupo ? (
                    <Form.Group className="mb-3">
                    <Form.Label>Grupo</Form.Label>
                    <Form.Control type="text" value={grupo} onChange={(event) => {setGrupo(event.target.value)}}/>
                    </Form.Group>
                ) : (<div></div>) }
    
                <Button className="text-center items-center justify-center center ml-32" onClick={() => {editTeacher()}}>
                    Editar Asignatura
                </Button>
            </Form>
        </div> 
        </div> 
    )
}

export default EditSubject;