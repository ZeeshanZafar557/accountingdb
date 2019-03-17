const mongoose=require('mongoose');

const expenceSchema=mongoose.Schema({
amount:{
    type:String,
    required:true
},
type:{
    type:String,
    required:true
},
user_id:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
}
});
const expence=module.exports=mongoose.model('Expence',expenceSchema);