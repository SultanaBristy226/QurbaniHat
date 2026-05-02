const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <div className="text-center" style={{padding: '50px'}}>Please login first</div>;
  }
  
  return (
    <div className="form-container">
      <h2 className="text-center">My Profile</h2>
      <div className="form-group">
        <label>Name</label>
        <input type="text" value={user.name} readOnly />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" value={user.email} readOnly />
      </div>
    </div>
  );
};

export default ProfilePage;