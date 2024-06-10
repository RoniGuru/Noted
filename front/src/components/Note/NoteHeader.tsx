import { NoteIF, categoryIF } from '../../utils/interfaces';

import { TiDelete } from 'react-icons/ti';

interface NoteProps {
  note: NoteIF;
  category: categoryIF | undefined;
  noteDelete: (id: number) => void;
  current: boolean;
  setCurrentNoteID: React.Dispatch<React.SetStateAction<number | null>>;
}

const NoteHeader: React.FC<NoteProps> = ({
  note,
  noteDelete,
  category,
  current,
  setCurrentNoteID,
}) => {
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
        onClick={() => {
          noteDelete(note.id), setCurrentNoteID(null);
        }}
      />
    </div>
  );
};

export default NoteHeader;
