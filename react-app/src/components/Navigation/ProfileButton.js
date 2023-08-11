import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './profile.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const buttonRef = useRef();
  const history = useHistory();
  const openMenu = (e) => {
    console.log('this is from openMenu', showMenu)
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/keebs");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  // const closeMenu = () => setShowMenu(false);
  const closeMenu = () => {
    console.log('closing menu');
    setShowMenu(false);
  };
  return (
    <div className='profile'>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='profile-contents'>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
            <div className='user-links'>
              <div className='user-keeb-link'>
                <Link className='keeb-link' to={`/users/${user.id}/keebs`}>Keebs</Link>
              </div>
              <div className='user-part-link'>
                <Link className='part-link' to={`/users/${user.id}/parts`}>Parts</Link>
              </div>
              <div className='user-fav-link'>
                <Link className='fav-link' to={`/users/${user.id}/favorites`}>Favorites</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className='profile-login-signup'>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
