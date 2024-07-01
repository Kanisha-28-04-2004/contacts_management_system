const mongoose=require('mongoose')

//scheme
const contactSchema=new mongoose.Schema({
    name:{
        type:String
    },
    number:{
        type:String
    }
})
const Contact=mongoose.model('Contact',contactSchema)
module.exports={Contact}