const Course = require('../models/course');
const {mongooseToObject} = require('../../until/mongos');
const { response } = require('express');

class SiteController {
    show(req,res,next){
        Course.findOne({slug:req.params.slug})
        .then((course)=>{
           res.render('courses/show',{ course: mongooseToObject(course) })
        })
        .catch(next)
    }
//  CREATE METHOD course/create
    create(req,res,next){
        res.render('courses/create')
    }
//  POST METHOD  course/store
    store(req,res,next){
        // res.json(req.body)
        // const formData = req.body;
        // formData.image = `https://www.youtube.com/watch?v=${req.body.videoId}`
        const course = new Course(req.body)
        course.save()
        .then(()=>{res.redirect('/')})
        .catch(error=>{
             
        })
    }
    // get /course/id/edit
    edit(req,res,next){
        Course.findById(req.params.id)
        .then(course => res.render('courses/edit',{course:mongooseToObject(course)}))
        .catch(next)
    }
    // put /course/id
    update(req,res,next){
        Course.updateOne({_id:req.params.id},req.body)
        .then(()=>res.redirect('/me/stored/courses'))
        .catch(next);
    }
    // delete /course/id
    delete(req,res,next){
        Course.delete({_id:req.params.id})
    .then(()=>{res.redirect('back')})
    .catch(next)
    }
    // forcedelete /course/id/force
    forceDelete(req,res,next){
        Course.deleteOne({_id:req.params.id})
    .then(()=>{res.redirect('back')})
    .catch(next)
    }

    // retore /course/id/retore
    Restore(req,res,next){
        Course.restore({_id:req.params.id})
        .then(()=>{res.redirect('back')})
        .catch(next)
    }
    // course/handle-form-action
    hanldeAction(req,res,next){
        switch(req.body.action){
          case 'delete':
            Course.delete({_id:{$in: req.body.idCourses}})
            .then(()=>{res.redirect('back')})
            .catch(next)
            break;

            default:
                response.json({message:'action invalid'})
        }
    }
    hanldeTrashAction(req,res,next){

        switch(req.body.action){
            case 'PATCH':
                Course.restore({_id:{$in: req.body.idCourses}})
                .then(()=>{res.redirect('back')})
                .catch(next);
              break;
            case 'DELETED':
                Course.deleteOne({_id:{$in: req.body.idCourses}})
                    .then(()=>{res.redirect('back')})
                    .catch(next)
              default:
                  response.json({message:'action invalid'})
          }
    }
}
module.exports = new SiteController();

