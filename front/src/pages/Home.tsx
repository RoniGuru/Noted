import { useState } from 'react';

import CreateCategory from '../components/Category/CreateCategory';
import Note from '../components/Note/Note';
import CreateNote from '../components/Note/CreateNote';

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
    createCategory,
  } = useCategory();
  const {
    notes,
    getNotes,
    currentNote,
    setCurrentNoteID,
    createNote,
    deleteNote,
    updateNote,
  } = useNote();

  const [searchCategories, setSearchCategories] = useState<string>('');
  const [searchNotes, setSearchNotes] = useState<string>('');

  return (
    <div className="font-mono">
      <Navbar />
      <div className="grid grid-cols-4 gap-4 mt-2 ml-3 mr-4">
        <div className="col-span-1  p-4 shadow-md bg-gray-400 rounded ">
          <div className="search mb-4  flex ">
            <input
              type="text"
              onChange={(e) => setSearchCategories(e.target.value)}
              placeholder="Search for categories"
              className="flex-grow bg-gray-200 outline-none pl-2"
            />
            <button
              onClick={() => setCategoryPopUp(!categoryPopUp)}
              className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
              Create Category
            </button>
          </div>
          <CreateCategory
            trigger={categoryPopUp}
            setTrigger={setCategoryPopUp}
            colorChoices={colorChoices}
            createCategory={createCategory}
          />
          <div className="scroll">
            <div
              key="none"
              style={{
                border: '5px grey solid',
                backgroundColor:
                  currentCategoryID === null ? 'grey' : 'transparent',
              }}
              className=" items-center p-6 rounded-lg shadow    hover:shadow-2xl w-11/12"
              onClick={() => setCurrentCategoryID(null)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'grey';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div className="ml-4">all</div>
            </div>

            {categories
              .filter((category) => category.name.includes(searchCategories))
              .map((category, index) => (
                <div
                  onClick={() => setCurrentCategoryID(category.id)}
                  key={index}
                  className="w-11/12"
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
        </div>
        <div className="col-span-1  p-4 shadow-md  bg-gray-400 rounded">
          <div className="flex">
            <input
              type="text"
              className="flex-grow bg-gray-200 outline-none  pl-2"
              placeholder="Search for notes"
              onChange={(e) => setSearchNotes(e.target.value)}
            />
            <button
              onClick={() => setNotePopUp(!notePopUp)}
              className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
              Create Note
            </button>
            <CreateNote
              trigger={notePopUp}
              setTrigger={setNotePopUp}
              categories={categories}
              createNote={createNote}
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
                    <NoteHeader
                      note={note}
                      category={categories.find(
                        (item) => item.id === note.category
                      )}
                      noteDelete={deleteNote}
                      key={note.id}
                      current={currentNote?.id === note.id ? true : false}
                      setCurrentNoteID={setCurrentNoteID}
                    />
                  ))
              : notes
                  .filter((note) => note.title.includes(searchNotes))
                  .map((note) => (
                    <NoteHeader
                      note={note}
                      category={categories.find(
                        (item) => item.id === note.category
                      )}
                      noteDelete={deleteNote}
                      key={note.id}
                      current={currentNote?.id === note.id ? true : false}
                      setCurrentNoteID={setCurrentNoteID}
                    />
                  ))}
          </div>
        </div>
        <div className="col-span-2 bg-gray-400 rounded p-4 shadow-md">
          {currentNote ? (
            <Note
              note={currentNote}
              categories={categories}
              noteDelete={deleteNote}
              getNotes={getNotes}
              key={currentNote.id}
              setCurrentNoteID={setCurrentNoteID}
              setCurrentCategoryID={setCurrentCategoryID}
              updateNote={updateNote}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
