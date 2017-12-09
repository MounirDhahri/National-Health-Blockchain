let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let validate = require('mongoose-validator');


let DocumentSchema = new Schema({
  citizenKey: {
    type: String,
    required:true,
    unique: true,
  },
  content: {
    type:String,
    required:true
  }
})


module.exports = mongoose.model('Document', DocumentSchema);
