const mongoose =require("mongoose")

const TaskSchema = mongoose.Schema({
    title:{type:String,required:true},
    nodes:{type:[Object],required:true},
    edges:{type:[Object],required:true}
})


module.exports = mongoose.model("task",TaskSchema)