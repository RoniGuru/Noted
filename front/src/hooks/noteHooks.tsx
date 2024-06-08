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

  const updateNote = async (id: number) => {
    api
      .put(`/base/notes/update/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          getNotes();
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
    updateNote,
  };
};

export default useNote;
