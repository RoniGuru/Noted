import { AppDispatch, RootState } from '../../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateUsername, updatePassword } from '../../state/user';
import { validatePassword } from '../../functions/passwordVerify';

interface UpdateUserProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ trigger, setTrigger }) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const handleUserNameUpdate = (e: any) => {
    e.preventDefault();

    if (user.id) {
      if (username === '') {
        alert('Please enter  username ');
        return;
      }
      try {
        dispatch(updateUsername({ id: user.id, username, password: '' })).then(
          () => {
            const oldUser = JSON.parse(localStorage.getItem('user') as string);
            oldUser.username = username;
            localStorage.setItem('user', JSON.stringify(oldUser));
          }
        );
      } catch (err) {
        console.error(err);
      }
    }

    setUsername('');
    setTrigger(false);
  };

  const handlePasswordUpdate = (e: any) => {
    e.preventDefault();
    if (user.id) {
      if (password === '' || newPassword === '') {
        alert('Please enter  password ');
        return;
      }

      if (!validatePassword(newPassword, newPassword)) {
        return;
      }

      try {
        dispatch(updatePassword({ oldPassword: password, newPassword }));
      } catch (err) {
        console.error(err);
      }
    }

    setPassword('');
    setNewPassword('');
    setTrigger(false);
  };
  return (
    <>
      {trigger ? (
        <div
          className="create-form-background flex "
          onClick={() => setTrigger(false)}
        >
          <div
            className="create-form   shadow-md rounded px-12 pt-10 pb-12 mb-4 flex flex-col gap-4 "
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="m-auto">Update User</h1>
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
              placeholder=" Old Password"
            />
            <input
              type="password"
              className="form-input outline-none p-3"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              placeholder="New Password"
            />
            <button
              onClick={handleUserNameUpdate}
              className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-4 px-8 rounded"
            >
              update username
            </button>
            <button
              onClick={handlePasswordUpdate}
              className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-4 px-8 rounded"
            >
              update password
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UpdateUser;
