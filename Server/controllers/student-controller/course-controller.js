
const Course = require('../../models/Course')
const getAllStudentViewCourses = async(req,res)=>{
    try{

const {category=[],level = [], primaryLanguage=[],sortBy="price-lowtohigh"} =  req.query

let filters = {};
if(category.length){
    filters.category={$in : category.split(',')}
}
if(level.length){
    filters.level={$in : level.split(',')}
}
if(primaryLanguage.length){
    filters.primaryLanguage={$in : primaryLanguage.split(',')}
}

let sortParams ={};

switch (sortBy) {
    case 'price-lowtohigh':
        sortParams.pricing = 1
        break;
        
        case 'price-hightolow':
            sortParams.pricing = -1
            
            break;
            
            case 'title-atoz':
                sortParams.title = -1
        
        break;
        
        case 'title-ztoa':
            sortParams.title = 1
        
        break;



    default:
        sort.pricing = 1
        break;
}


        const courseList = await Course.find(filters).sort(sortParams)
     
     res.status(200).json({
        success:true,
        data:courseList,
        
     })
    }

    catch(e){
console.log(e)
res.status(500).json({
    success:false,
    message:'Some error occourd BYN!!'
})

    }

}


const getStudentViewCourseDetails = async(req,res)=>{
    try{
        const {id} = req.params;
        const courseDetails = await Course.findById(id);
        if(!courseDetails) 
            {
                return res.status(404).json({
                    success:false,
                    message:'No course details found ',
                    data:null,

                
                })
                
            }  
            res.status(200).json({
                success:true,
                data: courseDetails
            })
    }


    catch(e){
console.log(e)
res.status(500).json({
    success:false,
    message:'Some error occourd BYN!!'
})

    }

}
module.exports = {getAllStudentViewCourses, getStudentViewCourseDetails}