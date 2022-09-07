import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection, doc, updateDoc,query,where, getDoc, getDocs, addDoc} from 'firebase/firestore'
import {useNavigate, useParams} from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { auth } from '../../firebase-config'
import {sendEmailVerification,sendPasswordResetEmail} from 'firebase/auth'

const EditSchedule = () => {

    const [lunes, setLunes] = useState({ HoraIni: "",HoraFin:"" })
    const [martes, setMartes] = useState({ HoraIni: "",HoraFin:"" })
    const [miercoles, setMiercoles] = useState({ HoraIni: "",HoraFin:"" })
    const [jueves, setJueves] = useState({ HoraIni: "",HoraFin:"" })
    const [viernes, setViernes] = useState({ HoraIni: "",HoraFin:"" })
    const [idAsignatura, setIdAsignatura] = useState('')
    const scheduleCollectionRef = collection(db,"schedule")
    const navigate = useNavigate()
    const{id} = useParams()
    var newFields ={}

    const UpdateSchedule = async () => {

        const q = query(scheduleCollectionRef, where("idAsignatura", "==", id))
        
        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty) {
            const schedule = doc(db, "schedule", id)
            newFields = {LHoraIni:lunes.HoraIni,LHoraFin:lunes.HoraFin,
                MHoraIni:martes.HoraIni,MHoraFin:martes.HoraFin,
                XHoraIni:miercoles.HoraIni,XHoraFin:miercoles.HoraFin,
                JHoraIni:jueves.HoraIni,JHoraFin:jueves.HoraFin,
                VHoraIni:viernes.HoraIni,VHoraFin:viernes.HoraFin,
                idAsignatura: idAsignatura}
            await updateDoc(schedule,newFields)
        }else{
            await addDoc(scheduleCollectionRef,{LHoraIni:lunes.HoraIni,LHoraFin:lunes.HoraFin,
                MHoraIni:martes.HoraIni,MHoraFin:martes.HoraFin,
                XHoraIni:miercoles.HoraIni,XHoraFin:miercoles.HoraFin,
                JHoraIni:jueves.HoraIni,JHoraFin:jueves.HoraFin,
                VHoraIni:viernes.HoraIni,VHoraFin:viernes.HoraFin,
                idAsignatura: id})
        }

        navigate('/showSubject/' + idAsignatura)
        
    }

    useEffect(() => {

        const getSchedule = async () => {

            const schedule = doc(db, "schedule", id)
        
            const docSchedule = await getDoc(schedule)
            
            setLunes({...lunes, HoraIni: docSchedule.data().LHoraIni, HoraFin: docSchedule.data().LHoraFin})
            setMartes({...martes, HoraIni: docSchedule.data().MHoraIni,HoraFin: docSchedule.data().MHoraFin})
            setMiercoles({...miercoles, HoraIni: docSchedule.data().XHoraIni,HoraFin: docSchedule.data().XHoraFin})
            setJueves({...jueves, HoraIni: docSchedule.data().JHoraIni,HoraFin: docSchedule.data().JHoraFin})
            setViernes({...viernes, HoraIni: docSchedule.data().VHoraIni,HoraFin: docSchedule.data().VHoraFin})
            setIdAsignatura(docSchedule.data().idAsignatura)
        }

        getSchedule()
    },[])



    const hours = [
        <option></option>,
        <option>9:30</option>,
        <option>10:30</option>,
        <option>11:30</option>,
        <option>12:30</option>,
        <option>13:30</option>,
        <option>15:30</option>,
        <option>16:30</option>,
        <option>17:30</option>,
        <option>18:30</option>,
        <option>19:30</option>,
        <option>22:30</option>,
        <option>23:30</option>,
        <option>24:30</option>,
        <option>1:30</option>,
        <option>2:30</option>,
        <option>3:30</option>,
        <option>4:30</option>,
    ]

    return (
        <div className="p-7 font-semibold flex-1 overflow-y-hidden h-screen">
        <h1 className="flex tems-center justify-center">Editar Horario</h1>
        <div className="mt-16 ml-96 mr-96 shadow-2xl h-5/6">
            <Form className="mt-18 p-32">
                <Form.Group className="mb-3 flex flex-row h-10 items-center">
                    <Form.Label className="mr-10 w-72">Lunes de  </Form.Label>
                    <Form.Select type="text" value={lunes.HoraIni} onChange={(event) => setLunes({...lunes, HoraIni: event.target.value})}>
                        {hours.map((value) => {
                            return <option>{value}</option>
                        })}
                    </Form.Select>
                    <Form.Label className="mr-10 ml-10">  a </Form.Label>
                    <Form.Select type="text" value={lunes.HoraFin} onChange={(event) => setLunes({...lunes, HoraFin: event.target.value})}>
                        {hours.map((value) => {
                            return <option>{value}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 flex flex-row h-10 items-center">
                    <Form.Label className="mr-10 w-72">Martes de  </Form.Label>
                    <Form.Select type="text" value={martes.HoraIni} onChange={(event) => setMartes({...martes, HoraIni: event.target.value})}>
                        {hours.map((value) => {
                            return <option>{value}</option>
                        })}
                    </Form.Select>
                    <Form.Label className="mr-10 ml-10">  a  </Form.Label>
                    <Form.Select type="text" value={martes.HoraFin} onChange={(event) => setMartes({...martes, HoraFin: event.target.value})}>
                        {hours.map((value) => {
                            return <option>{value}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 flex flex-row h-10 items-center">
                    <Form.Label className="mr-10 w-72">Miercoles de  </Form.Label>
                    <Form.Select type="text" value={miercoles.HoraIni} onChange={(event) => setMiercoles({...miercoles, HoraIni: event.target.value})}>
                        {hours.map((value) => {
                            return <option>{value}</option>
                        })}
                    </Form.Select>
                    <Form.Label className="mr-10 ml-10">  a  </Form.Label>
                    <Form.Select type="text" value={miercoles.HoraFin} onChange={(event) => setMiercoles({...miercoles, HoraFin: event.target.value})}>
                        {hours.map((value) => {
                            return <option>{value}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 flex flex-row h-10 items-center">
                    <Form.Label className="mr-10 w-72">Jueves de  </Form.Label>
                    <Form.Select type="text" value={jueves.HoraIni} onChange={(event) => setJueves({...jueves, HoraIni: event.target.value})}>
                        {hours.map((value) => {
                            return <option>{value}</option>
                        })}
                    </Form.Select>
                    <Form.Label className="mr-10 ml-10">  a  </Form.Label>
                    <Form.Select type="text" value={jueves.HoraFin} onChange={(event) => setJueves({...jueves, HoraFin: event.target.value})}>
                        {hours.map((value) => {
                            return <option>{value}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 flex flex-row h-10 items-center">
                    <Form.Label className="mr-10 w-72">Viernes de  </Form.Label>
                    <Form.Select type="text" value={viernes.HoraIni} onChange={(event) => setViernes({...viernes, HoraIni: event.target.value})}>
                        {hours.map((value) => {
                            return <option>{value}</option>
                        })}
                    </Form.Select>
                    <Form.Label className="mr-10 ml-10">  a  </Form.Label>
                    <Form.Select type="text" value={viernes.HoraFin} onChange={(event) => setViernes({...viernes, HoraFin: event.target.value})}>
                        {hours.map((value) => {
                            return <option>{value}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                
                <Button className="text-center items-center justify-center mt-12 ml-52" onClick={() => {UpdateSchedule()}}>
                    Actualizar Horario
                </Button>
            </Form>
        </div>
        </div>
    )
}

export default EditSchedule;