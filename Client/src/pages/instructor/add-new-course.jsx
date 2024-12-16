import CourseLanding from '@/components/Instructor-view/courses/add-new-course/CourseLandingPage'
import CourseSetting from '@/components/Instructor-view/courses/add-new-course/courseSettings'
import CourseCurriculum from '@/components/Instructor-view/courses/add-new-course/curriculum'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const AddNewCourse = () => {
  return  <div className='container mx-auto p-4'>
<div className=' flex justify-between'>
<h1 className='text-3xl font-extrabold'> 
Create New Course
</h1>
<Button className='text-sm tracking-wider font-bold px-8'>
    SUBMIT
</Button>
</div>
<Card>
    <CardContent>
<div className='container mx-auto p-4'>
<Tabs defaultValue='curriculum' className='space-y-4'>
<TabsList>
    <TabsTrigger value='curriculum'>Curriculum</TabsTrigger>
    <TabsTrigger value='course-landing-page'>Course Landing Page</TabsTrigger>
    <TabsTrigger value='settings'>Settings</TabsTrigger>
</TabsList>
<TabsContent value='curriculum'>
<CourseCurriculum/>
</TabsContent>
<TabsContent value='course-landing-page'>
    <CourseLanding/>
</TabsContent>

<TabsContent value='settings'>
<CourseSetting/>
</TabsContent>

</Tabs>
</div>


    </CardContent>
</Card>

  </div>
}

export default AddNewCourse
