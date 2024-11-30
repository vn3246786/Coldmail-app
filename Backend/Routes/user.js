const router = require('express').Router()
const User = require('../Models/UserSchema')
const mail = require('../nodemailer')
const agenda = require("../agenda")
const verify = require('../VerifyToken')


router.get("/sequences/:id",verify,async(req,res)=>{
    try {
    const response = await User.findById(req.params.id,{organisation:0,username:0,password:0,email:0,_id:0,__v:0})
    res.json(response.sequences)
    } catch (error) {
        res.json("server error")
    }
})



module.exports = router;