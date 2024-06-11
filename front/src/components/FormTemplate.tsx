import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { AxiosError, AxiosResponse } from 'axios';

interface FormTemplateProps {
  route: string;
  method: string;
}

const FormTemplate: React.FC<FormTemplateProps> = ({ route, method }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [retypePassword, setRetypePassword] = useState<string>('');
  const navigate = useNavigate();

  const name = method === 'login' ? 'Login' : 'Register';

  const validatePassword = (password: string): boolean => {
    let errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (method === 'Register') {
      if (password !== retypePassword) {
        alert('Passwords do not match');
        return;
      }
      if (!validatePassword(password)) {
        return;
      }
    }

    try {
      const res = await api.post(route, { username, password });
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error: AxiosError | any) {
      if (error.response?.status === 400) {
        alert(error.response.data.username);
      } else {
        alert('Something went wrong');
      }
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

      {method != 'login' ? (
        <input
          type="password"
          className="form-input outline-none p-3"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          placeholder="retype password"
        />
      ) : null}

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
