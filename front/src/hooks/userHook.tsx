import { useState, useEffect } from 'react';
import api from '../api';

export interface UserIF {
  id: number;
  username: string;
  password: string;
}

const useUserHooks = () => {
  const [user, setUser] = useState<UserIF | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const getUser = async () => {
    api
      .get('api/user/')
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => alert(err));
  };

  const updateUser = async (username: string, password: string) => {
    api
      .put('/api/user/', { username, password })
      .then((res) => {
        if (res.status === 200) {
          setUsername(username);
          setPassword(password);
        }
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getUser();
  }, []);
  return { user };
};

export default useUserHooks;
