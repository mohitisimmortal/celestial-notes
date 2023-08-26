import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import './homepage.css';
import { noteState } from '../../recoil/noteAtom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../../baseurl';

interface Note {
  _id: string;
  id: string;
  title: string;
  content: string;
}

const Homepage = () => {
  const notes = useRecoilValue(noteState);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const setNotes = useSetRecoilState(noteState);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false); // State to track the "Add Note" form
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false); // State to track the "Edit Note" form
  const [selectedNote, setSelectedNote] = useState<Note | null>(null); // Initialize with null

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token'); // Example: using localStorage

        if (!token) {
          console.error('Authorization token not found');
          // Handle the case where the token is missing
          return;
        }

        const response = await axios.get(`${baseurl}/getallnotes`, { headers: { Authorization: token } });
        setNotes(response.data.notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
        // Handle error if needed
      }
    };

    fetchNotes();
  }, [setNotes]);

  const handleNoteClick = (id: string) => {
    navigate(`/note/${id}`);
  };

  const handleAddNoteSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // Example: using localStorage

      if (!token) {
        console.error('Authorization token not found');
        // Handle the case where the token is missing
        return;
      }
      // Send API request to create the note
      const response = await axios.post(`${baseurl}/createnote`, { title, content }, { headers: { Authorization: token } });

      // Update Recoil state to include the new note
      setNotes((prevNotes) => [...prevNotes, response.data.note]);

      // Close the "Add Note" form
      setIsAddNoteOpen(false);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleEditNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsEditNoteOpen(true);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleEditNoteSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // Example: using localStorage

      if (!token) {
        console.error('Authorization token not found');
        // Handle the case where the token is missing
        return;
      }
      if (!selectedNote) {
        console.error('No note selected for editing');
        return;
      }

      const response = await axios.put(
        `${baseurl}/updatenote/${selectedNote._id}`,
        { title, content },
        { headers: { Authorization: token } }
      );

      const updatedNote = response.data.note;

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        )
      );

      setIsEditNoteOpen(false);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleEditNoteCancel = () => {
    setIsEditNoteOpen(false);
    setSelectedNote(null);
    setTitle('');
    setContent('');
  };

  const handleAddNoteClick = () => {
    setIsAddNoteOpen(true)
  }

  const handleAddNoteCancel = () => {
    setIsAddNoteOpen(false);
  };

  return (
    <section className="homepage">
      <div className="addicon" onClick={() => handleAddNoteClick()}>
        +
      </div>

      {isAddNoteOpen && (
        <form className="add-note-form" onSubmit={() => handleAddNoteSubmit()}>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit" >Add Note</button>
          <button type="button" onClick={() => handleAddNoteCancel()}>Cancel</button>
        </form>
      )}

      {isEditNoteOpen && selectedNote && (
        <form className="edit-note-form" onSubmit={() => handleEditNoteSubmit()}>
          <input
            type="text"
            placeholder="Edit Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Edit Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => handleEditNoteCancel()}>Cancel</button>
        </form>
      )}

      <div className="notes-container">
        <h2>My Notes</h2>
        <div className="notes-list">
          {notes.map((note) => {
            return (
              <div className="notes" key={note._id}>
                <div className="title">
                  <h2 onClick={() => handleNoteClick(note._id)}>{note.title} {`->`}</h2>
                </div>
                <div className="content">
                  <h5>
                    {note.content
                      .split(/\s+/)
                      .slice(0, 100)
                      .join(' ')}
                    {note.content.split(/\s+/).length > 100 && '...'}
                  </h5>
                </div>
                <button onClick={() => handleEditNoteClick(note)} className='editbtn'>Edit</button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Homepage;