import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './NavBar.module.css';

export default function NavBar() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const { data } = await axios.get('http://localhost:5001/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setShowModal(false); 
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <Link to="/">SKIN DECODER</Link>
      </div>

      <div className={styles.navLinks}>
        <Link to="/">Home</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/about">About</Link>
      </div>

      <div className={styles.accountMenu}>
        <button
          className={styles.accountIcon}
          onClick={() => setShowModal(!showModal)} 
        >
          👤
        </button>

        {/* Modal for login/signup or user info */}
        {showModal && (
          <div className={styles.modal}>
            {user ? (
              <>
                <div className={styles.userInfo}>
                  <span>Welcome, {user.name}</span> {/* User's name */}
                </div>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/profile?login=true" className={styles.modalButton}>
                  Login
                </Link>
                <Link to="/profile?signup=true" className={styles.modalButton}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}