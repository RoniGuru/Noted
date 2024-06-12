import React from 'react';
import { UserIF } from '../hooks/userHook';
import { useState } from 'react';
import { validatePassword } from '../functions/passwordVerify';
import { TiDelete } from 'react-icons/ti';
interface ProfileProps {
  popUp: boolean;
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserIF | null;
  updateUser: (user: UserIF) => void;
  deleteUser: (id: number) => void;
}

const Profile: React.FC<ProfileProps> = ({
  popUp,
  setPopUp,
  user,
  updateUser,
  deleteUser,
}) => {
  const [newUsername, setNewUsername] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [retypeNewPassword, setRetypeNewPassword] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validatePassword(newPassword, retypeNewPassword)) {
      return;
    }
    if (user) {
      updateUser({
        id: user.id,
        username: newUsername,

        password: newPassword,
      });
    }

    setPopUp(false);
  };

  return (
    <>
      {popUp ? (
        <div
          className="create-form-background flex"
          onClick={() => setPopUp(false)}
        >
          <form
            className="create-form flex flex-col h-3/4 w-1/4 p-10 gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <TiDelete
              onClick={() => setPopUp(false)}
              size={40}
              className="icon-button  ml-auto"
            />
            <label htmlFor="">username</label>
            <input
              type="text"
              id="username"
              placeholder={user?.username}
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />

            <label htmlFor="">password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label htmlFor="">retype password</label>
            <input
              type="password"
              value={retypeNewPassword}
              onChange={(e) => setRetypeNewPassword(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 ml-auto"
            >
              update
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 ml-auto"
              onClick={() => user && deleteUser(user?.id)}
            >
              delete user
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
