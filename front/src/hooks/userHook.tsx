import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export interface UserIF {
  id: number | null;
  username: string;
  password: string;
}

const useUserHooks = () => {
  const [user, setUser] = useState<UserIF | null>(null);
  const navigate = useNavigate();

  const getUser = async () => {
    api
      .get('base/user/')
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => alert(err));
  };

  const updateUser = async (userToUpdate: UserIF) => {
    api
      .put(`base/user/update/`, {
        username: userToUpdate.username,

        password: userToUpdate.password,
      })
      .then((res) => {
        if (res.status === 200) {
          if (user) {
            setUser({
              ...user,
              username: userToUpdate.username,
            });
          }
        }
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          alert('username already taken');
        }
      });
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`base/user/delete/${id}/`);
      setUser(null);
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return { user, updateUser, deleteUser };
};

export default useUserHooks;
