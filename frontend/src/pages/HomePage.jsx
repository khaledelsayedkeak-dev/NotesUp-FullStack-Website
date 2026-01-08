import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard.jsx'
import axiosInstance from '../lib/axios'
import NoteNotFound from '../components/NoteNotFound.jsx'



const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("ERROR FETCHING NOTES");
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          setIsRateLimited(false);
          toast.error("An error occurred while fetching notes.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}

        {notes.length === 0 && !isRateLimited && <NoteNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
              <NoteCard key="note._id" note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage