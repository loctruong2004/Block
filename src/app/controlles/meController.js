const Course = require('../models/course');
const {mutipleMongooseToObject} = require('../../until/mongos');
class MeController {
    // get /me/stored/courses
    storedCourses(req,res,next){
        let courseQuery =  Course.find({});
        if(req.query.hasOwnProperty('_sort')){
            courseQuery=courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }
        Promise.all([courseQuery,Course.countDocumentsDeleted()])
        .then(([course,deletedcourse]) =>{
        res.render('me/stored-Courses',
        {   deletedcourse,
            course: mutipleMongooseToObject(course)
        })
    
    })
        .catch(next);
    }
     // get /me/trash/courses
    trashCourses(req,res,next){
        Course.findDeleted({})
        .then(course =>res.render('me/trash-Courses',
        {course: mutipleMongooseToObject(course)}),
        )
        .catch(next);
    }
}
module.exports = new MeController();
