import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormControls from '@/components/ui/common-forms/form-controls'
import {courseLandingPageFormControls}  from '@/config'
import { InstructorContext } from '@/context/instructor-context'
import React, { useContext } from 'react'

const CourseLanding = () => {
    const {courseLandingFormData,setCourseLandingFormData} = useContext(InstructorContext)
  return <Card>
<CardHeader>
    <CardTitle>Coure Landing Page </CardTitle>
</CardHeader>
<CardContent>

    <FormControls
    formControls={courseLandingPageFormControls}
    formData={courseLandingFormData}
    setFormData={setCourseLandingFormData}
    />
</CardContent>
  </Card>
}

export default CourseLanding
