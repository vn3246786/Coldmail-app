const router = require('express').Router()
const User = require('../Models/UserSchema')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const mail = require('../nodemailer')


router.post('/register' ,async (req, res) => {

  const newUser = new User({
    organisation:req.body.organisation,
    username : req.body.username,
    email : req.body.email,
    password : crypto.AES.encrypt(req.body.password,process.env.CRYPTO_SECRETE_KEY).toString(),
   })
   try {
       const user = await newUser.save()
       const {sequences,password,...rest}=user._doc
       const accessToken = jwt.sign({id : user._id }, process.env.JWT_ACCESSTOKEN_KEY )
       res.json({...rest,accessToken})
   } catch (error) {
    if(error.code===11000){
      if(error.keyPattern.username){
res.json("username already exists")
      }else res.json("email already exists")
    }else 
    res.json("server error")
   }
}
)


router.post('/login',async (req, res) => {
  try {
    const user = await User.findOne({email:req.body.email},{sequences:0})
   if ( !user ) {
     res.json('username or password is incorrect')}
   else{
     const Bytes = crypto.AES.decrypt(user.password , process.env.CRYPTO_SECRETE_KEY)
    const OriginalPassword = Bytes.toString(crypto.enc.Utf8)
    if(OriginalPassword == req.body.password)
    {
      const {password, ...info} = user._doc
      const accessToken = jwt.sign({id : user._id}, process.env.JWT_ACCESSTOKEN_KEY )
      res.status(200).json({...info , accessToken})
    }else {
      res.json('username or password is incorrect')
    } 

   }
  
  } catch (error) {
    console.log(error)
    res.status(500).json("server error")
    
  }
} )




module.exports = router;


