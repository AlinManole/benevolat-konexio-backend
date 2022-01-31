const { Schema, model } = require("mongoose")

const UserSchema = Schema({
  firstName : {
    type : String,
    required: true
},
lastName : {
    type : String,
    required: true
},
businessName : {
    type : String,
    required: true
},
email : {
  type : String,
  required: true,
  unique: true
},
password : {
  type : String,
  require: true,
  minlength: 8
},
telephone : {
    type : String,
    required: true,
    unique: true
},
program : {
  type: Schema.Types.ObjectId
}, 
messages: [{
  type: Schema.Types.ObjectId
}]
, 
conversation: [{
  type: Schema.Types.ObjectId
}]
,
role: {
  type: String
},
distanciel: {
  type: Boolean
},
courses: [{
  type: Schema.Types.ObjectId
}]
},{
  timestamps: true
})


const User = model('User', UserSchema)

module.exports = User