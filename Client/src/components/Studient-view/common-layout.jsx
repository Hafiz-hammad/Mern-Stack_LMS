import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentViewCommonHeader from './header'
import StudientHomePage from '@/pages/studient/home'

const StudientViewCommonLayout = () => {
  return (
    <div>
      {/* <h1>Hammad</h1> */}
     <Outlet/>

<StudentViewCommonHeader/>
<StudientHomePage/>
    </div>
  )
}

export default StudientViewCommonLayout
