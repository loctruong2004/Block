const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;

mongoose.set('strictQuery', true);
const Course = new Schema({
    name: { type: String, requied:true },
    description: { type: String },
    img: { type: String},
    videoId: { type: String,requied:true },
    slug: { type: String, slug:'name' , unique:true },
},{
   timestamps:true,
});

mongoose.plugin(slug);
Course.plugin(mongooseDelete,{
    deletedAt : true ,
    overrideMethods: 'all' , 
});

module.exports = mongoose.model('Course', Course);
