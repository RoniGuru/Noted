import { NoteIF, categoryIF } from '../../utils/interfaces';
import '../../styles/Note.css';
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
        borderBottom: category
          ? category?.color + ' 5px solid'
          : 'grey' + ' 5px solid',
        backgroundColor: current ? category?.color || 'grey' : 'transparent',
      }}
      className="note-header"
    >
      <div> {note.title}</div>

      <TiDelete
        size={30}
        className="note-header-delete"
        onClick={() => {
          noteDelete(note.id), setCurrentNoteID(null);
        }}
      />
    </div>
  );
};

export default NoteHeader;
