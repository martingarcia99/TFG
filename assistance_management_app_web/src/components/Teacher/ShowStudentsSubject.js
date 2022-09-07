import React from 'react'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection, getDocs,doc,where,query,getDoc,updateDoc} from 'firebase/firestore'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import {useNavigate,useParams} from 'react-router-dom'

const ShowStudentsSubject = () => {
    const studentsCollectionRef = collection(db,"students")

    const [listStudents, setListStudents] = useState([]);
    const navigate = useNavigate()

    const{id} = useParams()

    const deleteStudentFromSubject = async (idStudent) => {
        const studentRef = doc(db,"students",idStudent)
        const student = await getDoc(studentRef)

        var asignaturas = student.data().asignaturas
        var newAsignaturas = []
        newAsignaturas = asignaturas.filter((item) => item !== id)

        await updateDoc(studentRef, {
            asignaturas: newAsignaturas
        })
        window.location.reload()
    }

    const Volver = async () => {
        navigate('/showSubject/' + id)
        
    }

    useEffect(() => {

        const getListStudents = async () => {

            const q = query(studentsCollectionRef, where("asignaturas", "array-contains-any", [id]))

            const data = await getDocs(q)

            setListStudents(data.docs.map((doc) => ({...doc.data(), id: doc.id})))


        }
        getListStudents()
    },[])

    return (
        <div className="p-7 text-2xl font-semibold flex-1 overflow-y-hidden h-screen w-10">
            <div className="shadow-2xl m-10 overflow-y-scroll h-4/5	">
                <Table bordered>
                <thead>
                    <tr>
                    <th>Correo</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    </tr>
                </thead>
                <tbody>
                    {listStudents.map((student) =>{
                        //console.log(student)
                        return(
                            <tr>
                                <td>{student.correo}</td><td>{student.nombre}</td><td>{student.apellidos}</td>
                                <Button className="text-center items-center justify-center ml-2 bg-black border-b-0 mt-1" onClick={() => {deleteStudentFromSubject(student.id)}}>
                                    Eliminar
                                </Button>
                            </tr>
                        )
                    })} 
                </tbody>
                </Table>
            </div>
            <Button className="absolute m-10" onClick={() => {Volver()}}>
                Volver
            </Button>
    </div>
    )
}

export default ShowStudentsSubject;