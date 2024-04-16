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

  const closeMenu = () => {
    setShowMenu(false);
  };

    return (
      <div className='profile'>
        <button className='profile-button' ref={buttonRef} onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <div className='profile-contents'>
              <li>Hi, {user.username}</li>
              {/* <li>{user.email}</li> */}
              <div className='user-links'>
                Check out your:
                <div className='user-keeb-link'>
                  <Link className='keeb-link' to={`/users/${user.id}/keebs` } onClick={closeMenu}>Keebs</Link>
                </div>
                <div className='user-part-link'>
                  <Link className='part-link' to={`/users/${user.id}/parts`} onClick={closeMenu}>Parts</Link>
                </div>
                <div className='user-fav-link'>
                  <Link className='fav-link' to={`/users/${user.id}/favorites`} onClick={closeMenu}>Favorites</Link>
                </div>
              </div>
              <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
            </div>
          ) : (
            <div className='profile-login-signup'>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />

              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </ul>
      </div>
  );
}

export default ProfileButton;
