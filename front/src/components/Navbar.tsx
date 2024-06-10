import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import api from '../api';

interface NavbarProps {
  user: string;
}

const getUser = async () => {
  api
    .get('/base/user/')
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => alert(err));
};

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="w-full  ">
      <button
        onClick={() => navigate('/logout')}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 ml-auto"
      >
        logout
      </button>
    </nav>
  );
}

export default Navbar;
