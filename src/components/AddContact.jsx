import { useState } from "react"

function AddContact({addContact}){
    const [isFormVisible,setForm]=useState(false)
    const [name,setName]=useState('')
    const [number,setNumber]=useState('')
    const toggleFormVisibility=()=>{
        setForm(!isFormVisible)
    }
    const handleFormSubmit=(e)=>{
        e.preventDefault()
        addContact({'name':name, 'number':number})
        setName('')
        setNumber('')
        setForm(false)
    }
    
    return(
        <>
        <div className="category">
        <div className="addcontact">
        {!isFormVisible&&(<button className="addbutton" onClick={toggleFormVisibility}>Add Contact
                </button>)}
            {isFormVisible&&(<div>    
            <h6>Add Contact</h6>
            <form className="addform" onSubmit={handleFormSubmit}>
                <div>
                    <label> Name  </label>
                    <input type="text" name="name" placeholder="Name"
                     value={name}
                     onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Number  </label>
                    <input type="text" name="number" placeholder="Number"
                    value={number}
                    onChange={(e)=>setNumber(e.target.value)}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
            )}
        </div>
      <div className="search">
            <label>Search</label>
            <input className="searching" type="text" placeholder="Search"></input>
        </div>
        </div>
        </>
    )
}
export default AddContact