import React from 'react';

import { AppDispatch, RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../state/user';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUpdate = (e: any) => {
    e.preventDefault();

    if (user.id) {
      if (username === '') {
        alert('Please enter a username');
        return;
      }
      dispatch(updateUser({ id: user.id, username, password }));
    }

    setPassword('');
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    if (user && user.id) {
      dispatch(deleteUser(user.id));
      navigate('/logout');
    } else {
      console.error('User ID is missing or invalid');
      // Optionally handle the error or show a message to the user
    }
  };

  return (
    <>
      <div className="create-form-background flex">
        <div
          className="create-form flex flex-col h-3/4 w-1/4 p-10 gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {user.username}
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
          />
          <button onClick={handleUpdate}>update user</button>
          <button onClick={handleDelete}>delete user</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
