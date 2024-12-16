import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import AuthPage from './pages/auth'
import RouteGuard from './components/route-gaurd'
import { useContext } from 'react'
import { AuthContext } from './context/auth-context'
import InstructorDashboard from './pages/instructor'
import StudientViewCommonLayout from './components/Studient-view/common-layout'
import StudientHomePage from './pages/studient/home'
import NotFound from './pages/not-found'
import InstructorDashboardPage from './pages/instructor'
import AddNewCourse from './pages/instructor/add-new-course'

function App() {
const {auth}  = useContext(AuthContext)
  return (
<Routes>
  <Route path='/auth' element={<RouteGuard
  element={<AuthPage/>}
  authenticated={auth.authenticate }

    user={auth?.user}
  
  />}/>

  <Route 
  path='/instructor'
element={
  <RouteGuard
  element={
    
    <InstructorDashboardPage/>}
    authenticated={auth?.authenticate}
    user={auth?.user}
  />
}



/  >
  <Route 
  path='/instructor/create-new-course'
element={
  <RouteGuard
  element={
    
    <AddNewCourse/>}
    authenticated={auth?.authenticate}
    user={auth?.user}
  /> 
}



/  >

<Route

path='/'
element={<RouteGuard
element={<StudientViewCommonLayout/>}

authenticated={auth?.authenticate}
user={auth?.user}
/>}
/>
  <Route
  path='home'
  element={<StudientHomePage/>}
 / >
  <Route
  path='home'
  element={<StudientHomePage/>}
  />

  <Route path='*' element={<NotFound/>}/>
</Routes>


  )
}

export default App
