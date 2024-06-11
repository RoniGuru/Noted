import { useState, useEffect, useMemo } from 'react';
import api from '../api';
import { NoteIF } from '../utils/interfaces';

const useNote = () => {
  const [notes, setNotes] = useState<NoteIF[]>([]);

  const getNotes = async () => {
    api
      .get('base/notes/')
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => alert(err));
  };

  const createNote = async (title: string, category: number | null) => {
    api
      .post('/base/notes/', { title, body: '', category })
      .then((res) => {
        if (res.status === 201) {
          const updatedNotes = [...notes, res.data];
          setNotes(updatedNotes);
        }
      })
      .catch((err) => alert(err));
  };

  const deleteNote = async (id: number) => {
    api
      .delete(`/base/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          getNotes();
        }
      })
      .catch((err) => alert(err));
  };

  const updateNote = async (noteToUpdate: NoteIF) => {
    api
      .put(`/base/notes/update/${noteToUpdate.id}/`, {
        title: noteToUpdate.title,
        body: noteToUpdate.body,
        category: noteToUpdate.category,
      })
      .then((res) => {
        if (res.status === 200) {
          const updatedNotes = notes.map((note) =>
            note.id === noteToUpdate.id ? noteToUpdate : note
          );
          setNotes(updatedNotes);
        }
      })
      .catch((err) => alert(err));
  };

  const [currentNoteID, setCurrentNoteID] = useState<number | null>(null);
  const currentNote: NoteIF | undefined = useMemo(
    () => notes.find((note) => note.id === currentNoteID),
    [currentNoteID, notes]
  );

  useEffect(() => {
    getNotes();
  }, []);

  return {
    notes,
    getNotes,
    currentNote,
    setCurrentNoteID,
    deleteNote,
    createNote,
    updateNote,
  };
};

export default useNote;
