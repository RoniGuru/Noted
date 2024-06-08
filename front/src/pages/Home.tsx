import { useState } from 'react';

import CreateCategory from '../components/Category/CreateCategory';
import Note from '../components/Note/Note';
import CreateNote from '../components/Note/CreateNote';
import '../styles/Home.css';
import Category from '../components/Category/Category';
import NoteHeader from '../components/Note/NoteHeader';
import Navbar from '../components/Navbar';
import useColor from '../hooks/colorHook';
import useCategory from '../hooks/categoryHooks';
import useNote from '../hooks/noteHooks';

function Home() {
  const [categoryPopUp, setCategoryPopUp] = useState<boolean>(false);
  const [notePopUp, setNotePopUp] = useState<boolean>(false);

  const { colorChoices } = useColor();
  const {
    categories,
    getCategories,
    currentCategory,
    setCurrentCategoryID,
    currentCategoryID,
    updateCategory,
    deleteCategory,
  } = useCategory();
  const {
    notes,
    getNotes,
    currentNote,
    setCurrentNoteID,
    updateNote,
    deleteNote,
  } = useNote();

  const [searchCategories, setSearchCategories] = useState<string>('');
  const [searchNotes, setSearchNotes] = useState<string>('');

  return (
    <div className="home">
      <Navbar />
      <div className="home-container">
        <div className="category-column ">
          <div className="search">
            <input
              type="text"
              onChange={(e) => setSearchCategories(e.target.value)}
              placeholder="Search for categories"
            />
            <button onClick={() => setCategoryPopUp(!categoryPopUp)}>
              Create Category
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
              style={{
                border: '5px grey solid',
                backgroundColor:
                  currentCategoryID === null ? 'grey' : 'transparent',
              }}
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
                    category={category}
                    getCategories={getCategories}
                    current={currentCategoryID}
                    updateCategory={updateCategory}
                  />
                </div>
              ))}
          </div>
          <div></div>
        </div>
        <div className="note-headers-column ">
          <div className="note-header-bar">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search for notes"
              onChange={(e) => setSearchNotes(e.target.value)}
            />
            <button onClick={() => setNotePopUp(!notePopUp)}>
              create Note
            </button>
            <CreateNote
              trigger={notePopUp}
              setTrigger={setNotePopUp}
              categories={categories}
              getNotes={getNotes}
            />
          </div>

          <div className="notes scroll">
            {currentCategory
              ? notes
                  .filter(
                    (note) =>
                      note.category === currentCategoryID &&
                      note.title.includes(searchNotes)
                  )
                  .map((note) => (
                    <div onClick={() => setCurrentNoteID(note.id)}>
                      <NoteHeader
                        note={note}
                        category={categories.find(
                          (item) => item.id === note.category
                        )}
                        noteDelete={deleteNote}
                        key={note.id}
                        current={currentNote?.id === note.id ? true : false}
                        setCurrentNoteID={() => setCurrentNoteID(null)}
                      />
                    </div>
                  ))
              : notes
                  .filter((note) => note.title.includes(searchNotes))
                  .map((note) => (
                    <div onClick={() => setCurrentNoteID(note.id)}>
                      <NoteHeader
                        note={note}
                        category={categories.find(
                          (item) => item.id === note.category
                        )}
                        noteDelete={deleteNote}
                        key={note.id}
                        current={currentNote?.id === note.id ? false : false}
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
