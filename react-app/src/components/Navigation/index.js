import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className="navbar">
			<div className='navbar-elements'>
				<div className='home-link'>
					<li>
						<NavLink exact to="/keebs" activeClassName="active">KeebCraft</NavLink>
					</li>
				</div>
				<div className='profile-button'>
					{isLoaded && (
						<li>
						<ProfileButton user={sessionUser} />
						</li>
					)}
				</div>
			</div>
		</ul>
	);
}

export default Navigation;
