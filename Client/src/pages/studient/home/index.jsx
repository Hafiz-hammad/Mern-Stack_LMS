import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/auth-context';
import {React, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import banner from '../../../../public/banner.webp'
import { courseCategories } from '@/config';
function StudientHomePage  () {
  const  {resetCredentials} = useContext(AuthContext);
  const navigate = useNavigate();
   
  

  function handleLogout() {
    console.log('Logout clicked');
    resetCredentials();
    sessionStorage.clear();
    console.log('Session storage cleared');
  
    navigate('/auth'); // Redirect to login page
  }
  
  return (
    <div className='min-h-screen bg-white'>
      <section className='flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8'>

<div className='lg:w-1/2 lg:pr-12'>
<h1 className='text-4xl font-bold mb-4'>
  Learning Thats Gets You
</h1>
<p className='text-xl'>Skills for your present and your future. Get Started With Us.</p>

</div>

<div className='lg:w-full mb-8 lg:mb-0'>
  <img
  src={banner}
  width={600}
  height={400}
  className='w-full h-auto rounded-lg shadow-lg' 
  />
</div>

      </section>
      <section className='py-8 px-4 lg:px-8 bg-gray-100'>
<h2 className='text-2xl font-bold mb-6'> Course Categories</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4' >
{
  courseCategories.map(categoryItem =>(

    <Button className='justify-start'
    variant='outline'
    key={categoryItem.id}>
    {categoryItem.label}
    
    </Button>

))
}
      
</div>

      </section>
    </div>


  )
}

export default StudientHomePage;
