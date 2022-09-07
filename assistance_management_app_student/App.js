import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login'
import Home from './screens/Home';
import Subject from './screens/Subject'

const Stack = createNativeStackNavigator()

const App = () => {
  return(
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{
            headerShown: false
          }}
          
        />
      <Stack.Screen 
        name="Assitance Management App" 
        component={Home} 
        options={{
          headerShown: true,
          headerBackVisible:false 
        }}
      />

      <Stack.Screen 
        name="Asignatura" 
        component={Subject} 
        options={{
          headerShown: true,
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
