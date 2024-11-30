const router = require('express').Router()
const Task = require('../Models/TaskSequenceShema')
const mail = require('../nodemailer')
const User = require("../Models/UserSchema")
const { ScheduleMail } = require('../agenda')
const verify = require('../VerifyToken')

router.post("/create/:id",verify,async(req,res)=>{
    try {
        const task = new Task(req.body)
        const response= await task.save()
         await User.findByIdAndUpdate(req.params.id,{
            $push:{sequences:{id:(response._id.toString()),title:req.body.title}}
         },{new:true})
         ScheduleMail(req.body.nodes,req.body.from)
        res.json("created and scheduled successfully")
    } catch (error) {
        console.log(error)
        res.json("server error")
    }
})

router.get("/:id",verify,async(req,res)=>{
    try {
        const task = await Task.findById(req.params.id)
        res.json(task)
    } catch (error) {
        console.log(error)
        res.json("server error")
    }
})

router.put("/update/:id",verify,async(req,res)=>{
    const title =req.body.title
    try {
         await Task.findByIdAndUpdate(req.body.id,req.body,{new:true})
        title && await User.findByIdAndUpdate(req.params.id,
            {$set:{"sequences.$[elem].title":title}},
            {arrayFilters:[{"elem.id":req.body.id}]},
            {new:true})
         ScheduleMail(req.body.nodes,req.body.from)
        res.json("updated successfully")
    } catch (error) {
        console.log(error)
        res.json("server error")
    }
})

router.delete("/delete/:id",verify,async(req,res)=>{ 
    try {
        await Task.findByIdAndDelete(req.params.id)
         await User.findByIdAndUpdate(req.user.id,{
            $pull:{sequences:{id:req.params.id}}
         },{new:true})
        res.json("deleted successfully")
    } catch (error) {
        res.json("server error")
    }
})

module.exports = router;