    import { GraduationCap, TvMinimalPlay } from 'lucide-react'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { AuthContext } from '@/context/auth-context'
    
    const StudentViewCommonHeader = () => {
        const navigate = useNavigate();
  
const {resetCredentials} =useContext(AuthContext)      
  function handleLogout() {
    console.log('Logout clicked');
    resetCredentials();
    sessionStorage.clear();
  }
        return (

<header className='flex items-center justify-between border-b p-4'>
    <div className='flex items-center space-x-4'>

<Link to={'/home'} className='flex items-center hover:text-black'>

<GraduationCap className='h-8 w-8 mr-4'/>
<span className='font-extrabold md:text-xl text-[14px]'>KnowledgeNest</span>
</Link>
<div className='flex items-center space-x-1'>

<Button 
variant="ghost"
onClick={() => navigate('/courses')}
className="text-[14] md:text-[16px] font-medium"
>
Explore Courses

</Button>

</div>
    </div>


<div className='flex items-center space-x-4'>
<div className='flex gap-4 items-center'>
    <div className='flex items-center gap-3'>
<span className='font-extrabold md:text-xl text-[14px]'>
    My Courses
</span>

<TvMinimalPlay className='w-8 h-8 cursor-pointer'/>


    </div>

    <Button onClick={handleLogout}>
        Sing Out
    </Button>
</div>
</div>



</header>

      )
    }
    
    export default StudentViewCommonHeader
    