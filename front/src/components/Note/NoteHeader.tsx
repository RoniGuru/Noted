import { NoteIF, categoryIF } from '../../utils/interfaces';
import { TiDelete } from 'react-icons/ti';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { deleteNote } from '../../state/note';

interface NoteProps {
  note: NoteIF;
  category: categoryIF | undefined;
  current: boolean;
  setCurrentNoteID: React.Dispatch<React.SetStateAction<number | null>>;
}

const NoteHeader: React.FC<NoteProps> = ({
  note,
  category,
  current,
  setCurrentNoteID,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      key={note.id}
      style={{
        border: category ? category?.color + ' 2px solid' : 'grey 2px solid',
        backgroundColor: current ? category?.color || 'grey' : 'transparent',
      }}
      className="flex justify-between p-4  rounded mt-4 w-11/12"
      onClick={() => setCurrentNoteID(note.id)}
    >
      <div> {note.title}</div>

      <TiDelete
        size={30}
        className="icon-button"
        onClick={() => dispatch(deleteNote(note))}
      />
    </div>
  );
};

export default NoteHeader;
