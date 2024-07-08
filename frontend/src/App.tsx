import { useGetNotes } from "./api/notesAppComponents"


const App = () => {

  const {
    data : notes, 
    status : fetchStatus
  } = useGetNotes({});

  return (
    <>
      { fetchStatus === 'pending' && (
        <p>Loading data...</p>
      )}
      { fetchStatus === 'error' && (
        <p>Error fetching data...</p>
      )}
      { fetchStatus === 'success' && notes!.length === 0 && (
        <p>No results"</p>
      )}
      { fetchStatus === 'success' && notes!.length != 0 && (
        notes!.slice().reverse().map(note => ( 
          <div key={note.id}>
            <h4>{note.title}</h4>
            <h5>{note.body}</h5>
          </div>
        ))
      )}
    </>
  )
}

export default App
