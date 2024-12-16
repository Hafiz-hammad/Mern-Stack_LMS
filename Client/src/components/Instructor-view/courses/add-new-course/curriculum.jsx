import MediaProgressBar from '@/components/media-progress-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import VideoPlayer from '@/components/vedio-player';
import { InstructorContext } from '@/context/instructor-context'
import { mediaUploadService } from '@/Service';
import React, { useContext } from 'react'

const CourseCurriculum = () => {
  const {courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,setMediaUploadProgressPercentage
  }= useContext(InstructorContext);

function handleNewLecture(){
setCourseCurriculumFormData([
  ...courseCurriculumFormData,
  {
    ...courseCurriculumFormData[0]
  }
])  


}

function handleCourseTitleChange(event, currentIndex){
let  cpycourseCurriculumFormData = [...courseCurriculumFormData];
//  console.log(cpycourseCurriculumFormData,"cpycourseCurriculumFormData")
 cpycourseCurriculumFormData[currentIndex]={
   ...cpycourseCurriculumFormData[currentIndex],
   title : event.target.value
  }
  setCourseCurriculumFormData(cpycourseCurriculumFormData)
}



function handleFreePreviewChange(currentValue, currentIndex){
  // console.log(currentValue,currentIndex)
  let  cpycourseCurriculumFormData = [...courseCurriculumFormData];
  //  console.log(cpycourseCurriculumFormData,"cpycourseCurriculumFormData")
  cpycourseCurriculumFormData[currentIndex]={
    ...cpycourseCurriculumFormData[currentIndex],
    freePreview : currentValue,
  }
  setCourseCurriculumFormData(cpycourseCurriculumFormData)
}

async function handleSingleLectureUpload(event, currentIndex){
  console.log(event.target.files)
  const seletedFiles = event.target.files[0]
  if(seletedFiles){
    const vedeoFormData = new FormData();
    vedeoFormData.append('file',seletedFiles)
    try{
      setMediaUploadProgress(true);
      const response = await mediaUploadService(vedeoFormData, setMediaUploadProgressPercentage)
      if(response.success){
  let  cpycourseCurriculumFormData = [...courseCurriculumFormData];
cpycourseCurriculumFormData[currentIndex]={
  ...cpycourseCurriculumFormData[currentIndex],
  videoUrl : response?.data?.url,
  public_id :response?.data?.public_id,

}
setCourseCurriculumFormData(cpycourseCurriculumFormData);
setMediaUploadProgress(false)
}


    }catch(error){
      console.log(error)
    }
  }

}
console.log(courseCurriculumFormData)


  return <Card>
  <CardHeader>
    <CardTitle>
      Course Curriculum
    </CardTitle>
  </CardHeader>
  <CardContent>
     <Button
     onClick={handleNewLecture}
     
     >Add Lecture</Button>

     {
      mediaUploadProgress ? 
      <MediaProgressBar
      isMediaUploading={mediaUploadProgress}
      progress={mediaUploadProgressPercentage}
      /> : null
     }
     <div className='mt-4 space-y-4'>
      
{
  
  courseCurriculumFormData.map((curriculumItem,index)=>(
    <div className='border p-5 rounded-md'>
<div className='flex gap-5 items-center'>
  <h3 className='font-semibold'>Lecture{index + 1}</h3>
  <Input
  name={`title-${ index+1}`}
  placeholder="Enter Lecture Title"
  className="max-w-96"
  onChange={(event)=> handleCourseTitleChange(event,index)}
  value={courseCurriculumFormData[index]?.title}
  />
<div className="flex items-center space-x-2">
  <Switch
  onCheckedChange={(value)=>handleFreePreviewChange(value,index)}
  checked={courseCurriculumFormData[index]?.freePreview}
  id={`freePreview-${ index+1}`}
  />

  <Label htmlFor={`freePreview-${ index+1}`}>Free Preview</Label>
  </div>
</div>
<div className='mt-6'>
{
  courseCurriculumFormData[index]?.videoUrl?
  <div className='flex gap-3'>
<VideoPlayer
url={courseCurriculumFormData[index]?.videoUrl}
width='450px'
height='200px'
/>
<Button>Replace Video</Button>
<Button className="bg-red-900">Delete Lecture</Button>
  </div>:
  <Input
  type='file'
  accept='vedeo/*'
  className='mb-4'
  onChange={(event)=>handleSingleLectureUpload(event,index)}
  /> 
}
   </div>
    </div>
  ))
}

     </div>
  </CardContent>
  </Card>
}

export default CourseCurriculum;
