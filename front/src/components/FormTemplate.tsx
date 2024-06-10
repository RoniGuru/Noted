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
    <form
      onSubmit={handleSubmit}
      className="flex justify-center bg-white  flex-col rounded p-8 gap-5 w-1/4 font-mono"
    >
      <h1 className="text-center">{name} </h1>
      <input
        type="text"
        className="form-input outline-none p-3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        className="form-input outline-none p-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />

      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        type="submit"
      >
        {name}
      </button>

      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full"
        onClick={() =>
          method == 'login' ? navigate('/register') : navigate('/login')
        }
      >
        {method == 'login' ? 'sign up' : ' already signed up? login'}
      </button>
    </form>
  );
};

export default FormTemplate;
