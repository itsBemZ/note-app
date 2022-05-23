import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import notes from '../assets/data'
import { ReactComponent as ArrowLeftIcon } from '../assets/arrow-left.svg'

const NotePage = () => {
  let { noteId } = useParams()

  // let note = notes.find(note => note.id === Number(noteId))
  let [note, setNote] = useState(null)
  let navigate = useNavigate();

  useEffect(() => {
    getNote()
     //eslint-disable-next-line
  }, [noteId])
  
  let getNote = async () => {
    if (noteId === 'new') return
    let response = await fetch(`http://localhost:8000/notes/${noteId}`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    await fetch(`http://localhost:8000/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note, 'updated': new Date() })
    })
    navigate('/')
  }

  let updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note, 'updated': new Date() })
    })
    navigate('/')
  }

  let deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    navigate('/')
    // history.push('/')
  }

  let handleSubmit =  () => {
    if (noteId !== 'new' && !note.body) {
      deleteNote()
    } else if (noteId !== 'new') {
      updateNote()
    } else if (noteId === 'new' && note !== null) {
      createNote()
    }
    // navigate('/')
    // history.push('/')
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
            <ArrowLeftIcon onClick={handleSubmit}/>
        </h3>
        {noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ):(
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea onChange={(e)=> {setNote({ ...note, 'body':e.target.value })}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage