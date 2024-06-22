import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';

import { getUser } from '../state/user';
import { getCategories } from '../state/category';
import { getNotes } from '../state/note';

import CreateCategory from '../components/Category/CreateCategory';
import Category from '../components/Category/Category';
import { categoryIF } from '../utils/interfaces';

import CreateNote from '../components/Note/CreateNote';
import NoteHeader from '../components/Note/NoteHeader';
import Note from '../components/Note/Note';
import { NoteIF } from '../utils/interfaces';

function Home() {
  const user = useSelector((state: RootState) => state.user);
  localStorage.setItem('user', JSON.stringify(user));
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector((state: RootState) => state.category);
  const notes = useSelector((state: RootState) => state.note);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user') as string).id) {
      dispatch(getUser());
    }
    if (categories.length == 0) {
      dispatch(getCategories());
    }
    if (notes.length == 0) {
      dispatch(getNotes());
    }
  }, [dispatch]);

  const [categoryPopUp, setCategoryPopUp] = useState<boolean>(false);
  const [notePopUp, setNotePopUp] = useState<boolean>(false);

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

  const [searchCategories, setSearchCategories] = useState<string>('');
  const [searchNotes, setSearchNotes] = useState<string>('');

  return (
    <div>
      <Navbar user={user} />
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
            <CreateCategory
              trigger={categoryPopUp}
              setTrigger={setCategoryPopUp}
            />
          </div>
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
              .map((category) => (
                <div
                  onClick={() => setCurrentCategoryID(category.id)}
                  key={category.id}
                  className="w-11/12"
                >
                  <Category category={category} current={currentCategoryID} />
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
