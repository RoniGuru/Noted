import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserIF } from '../hooks/userHook';

interface NavbarProps {
  user: UserIF | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <nav className="w-full  ">
      <div className="text-zinc-50 ml-4">
        Welcome {user?.username} + user id {user?.id}
      </div>
      <button
        onClick={() => navigate('/profile')}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 ml-auto"
      >
        Profile
      </button>
      <button
        onClick={() => navigate('/logout')}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 ml-auto"
      >
        logout
      </button>
    </nav>
  );
};

export default Navbar;
