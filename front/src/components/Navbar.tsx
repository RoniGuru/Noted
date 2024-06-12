import { useNavigate } from 'react-router-dom';
import { UserIF } from '../hooks/userHook';
import Profile from './Profile';
import { useState } from 'react';

interface NavbarProps {
  user: UserIF | null;
  updateUser: (user: UserIF) => void;
  deleteUser: (id: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, updateUser, deleteUser }) => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <nav className="w-full  flex flex-cols items-center">
      <div className="text-zinc-50 ml-4">
        Welcome {user?.username} + user id {user?.id} + user email {user?.email}
      </div>
      <div className="ml-auto gap-5 flex  mr-4">
        <button
          onClick={() => setPopUp(!popUp)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4"
        >
          Profile
        </button>
        <Profile
          popUp={popUp}
          setPopUp={setPopUp}
          user={user}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
        <button
          onClick={() => navigate('/logout')}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 "
        >
          logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
