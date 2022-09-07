import React from 'react';
import { ImageBackground } from 'react-native';
import Carta from '../components/carta'

const Login = () => (


      <ImageBackground 
          source={require('../images/fondo_login.jpg')} 
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
      >
      <Carta ></Carta>
        
      </ImageBackground>
)

export default Login
