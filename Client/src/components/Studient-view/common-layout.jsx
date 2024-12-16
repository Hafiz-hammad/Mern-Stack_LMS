import React from 'react'
import { Outlet } from 'react-router-dom'

const StudientViewCommonLayout = () => {
  return (
    <div>
      Common Content 
      <Outlet/>
    </div>
  )
}

export default StudientViewCommonLayout
