const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
Name:{
    type:String,
    required:true
},
Email:{
    type:String,
    required:true
},
Number:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
user_type:{
    type:String,
    required:true
}
});
const user=module.exports=mongoose.model('User',userSchema);