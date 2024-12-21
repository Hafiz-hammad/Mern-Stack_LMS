import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentHomePage from '@/pages/studient/home'
import StudentViewCommonHeader from './header'

const StudentViewCommonLayout = () => {
  return (
    <div>
      {/* <h1>Hammad</h1> */}

<StudentViewCommonHeader  />
     <Outlet/>
{/* <StudentHomePage/> */}
    </div>
  )
}

export default StudentViewCommonLayout
