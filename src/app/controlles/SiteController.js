const Course = require('../models/course');
const {mutipleMongooseToObject} = require('../../until/mongos');
class SiteController {
    index(req, res,next) {
        // res.render('home');
        Course.find({})
        .then(course =>{
           res.render('home',{course:mutipleMongooseToObject(course)});
        })
        .catch(next)
    }
    search(req,res){
        res.render('search')
    }
}
module.exports = new SiteController();

// const newController = require('./Newscontroler');
