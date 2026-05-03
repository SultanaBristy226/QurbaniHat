import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [photo, setPhoto] = useState(user?.photo || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const updatedUser = { ...user, name: name, photo: photo };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully!');
      navigate('/profile');
    } else {
      toast.error('Please enter a name');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Update Profile</h2>
        <p className="form-subtitle">Update your personal information</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your name"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Photo URL</label>
            <input 
              type="url" 
              value={photo} 
              onChange={(e) => setPhoto(e.target.value)} 
              placeholder="https://your-photo-url.com"
            />
            {photo && (
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <img src={photo} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
          
          <button type="submit" className="form-btn">Update Information</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;