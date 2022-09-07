import logo from '../assets/logo.png'
import { BiUserPlus,BiHome,BiDoorOpen } from "react-icons/bi";
import {Link} from 'react-router-dom'
import {useAuth} from '../context/authContext'


const Navbar = () => {

  const {logout} = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (

    <div className='flex'>
      <div className={` w-72 bg-blue-700 relative duration-300 drop-shadow-lg h-screen`}>
          <div className="flex gap-x-4 items-center mt-0">
            <img
              src={logo}
              className={`w-fit h-18`}
            />
          </div>

          <p className={`flex mt-3 h-3 p-8 text-gray-50 text-sm items-center gap-x-4 no-underline`}>
              Bienvenido Administrador
          </p>
          
          <Link to="/HomeAdmin" className={`flex mt-3 h-3 p-8 cursor-pointer hover:bg-slate-200 text-gray-50 text-sm items-center gap-x-4 no-underline`}>
              <BiHome size='2rem'/>
              <span className={`origin-left`}>
                  Inicio
              </span>
          </Link>
          <Link to="/createTeacher" className={`flex mt-3 h-3 p-8 cursor-pointer hover:bg-slate-200 text-gray-50 text-sm items-center gap-x-4 no-underline`}>
              <BiUserPlus size='2rem'/>
              <span className={`origin-left`}>
                  Alta profesor
              </span>
          </Link>
          <button onClick={handleLogout} className={`flex w-full mt-3 h-3 bottom-0 absolute p-8 cursor-pointer hover:bg-slate-200 text-gray-50 text-sm hover:text-blue-700 items-center gap-x-4 no-underline`}>
            <BiDoorOpen size='2rem'/>
            Cerrar Sesión
          </button>
      </div>
      
    </div>
    
  )
}

export default Navbar