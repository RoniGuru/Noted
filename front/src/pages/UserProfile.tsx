import { AppDispatch, RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../state/user';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';

import { IoChevronBackCircleSharp } from 'react-icons/io5';

function UserProfile() {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUpdate = (e: any) => {
    e.preventDefault();

    if (user.id) {
      dispatch(updateUser({ id: user.id, username, password }));
    }

    setUsername('');
    setPassword('');
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    if (user && user.id) {
      dispatch(deleteUser(user.id));
      navigate('/logout');
    } else {
      console.error('User ID is missing or invalid');
    }
  };

  return (
    <>
      <Navbar user={user} />
      <div className="flex justify-center   mt-4  h-4/6">
        <div className="create-form  p-4 shadow-md  bg-gray-400 rounded  flex  w-1/3 flex-col gap-4 h-2/3">
          <div className="flex">
            <IoChevronBackCircleSharp
              onClick={() => navigate(-1)}
              size={40}
              className="icon-button  "
            />

            <h1 className="m-auto">User Profile for {user.username}</h1>
          </div>
          <input
            type="text"
            className="form-input outline-none p-3"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="username"
          />
          <input
            type="password"
            className="form-input outline-none p-3"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
          />
          <div className="flex justify-around mt-4">
            <button
              onClick={handleUpdate}
              className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-4 px-8 rounded"
            >
              update user
            </button>
            <button
              onClick={handleDelete}
              className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-4 px-8 rounded "
            >
              delete user
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
