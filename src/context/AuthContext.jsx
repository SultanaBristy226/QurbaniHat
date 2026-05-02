import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('qurbanihat_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (email && password && password.length >= 6) {
      const userData = {
        id: Date.now(),
        name: email.split('@')[0],
        email: email,
        photo: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=0B3B2A&color=fff&bold=true`,
      };
      localStorage.setItem('qurbanihat_user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Welcome back! Login successful.');
      return true;
    }
    toast.error('Invalid credentials. Password must be at least 6 characters.');
    return false;
  };

  const register = async (name, email, photo, password) => {
    if (name && email && password && password.length >= 6) {
      const userData = {
        id: Date.now(),
        name: name,
        email: email,
        photo: photo || `https://ui-avatars.com/api/?name=${name}&background=0B3B2A&color=fff&bold=true`,
      };
      localStorage.setItem('qurbanihat_user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Account created successfully!');
      return true;
    }
    toast.error('Please fill all fields correctly. Password must be 6+ characters.');
    return false;
  };

  const loginWithGoogle = async () => {
    const userData = {
      id: Date.now(),
      name: 'Google User',
      email: 'user@gmail.com',
      photo: 'https://ui-avatars.com/api/?name=Google+User&background=0B3B2A&color=fff',
    };
    localStorage.setItem('qurbanihat_user', JSON.stringify(userData));
    setUser(userData);
    toast.success('Google login successful!');
    return true;
  };

  const updateUser = async (name, photo) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        name: name, 
        photo: photo || user.photo 
      };
      localStorage.setItem('qurbanihat_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      return true;
    }
    toast.error('Failed to update profile');
    return false;
  };

  const logout = () => {
    localStorage.removeItem('qurbanihat_user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};