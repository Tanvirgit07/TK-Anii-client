import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutHandler = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove token and user data from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutHandler;
