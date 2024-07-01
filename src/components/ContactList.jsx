import { useState } from 'react'
function ContactList({ contacts, deleteContact, editContact }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedContact, setEditedContact] = useState({ name: '', number: '' });

  const handleEditClick = (index, contact) => {
    setEditingIndex(index);
    setEditedContact({name:contact.name,number:contact.number});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  const handleEditSubmit = (index, id) => {
    editContact(index, id, editedContact);
    setEditingIndex(null);
  }
  return (
    <>
      <table className="table-content">
        <thead>
          <tr>
            <th>Name</th>
            <th>PhoneNumber</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{editingIndex === index ?
                (<input type="text" name="name"
                  value={editedContact.name}
                  onChange={handleInputChange} />) : (contact.name)}</td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    name="number"
                    value={editedContact.number}
                    onChange={handleInputChange}
                  />
                ) : (
                  contact.number
                )}
              </td>
              <td>
                <div className="buttons">
                  <button onClick={() => deleteContact(index, contact._id)}>Delete</button>
                  {editingIndex === index ? (
                    <button onClick={() => handleEditSubmit(index, contact._id)}>Save</button>
                  ) : (<button onClick={() => handleEditClick(index, contact)}>Edit</button>)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  )
}
export default ContactList