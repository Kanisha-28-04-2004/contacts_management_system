
import './App.css'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'
import Header from './components/Header'
import { useState,useEffect } from 'react'
function App() {
  // const apiUrl='http://localhost:8000'
  const apiUrl='https://contactmanager-y9yx.onrender.com'

  const [contacts,setContacts]=useState([])
  useEffect(()=>{
    async function fetchData(){
      const responsedata=await fetch(apiUrl+'/contacts/all')
      const data= await responsedata .json()
      return data
    }
    fetchData().then((data)=>{
      setContacts(data)
    }
    )
  },[])
  const addContact=async (newContact)=>{
    setContacts([...contacts,newContact])
   try{
    const responseData=await fetch(apiUrl+'/contacts/new',{
      method:'POST',
      mode:'cors',
      body:JSON.stringify({'name':newContact.name,
        'number':newContact.number
      }) ,
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    })
    const data=await responseData.json()
    console.log(data)
   }
   catch(error){
    console.log(error)
    console.log('Could not add contact')
   }

  }
  const deleteContact=async (index,id)=>{
    const newContactList=[...contacts]
    newContactList.splice(index,1)
    setContacts(newContactList)
    try{
      const responseData=await fetch(apiUrl+`/contacts/delete/${id}`,{
        method:'DELETE',
        mode:'cors',
        headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      })
      const data=await responseData.json()
      console.log(data)
     }
     catch(error){
      console.log(error)
      console.log('Could delete contact')
     }
  }
  const editContact=async (index,id,editedContact)=>{
    const newContactList=[...contacts]
    newContactList[index]=editedContact
    setContacts(newContactList)
    try{
      const responseData=await fetch(apiUrl+`/contacts/edit/${id}`,{
        method:'PATCH',
        mode:'cors',
        body:JSON.stringify({'name':editedContact.name,
        'number':editedContact.number
      }) ,
        headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      })
      const data=await responseData.json()
      console.log(data)
     }
     catch(error){
      console.log(error)
      console.log('Could not edit contact')
     }
  }

  return (
    <>
      <div>
        <Header/>
        <AddContact addContact={addContact}/>
        <ContactList contacts={contacts} 
        deleteContact={deleteContact}
        editContact={editContact}/>
      </div>
       
    </>
  )
}

export default App
