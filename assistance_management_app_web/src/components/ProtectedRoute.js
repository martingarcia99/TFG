import {useAuth} from '../context/authContext'
import {Navigate} from 'react-router-dom'

export function ProtectedRoute({children}) {
    const {user,loading} = useAuth()

    console.log(user)

    if(loading) return null
    if(!user) return <Navigate to='/' />
    //else if(user && user.email !== 'admin@gmail.com') return null

    return <>{children}</>
}