import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { noteState } from '../../recoil/noteAtom';
import axios from 'axios';
import './note.css';
import baseurl from '../../baseurl';

interface Note {
    id: string;
    title: string;
    content: string;
}

const Note = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    // const notes = useRecoilValue(noteState);
    // const selectedNote = notes.find((note) => note.id === id);
    const [isLoading, setIsLoading] = useState(true);
    const [noteData, setNoteData] = useState<Note | null>(null);

    useEffect(() => {
        const fetchSingleNote = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from where you store it
                if (!token) {
                    console.error('Authorization token not found');
                    setIsLoading(false);
                    return;
                }

                const response = await axios.get(`${baseurl}/getsinglenote/${id}`, {
                    headers: { Authorization: token },
                }); // Adjust the URL as needed

                setNoteData(response.data.note);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching note:', error);
                setIsLoading(false);
            }
        };

        fetchSingleNote();
    }, [id]);

    const handleDeleteNote = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from where you store it
            if (!token) {
                console.error('Authorization token not found');
                return;
            }

            await axios.delete(`${baseurl}/deletenote/${id}`, {
                headers: { Authorization: token },
            });

            navigate('/')

        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <section className="note-container">
            {isLoading ? (
                <p>Loading...</p>
            ) : noteData ? (
                <>
                    <h2>{noteData.title}</h2>
                    <p>{noteData.content}</p>
                    <button onClick={() => handleDeleteNote()} className='delete'>Delete Note</button>
                </>
            ) : (
                <p>Note not found</p>
            )}
        </section>
    );
};

export default Note;