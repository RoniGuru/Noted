import { AppDispatch, RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../state/user';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import UpdateUser from '../components/User/UpdateUser';

import { IoChevronBackCircleSharp } from 'react-icons/io5';

function UserProfile() {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [trigger, setTrigger] = useState<boolean>(false);

  const handleDelete = (e: any) => {
    e.preventDefault();

    const userConfirmed = window.confirm(
      'Are you sure you want to delete this account?'
    );

    if (!userConfirmed) return;
    try {
      if (user && user.id) {
        dispatch(deleteUser(user.id));
        navigate('/logout');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar user={user} />
      <div className="flex justify-center   mt-4  h-4/6 ">
        <div className="create-form  p-4 shadow-md  bg-gray-400 rounded  flex  w-1/3 flex-col gap-4 h-2/3 pb-12">
          <div className="flex">
            <IoChevronBackCircleSharp
              onClick={() => navigate('/')}
              size={40}
              className="icon-button  "
            />
          </div>
          <div className="w-3/4 flex  flex-col m-auto gap-5">
            <h1 className="m-auto">User Profile for {user.username}</h1>

            <button
              onClick={() => setTrigger(true)}
              className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-4 px-8 rounded"
            >
              update user
            </button>
            <UpdateUser trigger={trigger} setTrigger={setTrigger} />
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
