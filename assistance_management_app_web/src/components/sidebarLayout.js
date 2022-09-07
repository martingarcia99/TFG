import { Outlet } from 'react-router-dom'; 
import Navbar from './navigationBar';

const SidebarLayout = () => ( 
    <>
        <Navbar /> 
        <Outlet /> 
    </> 

);

export default SidebarLayout;
