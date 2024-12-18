const Course = require('../../models/Course');




const addNewCourse  = async(req,res)=>{
    try{

const courseData = req.body;
const newlyCreatedCourse = new Course(courseData);
const saveCourse = await newlyCreatedCourse.save();
if(saveCourse){

    res.status(201).json({
        success:true,
        message:'Course Saved Succsessfully BYN!!',
        data : saveCourse,
    })
        
}

    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message: "Some error Occourd Byn!",

        })
    }
}


const getAllCourses  = async(req,res)=>{
    try{

const coursesList = await Course.find({});
res.status(200).json({
success:true,
data:coursesList,



})
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message: "Some error Occourd Byn!",
            
        })
    }
}

const getCourseDetailsByID  = async(req,res)=>{
    try{

const {id} = req.params;
const courseDetails = await Course.findById(id);
if(!courseDetails){
    return res.status(404).json({
        success:false,
        message: "Course Not Found Byn!!",
        
    })
}
res.status(200).json({
    success:true,
    data:courseDetails,
})
}
catch(e){
    console.log(e)
    res.status(500).json({
        success:false,
        message: "Some error Occourd Byn!",
        
    })
}
}

const updateCourseByID  = async(req,res)=>{
    try{
        
        const {id} = req.params;
        const updatedCourseData = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(id, updatedCourseData,{new : true})
        if(!updatedCourse)
            {
        return res.status(404).json({
                    success:false,
                    message: "Course Not Found Byn!!",
                    
            })

            }

            return res.status(200).json({
                success:true,
                message:'Course Updated Succsessfully ByN!',
                data:updatedCourse
            })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message: "Some error Occourd Byn!",
            
        })
    }
}
module.exports = {addNewCourse, getAllCourses, updateCourseByID, getCourseDetailsByID}