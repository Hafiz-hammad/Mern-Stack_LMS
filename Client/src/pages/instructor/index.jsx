import InstructorCourses from '@/components/Instructor-view/courses'
import InstructorDashboard from '@/components/Instructor-view/Dashboard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { AuthContext } from '@/context/auth-context'
import { BarChart, Book, LogOut } from 'lucide-react'
import React, { useContext, useState } from 'react'

const InstructorDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const {resetCredentials} = useContext(AuthContext);

const menuItems =[

  {
    icon:BarChart,
    label:'Dashboard',
    value:'dashboard',
    components:<InstructorDashboard/>
  },
  {
    icon:Book,
    label:'Courses',
    value:'courses',
    components:<InstructorCourses/>
  },
  {
icon:LogOut,
label:'Logout',
value:'logout',
components:null

  }
]


function handleLogout(){

resetCredentials();
sessionStorage.clear();

}
return (
  <>
    <div className=' flex h-full min-h-screen bg-gray-100'>

      <aside className='w-64 bg-white shadow-md hidden md:block'>
<div className='p-4'>
<h2 className='text-2xl font-bold mb-4'>


      Instructor View
</h2>
<nav>
{
  menuItems.map(menuItem=>
  <Button
  className='w-full justify-start mb-2'
  variant={activeTab===menuItem.value? 'secondary' : 'ghost'}
    key={menuItem.value}
    onClick={ menuItem.value === 'logout' ? 
      handleLogout : ()=>setActiveTab(menuItem.value)
    }
  >
<menuItem.icon className='mr-2 h-4 w-4'/>
{
  menuItem.label
}
  </Button>

)
}
</nav>
</div>

      </aside>

      <main className='flex-1 p-8 overflow-y-auto'>
        <div className='max-w-7xl mx-auto'>
<h1 className='font-bold text-3xl mb-8'>
Dashboard
  </h1>
<Tabs value={activeTab} onValueChange={setActiveTab}> 
{
  menuItems.map(menuItem=><TabsContent
  value={menuItem.value}
  
  >

{
  menuItem.components !== null ? menuItem.components : null
}

  </TabsContent>)
}
</Tabs>

        </div>

      </main>
    </div>
  </>
  )
}

export default InstructorDashboardPage;
