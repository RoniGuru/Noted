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
    <nav>
      <button onClick={() => navigate('/logout')}>logout</button>
    </nav>
  );
}

export default Navbar;
