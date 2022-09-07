import './App.scss';
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './components/Login';
import HomeAdmin from './components/Admin/HomeAdmin';
import CreateTeacher from './components/Admin/CreateTeacher';
import EditTeacher from './components/Admin/EditTeacher';
import HomeTeacher from './components/Teacher/HomeTeacher';
import CreateSubject from './components/Teacher/CreateSubject';
import ShowSubject from './components/Teacher/ShowSubject';
import ShowStudentsSubject from './components/Teacher/ShowStudentsSubject';
import EditSubject from './components/Teacher/EditSubject';
import EditSchedule from './components/Teacher/EditSchedule';
import CreateSchedule from './components/Teacher/CreateSchedule';
import SidebarLayout from './components/sidebarLayout';
import SidebarLayoutTeacher from './components/sidebarLayoutTeacher';
import { ProtectedRoute } from './components/ProtectedRoute'
import { ProtectedRouteTeacher } from './components/ProtectedRouteTeacher'

function App() {

  return (
    <Router>
      <div className='flex'>
      <AuthProvider>
        <Routes>
          <Route path='/' index exact={true} element={<Login />}/>
          <Route element={<ProtectedRoute><SidebarLayout/></ProtectedRoute>}>
            <Route path='/HomeAdmin' element={<ProtectedRoute><HomeAdmin /></ProtectedRoute>}/>
            <Route path='/createTeacher' element={<ProtectedRoute><CreateTeacher /></ProtectedRoute>}/>
            <Route path='/editTeacher/:id' element={<ProtectedRoute><EditTeacher /></ProtectedRoute>}/>
          </Route>
          <Route element={<ProtectedRouteTeacher><SidebarLayoutTeacher/></ProtectedRouteTeacher>}>
            <Route path='/HomeTeacher' element={<ProtectedRouteTeacher><HomeTeacher /></ProtectedRouteTeacher>}/>
            <Route path='/createSubject' element={<ProtectedRouteTeacher><CreateSubject /></ProtectedRouteTeacher>}/>
            <Route path='/showSubject/:id' element={<ProtectedRouteTeacher><ShowSubject /></ProtectedRouteTeacher>}/>
            <Route path='/editSubject/:id' element={<ProtectedRouteTeacher><EditSubject /></ProtectedRouteTeacher>}/>
            <Route path='/editSchedule/:id' element={<ProtectedRouteTeacher><EditSchedule /></ProtectedRouteTeacher>}/>
            <Route path='/createSchedule/:id' element={<ProtectedRouteTeacher><CreateSchedule /></ProtectedRouteTeacher>}/>
            <Route path='/showStudentsSubject/:id' element={<ProtectedRouteTeacher><ShowStudentsSubject /></ProtectedRouteTeacher>}/>
          </Route>
        </Routes>
      </AuthProvider>
      </div>
    </Router>

  );
}

export default App;
