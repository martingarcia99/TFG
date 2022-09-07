import {useAuth} from '../context/authContext'
import {Navigate} from 'react-router-dom'

export function ProtectedRouteTeacher({children}) {
    const {user,loading} = useAuth()

    if(loading) return null

    if(!user) return <Navigate to='/' />

    return <>{children}</>
}