import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import './NavBar.css';
import { IoCartOutline } from 'react-icons/io5';
import { collection, doc, getDoc } from 'firebase/firestore';

export default function NavBar({ user, setUser, items }) {
  const [menu, setMenu] = useState(false);
  const [userRole, setUserRole] = useState(null); // Add userRole state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const userRoleDoc = await getDoc(doc(db, 'userRole', user.uid));
          if (userRoleDoc.exists()) {
            setUserRole(userRoleDoc.data().role);
          }
        } catch (error) {
          console.error('Error fetching user role: ', error);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  const handleClick = () => {
    setMenu(!menu);
  };

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      setUserRole(null); // Reset user role on logout
      navigate('/');
    });
  };

  return (
    <nav className="nav-bar">
      <p className="nav-bar-icon">WIG DEALERS</p>
      {menu ? (
        <FaTimes className="hamburger" onClick={handleClick} />
      ) : (
        <FaBars className="hamburger" onClick={handleClick} />
      )}

      <ul className={`nav-bar-list ${menu ? 'open' : ''}`}>
        <li className="nav-bar-item">
          <NavLink to="/">Home</NavLink>
        </li>

        {!user && (
          <>
            <li className="nav-bar-item">
              <NavLink to="/signin">Sign in</NavLink>
            </li>
            <li className="nav-bar-item">
              <NavLink to="/signup">Sign up</NavLink>
            </li>
          </>
        )}

        {user && (
          <li className="nav-bar-item">
            <NavLink to="/cart" className="cart-icon-cont">
              <IoCartOutline
                className={`cart-icon ${
                  window.location.pathname === '/cart' ? 'active' : ''
                }`}
              />
              <span className="cart-number">{items ? items.length : '0'}</span>
            </NavLink>
          </li>
        )}

        {user && userRole === 'admin' && (
          <li className="nav-bar-item">
            <NavLink to="/admin">Admin Panel</NavLink>
          </li>
        )}

        {user && (
          <li className="nav-bar-item" onClick={handleLogOut}>
            Log out
          </li>
        )}
      </ul>
    </nav>
  );
}
