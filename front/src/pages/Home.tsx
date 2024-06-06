import { useState, useEffect } from 'react';
import CreateNote from '../components/CreateNote';
import api from '../api';

import CreateCategory from '../components/CreateCategory';
import Note from '../components/Note';

import '../styles/Home.css';
import Category from '../components/Category';
import NoteHeader from '../components/NoteHeader';
import Navbar from '../components/Navbar';
import { useMemo } from 'react';
import { NoteIF, categoryIF, ColorChoice } from '../utils/interfaces';

function Home() {
  const [colorChoices, setColorChoices] = useState<ColorChoice[]>([]);
  const [categories, SetCategories] = useState<categoryIF[]>([]);
  const [categoryPopUp, setCategoryPopUp] = useState<boolean>(false);
  const [noteCategoryPopUp, setNoteCategoryPopUp] = useState<boolean>(false);

  const [searchCategories, setSearchCategories] = useState<string>('');

  const [notes, setNotes] = useState<NoteIF[]>([]);

  const [currentCategoryID, setCurrentCategoryID] = useState<number | null>(
    null
  );
  const currentCategory: categoryIF | undefined = useMemo(
    () => categories.find((category) => category.id === currentCategoryID),
    [currentCategoryID, categories]
  );

  const [currentNoteID, setCurrentNoteID] = useState<number | null>(null);

  const currentNote: NoteIF | undefined = useMemo(
    () => notes.find((note) => note.id === currentNoteID),
    [currentNoteID, notes]
  );

  useEffect(() => {
    getCategories();
    getNotes();
    getColorChoices();
  }, []);

  const getColorChoices = async () => {
    api
      .get('/base/color-choices/')
      .then((response) => {
        setColorChoices(response.data);
      })
      .catch((error) => console.error('Error fetching color choices:', error));
  };

  const getCategories = async () => {
    api.get('/base/categories/').then((response) => {
      SetCategories(response.data);
    });
  };

  const deleteCategory = async (id: number) => {
    api
      .delete(`/base/categories/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          getCategories();
        }
      })
      .catch((err) => alert(err));
  };

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

  localStorage.setItem('CATEGORIES', JSON.stringify(categories));
  localStorage.setItem('NOTES', JSON.stringify(notes));

  const test = localStorage.getItem('CATEGORIES');
  const test2 = localStorage.getItem('NOTES');

  return (
    <div className="home">
      <Navbar />
      <div className="home-container">
        <div className="category-column ">
          <div className="search">
            <input
              type="text"
              onChange={(e) => setSearchCategories(e.target.value)}
            />
            <button onClick={() => setCategoryPopUp(!categoryPopUp)}>
              create Category
            </button>
          </div>
          <CreateCategory
            trigger={categoryPopUp}
            setTrigger={setCategoryPopUp}
            colorChoices={colorChoices}
            getCategories={getCategories}
          />
          <div className="scroll categories">
            <div
              key="none"
              style={{ backgroundColor: 'grey' }}
              className="category"
              onClick={() => setCurrentCategoryID(null)}
            >
              all
            </div>

            {categories
              .filter((category) => category.name.includes(searchCategories))
              .map((category, index) => (
                <div
                  onClick={() => setCurrentCategoryID(category.id)}
                  key={index}
                >
                  <Category
                    key={index}
                    colorChoices={colorChoices}
                    deleteCategory={deleteCategory}
                    category={categories[index]}
                    getCategories={getCategories}
                  />
                </div>
              ))}
          </div>
          <div>sync</div>
        </div>
        <div className="note-headers-column ">
          <div className="note-header-bar">
            <div> {currentCategory ? currentCategory.name : 'all'}</div>
            <input type="text" name="" id="" />
            <button onClick={() => setNoteCategoryPopUp(!noteCategoryPopUp)}>
              create Note
            </button>
            <CreateNote
              trigger={noteCategoryPopUp}
              setTrigger={setNoteCategoryPopUp}
              categories={categories}
              getNotes={getNotes}
            />
          </div>

          <div className="notes scroll">
            {currentCategory
              ? notes
                  .filter((note) => note.category === currentCategoryID)
                  .map((note) => (
                    <div onClick={() => setCurrentNoteID(note.id)}>
                      <NoteHeader
                        note={note}
                        category={categories.find(
                          (item) => item.id === note.category
                        )}
                        noteDelete={deleteNote}
                        key={note.id}
                        setCurrentNoteID={() => setCurrentNoteID(null)}
                      />
                    </div>
                  ))
              : notes.map((note) => (
                  <div onClick={() => setCurrentNoteID(note.id)}>
                    <NoteHeader
                      note={note}
                      category={categories.find(
                        (item) => item.id === note.category
                      )}
                      noteDelete={deleteNote}
                      key={note.id}
                      setCurrentNoteID={() => setCurrentNoteID(null)}
                    />
                  </div>
                ))}
          </div>
        </div>
        <div className="note-column">
          {currentNote ? (
            <Note
              note={currentNote}
              categories={categories}
              noteDelete={deleteNote}
              noteUpdate={updateNote}
              getNotes={getNotes}
              key={currentNote.id}
              setCurrentNoteID={setCurrentNoteID}
              setCurrentCategoryID={setCurrentCategoryID}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
