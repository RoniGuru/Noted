import { openDB } from 'idb';

const DB_NAME = 'notesDB';
const STORE_NAME = 'notes';

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    },
  });
}

export async function addNoteToDB(note) {
  const db = await initDB();
  await db.add(STORE_NAME, note);
}

export async function getNotesFromDB() {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}

export async function updateNoteInDB(note) {
  const db = await initDB();
  await db.put(STORE_NAME, note);
}

export async function deleteNoteFromDB(id) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}
