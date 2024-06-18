import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';
import UserProfile from './pages/UserProfile.tsx';

function App() {
  function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Provider store={store}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<UserProfile />} />
                  </Routes>
                </Provider>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
