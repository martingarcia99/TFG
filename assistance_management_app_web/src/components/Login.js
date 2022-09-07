import React from 'react'
import { useAuth } from '../context/authContext'
import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom'
import Background from '../assets/loginimage.jpg'
import logo from '../assets/logo.png'
import '../App.scss';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {login} = useAuth()
    const navigate = useNavigate()
    
    const logIn = async () => {
        try{
            await login(email,password)
            console.log(email)
            if( email === 'admin@gmail.com')
                navigate('/HomeAdmin')
            else    
                navigate('/HomeTeacher')
        }catch(error){
            console.log(error.code)
            if(error.code === "auth/internal-error"){
                setError("Debes escribir la contraseña")
            }else if(error.code === "auth/wrong-password"){
                setError("Contraseña incorrecta")
            }else if(error.code === "auth/user-not-found")
                setError("El correo no existe")
        }
        
    }

    return (
        <div className="flex flex-row h-screen">
            <img src={Background} width="87%"/>
            <div className="flex absolute right-0 shadow-2xl h-screen bg-gray-100">
                <Form className="items-center justify-center ml-20 p-32 h-48 mr-20 mt-20">
                    <div className="flex gap-x-4 items-center mt-0">
                        <img
                        src={logo}
                        className={`w-52 h-18 mb-3`}
                        />
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" onChange={(event) => {setEmail(event.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" onChange={(event) => {setPassword(event.target.value)}}/>
                        <Form.Text className="text-muted">
                            {error}
                        </Form.Text>
                    </Form.Group>
                    
                    
                    <Button className="text-center items-center justify-center" onClick={() => {logIn()}}>
                        Iniciar Sesion
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;