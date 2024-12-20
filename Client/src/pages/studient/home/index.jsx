import { Button } from '@/components/ui/button';
import {React, useContext, useEffect } from 'react'
import banner from '../../../../public/banner.webp'
import { courseCategories } from '@/config';
import { StudentContext } from '@/context/student-context';
import { fetchStudentViewCourseListService } from '@/Service';
function StudientHomePage  () {
  const { studentCoursesList, setStudentCoursesList } = useContext(StudentContext);
  
async function fetchAllStudentViewCourses(){
  const response = await fetchStudentViewCourseListService();
  if(response?.success) setStudentCoursesList(response?.data)
  console.log(response) 
}

useEffect(()=>{
fetchAllStudentViewCourses()
},[])

  

  
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
<section className='py-12 px-4 lg:px-8'>

<h2 className='text-2xl font-bold mb-6'>Featured Courses</h2>
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
  {
    studentCoursesList && studentCoursesList.length >0?
    studentCoursesList.map(courseItem=> 
    <div className='border rounded-lg overflow-hidden shadow cursor-pointer'>
<img
src={courseItem?.image}
width={300}
height={150}
className='w-full h-40 object-cover'

/>
<div className='p-4'>
  <h3 className='font-bold mb-2'>{courseItem.title}</h3>

</div>
    </div>)  :<h1>No courses found</h1>
  }
</div>
</section>
    </div>

  )
}

export default StudientHomePage;
