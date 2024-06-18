import { useNavigate } from 'react-router-dom';
import { UserIF } from '../utils/interfaces';

import { useState } from 'react';

interface NavbarProps {
  user: UserIF | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <nav className="w-full  flex flex-cols items-center">
      <div className="text-zinc-50 ml-4">
        Welcome {user?.username} + user id {user?.id}
      </div>
      <div className="ml-auto gap-5 flex  mr-4">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4"
        >
          Home
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4"
        >
          Profile
        </button>

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
