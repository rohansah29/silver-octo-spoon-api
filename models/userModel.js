const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    label:{type:String,enum:["work","school","friends","family"],required:true},
    booked_slots:{type:Array,default:[]}
})

const UserModel=mongoose.model("user",userSchema);

module.exports={
    UserModel
}