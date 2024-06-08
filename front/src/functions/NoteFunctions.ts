import { useState } from 'react';
import { NoteIF } from '../utils/interfaces';
import { useMemo } from 'react';
import api from '../api';

export const [notes, setNotes] = useState<NoteIF[]>([]);
export const [currentNoteID, setCurrentNoteID] = useState<number | null>(null);
export const currentNote: NoteIF | undefined = useMemo(
  () => notes.find((note) => note.id === currentNoteID),
  [currentNoteID, notes]
);

export const getNotes = async () => {
  api
    .get('base/notes/')
    .then((res) => res.data)
    .then((data) => {
      setNotes(data);
    })
    .catch((err) => alert(err));
};

export const deleteNote = async (id: number) => {
  api
    .delete(`/base/notes/delete/${id}/`)
    .then((res) => {
      if (res.status === 204) {
        getNotes();
      }
    })
    .catch((err) => alert(err));
};

export const updateNote = async (id: number) => {
  api
    .put(`/base/notes/update/${id}/`)
    .then((res) => {
      if (res.status === 204) {
        getNotes();
      }
    })
    .catch((err) => alert(err));
};
