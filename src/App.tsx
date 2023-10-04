import './App.css'
import AddContact from './components/AddContact'
import { useContactQuery, useContactsQuery } from './services/contactsApi'

function App() {
  const { data, error, isLoading, isFetching, isSuccess } = useContactsQuery()

  return (
    <div className="App">
      <h1>React RTK-Query</h1>
      {isLoading && <h2>Loading...</h2>}
      {isFetching && <h2>Fetching...</h2>}
      {error && <h2>Something went wrong!</h2>}

      {isSuccess && (
        <div className="parent_container">
          {data.map((contact) => (
            <ul key={contact.id}>
              <li>{contact.name}</li>
              <div className="details">
                {' '}
                <ContactDetail id={contact.id} />{' '}
              </div>
            </ul>
          ))}
        </div>
      )}
      <div>
        {' '}
        <AddContact />{' '}
      </div>
    </div>
  )
}

export const ContactDetail = ({ id }: { id: number }) => {
  const { data } = useContactQuery(id)

  return (
    <>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </>
  )
}

export default App
