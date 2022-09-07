import React from 'react'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection, getDocs,addDoc,where,query,updateDoc,doc,getDoc} from 'firebase/firestore'
import { BiCalendarCheck } from "react-icons/bi";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import {useNavigate,useParams} from 'react-router-dom'
import * as XLSX from 'xlsx'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {sendEmailVerification,sendPasswordResetEmail} from 'firebase/auth'
import { useAuth } from '../../context/authContext'
import { auth } from '../../firebase-config'

const ShowSubject = () => {
    
    const [idSchedule, setIdSchedule] = useState('')
    const scheduleCollectionRef = collection(db,"schedule")
    const studentsCollectionRef = collection(db,"students")
    const assistanceCollectionRef = collection(db,"assistance")
    const{id} = useParams()
    const {signup} = useAuth()

    const [modalShow, setModalShow] = useState(false);
    const [cargado, setCargado] = useState('')
    const [items, setItems] = useState([])
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [term, setTerm] = useState([])

    //Dias de la semana del horario
    const [lunes, setLunes] = useState({ HoraIni: "",HoraFin:"" })
    const [martes, setMartes] = useState({ HoraIni: "",HoraFin:"" })
    const [miercoles, setMiercoles] = useState({ HoraIni: "",HoraFin:"" })
    const [jueves, setJueves] = useState({ HoraIni: "",HoraFin:"" })
    const [viernes, setViernes] = useState({ HoraIni: "",HoraFin:"" })
    const navigate = useNavigate()

    //Asistencias
    const [assistances, setAssistances] = useState([])


    //calendario
    const [date, setDate] = useState(new Date());

    const onChange = async (date) => {
        const q = query(assistanceCollectionRef, where("fecha", "==", date.toDateString()), where("asignatura", "==", id))
        
        const data = await getDocs(q)

        setAssistances(data.docs.map((doc) => ({...doc.data(), id: doc.id})))

        setShow(true)
        setDate(date)
    }

    const EditSchedule = async () => {
        if(idSchedule !== "")
            navigate('/editSchedule/' + idSchedule)
        else
            alert("Esta asignatura no tiene horario")
    }

    const listStudents = async () => {
        navigate('/showStudentsSubject/' + id)
    }

    const getTableColor = (HoraIni,HoraFin,fila) => {

        if(fila === 1)
            if(HoraIni === '9:30')
                return { backgroundColor: '#33FFDA'}
        if(fila === 2)
            if(HoraIni === '10:30' || HoraFin === '11:30')
                return { backgroundColor: '#33FFDA'}
            else if(HoraIni === '9:30' && HoraFin === '12:30')
                return { backgroundColor: '#33FFDA'}
            else if(HoraIni === '9:30' && HoraFin === '13:30')
                return { backgroundColor: '#33FFDA'}
        if(fila === 3)
            if(HoraIni === '11:30' || HoraFin === '12:30')
                return { backgroundColor: '#33FFDA'}
            else if(HoraIni === '10:30' && HoraFin === '13:30')
                return { backgroundColor: '#33FFDA'}
            else if(HoraIni === '9:30' && HoraFin === '13:30')
                return { backgroundColor: '#33FFDA'}
        if(fila === 4)
            if(HoraIni === '12:30' || HoraFin === '13:30')
                return { backgroundColor: '#33FFDA'}
        if(fila === 5)
            if(HoraIni === '15:30' || HoraFin === '16:30')
                return { backgroundColor: '#33FFDA'}
        if(fila === 6)
            if(HoraIni === '16:30' || HoraFin === '17:30')
                return { backgroundColor: '#33FFDA'}
            else if(HoraIni === '15:30' && HoraFin === '18:30')
                return { backgroundColor: '#33FFDA'}
            else if(HoraIni === '15:30' && HoraFin === '19:30')
                return { backgroundColor: '#33FFDA'}
        if(fila === 7)
            if(HoraIni === '17:30' || HoraFin === '18:30')
                return { backgroundColor: '#33FFDA'}
            else if(HoraIni === '16:30' && HoraFin === '19:30')
                return { backgroundColor: '#33FFDA'}
            else if(HoraIni === '15:30' && HoraFin === '19:30')
                return { backgroundColor: '#33FFDA'}
        if(fila === 8)
            if(HoraFin === '19:30')
                return { backgroundColor: '#33FFDA'}
            
    }

    const readExcel = async (file) => {

        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)

            fileReader.onload=(e) =>{
                const bufferArray=e.target.result

                const wb=XLSX.read(bufferArray,{type:'buffer'})

                const wsname = wb.SheetNames[0]

                const ws = wb.Sheets[wsname]

                const data = XLSX.utils.sheet_to_json(ws)

                resolve(data)
            }

            fileReader.onerror=((error) => {
                reject(error)
            })

        })

        promise.then((items) => {
            items.forEach(async (d) => {
                console.log(d.correo)
                
                const q = query(studentsCollectionRef, where("correo", "==", d.correo))
            
                const querySnapshot = await getDocs(q)
    
                var idStudent
                var asignaturas = []
                
                querySnapshot.forEach((doc) => {
                    idStudent = doc.id
                    asignaturas = doc.data().asignaturas
                })
                
                const contraseña = "123456"
                if(querySnapshot.empty) {
                    console.log("entra")
                    await signup(d.correo,contraseña).catch((error) => {console.log(error)})
                    await addDoc(studentsCollectionRef,{correo:d.correo,nombre:d.nombre,apellidos:d.apellidos, asignaturas:[id]})
                    await sendPasswordResetEmail(auth,d.correo)
                }else if (querySnapshot.size === 1) {
                    const ref = doc(db, "students", idStudent)
                    asignaturas.push(id)
                    await updateDoc(ref, {
                        asignaturas: asignaturas
                    })
                }
    
            })
        })

        

    }

    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Carga de Alumnos
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type="file" onChange={(e) => {
                  const file = e.target.files[0]
                  readExcel(file)
                  setCargado('Carga realizada exitosamente.')
              }}/>
              <span className="ml-5">{cargado}</span> 
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }

    useEffect(() => {

        const getSchedule = async () => {

            const q = query(scheduleCollectionRef, where("idAsignatura", "==", id))
        
            const data = await getDocs(q)
            
            data.forEach((doc) => {
                setLunes({...lunes, HoraIni: doc.data().LHoraIni, HoraFin: doc.data().LHoraFin})
                setMartes({...martes, HoraIni: doc.data().MHoraIni,HoraFin: doc.data().MHoraFin})
                setMiercoles({...miercoles, HoraIni: doc.data().XHoraIni,HoraFin: doc.data().XHoraFin})
                setJueves({...jueves, HoraIni: doc.data().JHoraIni,HoraFin: doc.data().JHoraFin})
                setViernes({...viernes, HoraIni: doc.data().VHoraIni,HoraFin: doc.data().VHoraFin})
                setIdSchedule(doc.id)
            });
        }
        const getSubjectName = async () => {
            const docRef = doc(db, "subjects", id);
            const docSnap = await getDoc(docRef);
            setName(docSnap.data().nombre)
            setDescripcion(docSnap.data().descripcion)
        }

        getSubjectName()
        getSchedule()
    },[])

    function searchingTerm(term) {
        return function(x){
            return x.nombre.toLowerCase().includes(term) || !term
        }
    }

    return (
        <div className="p-7 text-2xl font-semibold flex-1 h-screen w-10 overflow-y-scroll">
            <h1>{name}</h1>
            <p>{descripcion}</p>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <div className="flex flex-row bg-transparent mt-4">
                <div className="shadow-2xl w-3/6 m-2">
                    <Table bordered>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miercoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>9:30 - 10:30</td><td style={getTableColor(lunes.HoraIni,lunes.HoraFin,1)}></td><td style={getTableColor(martes.HoraIni,martes.HoraFin,1)}></td><td style={getTableColor(miercoles.HoraIni,miercoles.HoraFin,1)}></td><td style={getTableColor(jueves.HoraIni,jueves.HoraFin,1)}></td><td style={getTableColor(viernes.HoraIni,viernes.HoraFin,1)}></td>
                        </tr>
                        <tr>
                        <td>10:30 - 11:30</td><td style={getTableColor(lunes.HoraIni,lunes.HoraFin,2)}></td><td style={getTableColor(martes.HoraIni,martes.HoraFin,2)}></td><td style={getTableColor(miercoles.HoraIni,miercoles.HoraFin,2)}></td><td style={getTableColor(jueves.HoraIni,jueves.HoraFin,2)}></td><td style={getTableColor(viernes.HoraIni,viernes.HoraFin,2)}></td>
                        </tr>
                        <tr>
                        <td>11:30 - 12:30</td><td style={getTableColor(lunes.HoraIni,lunes.HoraFin,3)}></td><td style={getTableColor(martes.HoraIni,martes.HoraFin,3)}></td><td style={getTableColor(miercoles.HoraIni,miercoles.HoraFin,3)}></td><td style={getTableColor(jueves.HoraIni,jueves.HoraFin,3)}></td><td style={getTableColor(viernes.HoraIni,viernes.HoraFin,3)}></td>
                        </tr>
                        <tr>
                        <td>12:30 - 13:30</td><td style={getTableColor(lunes.HoraIni,lunes.HoraFin,4)}></td><td style={getTableColor(martes.HoraIni,martes.HoraFin,4)}></td><td style={getTableColor(miercoles.HoraIni,miercoles.HoraFin,4)}></td><td style={getTableColor(jueves.HoraIni,jueves.HoraFin,4)}></td><td style={getTableColor(viernes.HoraIni,viernes.HoraFin,4)}></td>
                        </tr>
                        <tr>
                        <td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                        <td>15:30 - 16:30</td><td style={getTableColor(lunes.HoraIni,lunes.HoraFin,5)}></td><td style={getTableColor(martes.HoraIni,martes.HoraFin,5)}></td><td style={getTableColor(miercoles.HoraIni,miercoles.HoraFin,5)}></td><td style={getTableColor(jueves.HoraIni,jueves.HoraFin,5)}></td><td style={getTableColor(viernes.HoraIni,viernes.HoraFin,5)}></td>
                        </tr>
                        <tr>
                        <td>16:30 - 17:30</td><td style={getTableColor(lunes.HoraIni,lunes.HoraFin,6)}></td><td style={getTableColor(martes.HoraIni,martes.HoraFin,6)}></td><td style={getTableColor(miercoles.HoraIni,miercoles.HoraFin,6)}></td><td style={getTableColor(jueves.HoraIni,jueves.HoraFin,6)}></td><td style={getTableColor(viernes.HoraIni,viernes.HoraFin,6)}></td>
                        </tr>
                        <tr>
                        <td>17:30 - 18:30</td><td style={getTableColor(lunes.HoraIni,lunes.HoraFin,7)}></td><td style={getTableColor(martes.HoraIni,martes.HoraFin,7)}></td><td style={getTableColor(miercoles.HoraIni,miercoles.HoraFin,7)}></td><td style={getTableColor(jueves.HoraIni,jueves.HoraFin,7)}></td><td style={getTableColor(viernes.HoraIni,viernes.HoraFin,7)}></td>
                        </tr>
                        <tr>
                        <td>18:30 - 19:30</td><td style={getTableColor(lunes.HoraIni,lunes.HoraFin,8)}></td><td style={getTableColor(martes.HoraIni,martes.HoraFin,8)}></td><td style={getTableColor(miercoles.HoraIni,miercoles.HoraFin,8)}></td><td style={getTableColor(jueves.HoraIni,jueves.HoraFin,8)}></td><td style={getTableColor(viernes.HoraIni,viernes.HoraFin,8)}></td>
                        </tr>
                    </tbody>
                    </Table>
                </div>

                <div className="m-16 shadow-2xl h-64">
                    <Calendar onChange={onChange} value={date} />
                </div>

                <div className="shadow-2xl w-2/12 flex flex-col items-center align-center">
                    <Button className="text-center  mt-28 w-3/4 " onClick={() => {EditSchedule()}}>
                        Editar Horario
                    </Button>
                    <Button className="text-center  mt-10 w-3/4" onClick={() => {listStudents()}}>
                        Lista de alumnos
                    </Button>
                    <Button className="text-center  mt-10 w-3/4" variant="primary" onClick={() => setModalShow(true)}>
                        Cargar Alumnos
                    </Button>
                </div>
            </div>
            <span>
                {show ? (
                    <div className="shadow-2xl mt-10">
                        <input
                            className="border-none hover:border-none p-2 flex-start"
                            placeholder = "Búsqueda de Alumnos"
                            name="term"
                            onChange={e => setTerm(e.target.value)}
                        />
                        <Table bordered>
                        <thead>
                            <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Hora</th>
                            <th>Fecha</th>
                            <th>Presencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assistances.filter(searchingTerm(term)).map((assistance) =>{
                            
                                return(
                                    <tr>
                                        <td>{assistance.nombre}</td><td>{assistance.apellidos}</td><td>{assistance.hora}</td><td>{assistance.fecha}</td><td><BiCalendarCheck size='2rem'/></td>
                                    </tr>
                                )
                            })} 
                        </tbody>
                        </Table>
                    </div>
                ) : (<div></div>)}
            </span>
    </div>
    )
}

export default ShowSubject;