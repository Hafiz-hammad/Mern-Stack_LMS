import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { filterOptions, sortOptions } from '@/config';
import { StudentContext } from '@/context/student-context';
import { fetchStudentViewCourseListService } from '@/Service';
import { ArrowUpDownIcon, KeyIcon } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const studentViewCoursesPage = () => {
  const [sort, setSort] = useState('price-lowtohigh');
  const [filters, setFilters] = useState({});
  const { studentCoursesList, setStudentCoursesList } = useContext(StudentContext);
const [searchParams, setSearchParams] =useSearchParams() 

function createSearchParamsHelper (filterParams){
const queryParams =[];
for (const [key , value] of Object.entries(filterParams)){
  if(Array.isArray(value) && value.length > 0){
const paramValue = value.join(',')

queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)


  }
}
return queryParams.join('&')
}

 function handleFilterOnChange (getSectionId ,getCurrentOption){

let cpyFilters={ ...filters };
const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)
console.log(indexOfCurrentSection,getSectionId)
if(indexOfCurrentSection===-1){
  cpyFilters={
    ...cpyFilters,
    [getSectionId] : [getCurrentOption.id]
  }
  console.log(cpyFilters)
}
else{
  const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption.id);
  if(indexOfCurrentOption === -1) 
    cpyFilters[getSectionId].push(getCurrentOption.id)
    else cpyFilters[getSectionId].splice(indexOfCurrentOption,1  )
  }
  setFilters(cpyFilters)
  sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
  

}
  async function fetchAllStudentViewCourses(filters, sort){

    const query = new URLSearchParams({
...filters,
sortBy :sort

    })
      const response = await fetchStudentViewCourseListService(query);
      if(response?.success) setStudentCoursesList(response?.data)
      console.log("response", response) 
    }
    
useEffect(()=>{
const buildQueryStringForFilters = createSearchParamsHelper(filters)
setSearchParams(new URLSearchParams(buildQueryStringForFilters))
},[filters])

    useEffect(()=>{

      if(filters!==null && sort !== null)
    fetchAllStudentViewCourses(filters,sort)
    },[filters, sort])
    console.log(filters)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>

      {/* Flex container for layout */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filters Section */}
        <aside className="w-full md:w-64 space-y-4">
          <div className="p-4 space-y-4 overflow-y-auto max-h-[400px]">
            {Object.keys(filterOptions).map((KeyItem) => (
              <div key={KeyItem} className="p-4 space-y-4">
                <h3 className="font-bold mb-3">{KeyItem.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[KeyItem].map((option) => (
                    <Label
                      key={option.id}
                      className="flex font-medium items-center gap-3"
                    >
                      <Checkbox
                        checked={
filters && Object.keys(filters).length>0
&& filters[KeyItem] && filters[KeyItem].indexOf(option.id)>-1


                        }
                        onCheckedChange={() =>
                          handleFilterOnChange(KeyItem, option)
                        }
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 ">
          {/* Sort By Dropdown */}
          <div className="flex justify-end items-center mb-4 gap-5 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 px-4 p-5"
                  size="sm"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className='text-sm text-black font-bold'>10 Results</span>
          </div>
<div className='space-y-4'>

{

  studentCoursesList && studentCoursesList.length>0?
    studentCoursesList.map(courseItem=>(

      <Card key={courseItem._id} className='cursor-pointer'> 

        <CardContent className='flex gap-4 p-4'>
<div className='w-48 h-32 flex-shrink-0'>
<img
src={courseItem?.image}
className='w-full h-full object-cover'
/>
</div>
<div className='flex-1 '>
<CardTitle className='text-xl mb-2'>
  {courseItem?.title}
</CardTitle>
<p className='text-sm text-gray-600 mb-1'>
  Created By<span className='font-bold'>  {courseItem?.instructorName}
  </span>
   </p>
   <p className='mt-3 text-[16px] text-gray-600 mb-2'>
    {
      `${courseItem?.curriculum?.length <=1?'Lecture' : 'Lectures'} - ${courseItem?.level.toUpperCase()} Level`
    }
   </p>
   <p className='font-bold text-lg '>{`${courseItem?.pricing}`}</p>
</div>
        </CardContent>
      </Card>
    )): <h1>No Corses Found</h1>
}

</div>
        </main>
      </div>
    </div>
  );
};

export default studentViewCoursesPage;
