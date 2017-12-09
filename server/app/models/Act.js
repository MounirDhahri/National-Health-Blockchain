let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let validate = require("mongoose-validator");


// let actValidator = [
//   validate({
//     validator:"",
//     message:""
//   })
// ]

let ActSchema = new Scheme({
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  address: {
    type: Array,
    default: []
  },
  content: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Act', ActSchema);
