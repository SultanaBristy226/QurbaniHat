import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AllAnimalsPage from './pages/AllAnimalsPage';
import AnimalDetailsPage from './pages/AnimalDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/animals" element={<AllAnimalsPage />} />
        <Route path="/animal/:id" element={<AnimalDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;