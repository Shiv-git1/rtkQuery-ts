import React from 'react'
import {
  useAddContactMutation,
  useContactsQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
} from '../services/contactsApi'
import '../App.css'

const AddContact = (): React.JSX.Element => {
  const [addContact] = useAddContactMutation()
  const [updateContact] = useUpdateContactMutation()
  const [deleteContact] = useDeleteContactMutation()

  const { error, isLoading, isFetching } = useContactsQuery()

  //   to refetch data on button click and display data without refresh
  //   removing refetch and using cache tags in contactsApi.ts for auto-fetching
  //   const { refetch } = useContactsQuery()

  // using hard-coded value in place of creating a form
  const contact = {
    id: 4,
    name: 'Rahul',
    email: 'rahul@gmail.com',
  }

  const updContact = {
    id: 4,
    name: 'Updated Rahul',
    email: 'updated-rahul@gmail.com',
  }

  const addHandler = async () => {
    await addContact(contact)
    // refetch()
  }

  const updateHandler = async () => {
    await updateContact(updContact)
  }

  const deleteHandler = async () => {
    await deleteContact(contact.id)
  }

  return (
    <>
      <h1>Using hard coded values in the code</h1>
      <p style={{ color: 'red' }}>
        Please check before adding/updating/deleting
      </p>
      <div className="button_container">
        {isLoading && <h2>Loading...</h2>}
        {isFetching && <h2>Fetching...</h2>}
        {error && <h2>Something went wrong!</h2>}
        <button className="add_btn" onClick={addHandler}>
          Add New Contact
        </button>

        <button className="add_btn" onClick={updateHandler}>
          Update Contact
        </button>

        <button className="add_btn" onClick={deleteHandler}>
          Delete Contact
        </button>
      </div>
    </>
  )
}

export default AddContact
