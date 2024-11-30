const mongoose =require("mongoose")



const UserSchema = new mongoose.Schema({
    organisation:{type:String,required:true},
    username:{type:String,unique:true,required:true},
    sequences:{type:[Object]},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
})

module.exports = mongoose.model("user",UserSchema)