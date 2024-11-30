const {Agenda}=require("agenda")
const main = require("./nodemailer")
const dotenv = require('dotenv').config()



const agenda = new Agenda({
    db:{address:process.env.MONGO_URL,collection:"ScheduledMails"}
})

agenda.define("send mail",(data)=>{
    const to =data.attrs.data.sources
    const subject =data.attrs.data.mail.subject
    const content =data.attrs.data.mail.compose
    const from =data.attrs.data.from
    main(to,subject,content,from)  
})

function ScheduleMail(nodes,from){
    let sources = []
    let mails=[]
    let waits=[]
    let time =0
    nodes.forEach((node)=>{
      if(node.id.includes("s")){
       node.data.label&& (sources = [...sources,node.data.formData.email])
      }else {
        if(node.data.label==="mail"){
            mails=[...mails,{subject:node.data.formData.subject,compose:node.data.formData.compose}]
        }else if(node.data.label==="wait"){
            time=time+Number(node.data.formData);
            waits=[...waits,{time:time}]
        }else return
      }
    })
    mails.forEach(async (mail,i)=>{
        try {
            await agenda.schedule(`in ${waits[i]?waits[i].time:0} seconds`,"send mail",{
                sources:sources,
                mail:mail,
                from:from
               })
        } catch (error) {
           console.log("error") 
        }
   
    })
  }


module.exports = {agenda,ScheduleMail}