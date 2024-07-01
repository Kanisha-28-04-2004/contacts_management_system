const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const {Contact}=require('./Contact.js')
const app=express()
app.use(bodyParser.json())
app.use(cors())
const port=8000
async function startServer(){
    try{
        const connectionURI='mongodb+srv://kanisha:2804@cluster0.ktvjyfz.mongodb.net/ContactManager?retryWrites=true&w=majority&appName=Cluster0'
    await mongoose.connect(connectionURI)
    console.log('Db connection establised')
    app.listen(port,()=>{
        console.log(`Listening on port ${port}..`)
    })
    } catch(error){
        console.log(error)
        console.log('couldnt connect')
    }

}
startServer()
app.get('/contacts/all',async (request,response)=> {
    try{
        const contacts=await Contact.find()
    response.status(200).json(contacts)
    } catch(error){
        response.status(500).json(
            {
                'status':'failure',
                'message':'could not fetch document',
                'error':error
            }
        )

    }
})

app.post('/contacts/new',async (request,response)=>{
    try{
        const contact ={
            name:request.body.name,
            number:request.body.number
        }
        await Contact.create(contact)
        response.status(201).json(
            {
                'status':'success',
                'message':'new contact created '
            }
        )
    } catch(error){
        response.status(500).json(
            {
                'status':'failure',
                'message':'could not post the document',
                'error':error
            }
        )
    }
})

app.patch('/contacts/edit/:id',async (request,response)=>{
    try{
        const editedContact={
            'name':request.body.name,
            'number':request.body.number
        }
        await Contact.findByIdAndUpdate(request.params.id,editedContact)
        response.status(201).json(
            {
                'status':'success',
                'message':'contact edited'
            }
        )
    } catch(error){
        response.status(500).json(
            {
                'status':'failure',
                'message':'could not edit the document',
                'error':error
            }
        )
    }
})

app.delete('/contacts/delete/:id',async (request,response)=>{
    try{
        await Contact.findByIdAndDelete(request.params.id)

    } catch(error){
        response.status(500).json(
            {
                'status':'failure',
                'message':'could not delete ',
                'error':error
            }
        )

    }

})