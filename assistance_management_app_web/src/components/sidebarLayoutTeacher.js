import { Outlet } from 'react-router-dom'; 
import Navbar from './navigationBarTeacher';

const SidebarLayoutTeacher = () => ( 
    <>
        <Navbar /> 
        <Outlet /> 
    </> 

);

export default SidebarLayoutTeacher;
