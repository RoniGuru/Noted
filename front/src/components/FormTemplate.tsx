import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

interface FormTemplateProps {
  route: string;
  method: string;
}

const FormTemplate: React.FC<FormTemplateProps> = ({ route, method }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const name = method === 'login' ? 'Login' : 'Register';

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name} </h1>
      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />

      <button className="form-button" type="submit">
        {name}
      </button>

      <button
        className="form-button register-login"
        onClick={() =>
          method == 'login' ? navigate('/register') : navigate('/login')
        }
      >
        {method == 'login' ? 'register' : 'login'}
      </button>
    </form>
  );
};

export default FormTemplate;
