let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let validate = require('mongoose-validator');


let stringValidator = [
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: false,
    message: 'Name should contain alpha-numeric characters only'
  })
];


let DiarySchema = new Schema({
  title: {
    type: String,
  },
  date: {
    type:String,
    required:true
  },
  acts: {
    type: Array,
    required: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
})


module.exports = mongoose.model('Diary', DiarySchema);
