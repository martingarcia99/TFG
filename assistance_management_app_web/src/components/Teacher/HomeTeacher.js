import React from 'react'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection, getDocs,doc,deleteDoc,where,query} from 'firebase/firestore'
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom'
import { BiBookBookmark } from "react-icons/bi";
import { useAuth } from '../../context/authContext'

const HomeTeacher = () => {

    const [term, setTerm] = useState([])
    const [subjects, setSubjects] = useState([])
    const subjectCollectionRef = collection(db,"subjects")
    const navigate = useNavigate()

    const {user} = useAuth()

    const deleteSubject= async(id) => {
        const subjectDoc = doc(db,"subjects",id)
        await deleteDoc(subjectDoc)
        window.location.reload()
    }

    const detalle = async(id) => {
        navigate('/showSubject/' + id)
    }

    const editSubject = async (id) => {
        navigate('/editSubject/' + id)
    }
    
    const createSchedule = async (id) => {
        navigate('/createSchedule/' + id)
    }

    function searchingTerm(term) {
        return function(x){
            return x.nombre.toLowerCase().includes(term) || !term
        }
    }

    useEffect(() => {

        const getSubjects = async () => {

            const q = query(subjectCollectionRef, where("profesor", "==", user.email))
        
            const data = await getDocs(q)

            setSubjects(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getSubjects()
    },[])

    return (
        <div className="p-7 text-2xl font-semibold flex-1 overflow-y-hidden h-screen">
            <h1>PÁGINA PRINCIPAL</h1>
            <input
                className="border-none hover:border-none p-2 flex-start"
                placeholder = "Búsqueda de Asignaturas"
                name="term"
                onChange={e => setTerm(e.target.value)}
            />
            <div className="grid grid-cols-3 mt-6 overflow-y-scroll h-5/6">
                {subjects.filter(searchingTerm(term)).map((subject) => {
                    return (
                    <div className="card flex flex-row h-fit shadow-xl ml-2 mt-2 items-center">
                        <BiBookBookmark size='2rem' className="ml-4"/>
                        <div className="card-body">
                            <p className="card-text cursor-pointer" onClick={() => {detalle(subject.id)}}>{subject.nombre}</p>
                            <p className="card-text">Curso: {subject.curso}º {subject.grupo}</p>
                            
                            <Button className="text-center items-center justify-center" onClick={() => {editSubject(subject.id)}}>
                                Editar
                            </Button>
                            <Button className="text-center items-center justify-center ml-2" onClick={() => {deleteSubject(subject.id)}}>
                                Eliminar
                            </Button>
                            <Button className="text-center items-center justify-center ml-2" onClick={() => {createSchedule(subject.id)}}>
                                Asignar Horario
                            </Button>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default HomeTeacher;