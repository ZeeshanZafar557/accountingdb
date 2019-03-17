const mongoose=require('mongoose');

const incomeSchema=mongoose.Schema({
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
const income=module.exports=mongoose.model('Income',incomeSchema);