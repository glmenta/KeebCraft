import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as FavoriteActions from "../../store/favorite";
import './favorites.css'

const UserFavoritesPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const userId = user?.id;

    const [favorites, setFavorites] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    console.log('favorites', favorites)
    const toggleCreateModal = () => {
        setShowCreateModal((prev) => !prev);
    };

    useEffect(() => {
        const getUserFavorites = async () => {
            const res = await dispatch(FavoriteActions.getUserFavoritesThunk(userId));
            setFavorites(res);
        }
        if (user) {
            getUserFavorites();
        }
    }, [dispatch, userId, user])

    return (
        <div className='user-favorites-container'>
            <div className='user-favorites'>
                <h2>My Favorites</h2>
                {Object.keys(favorites).length === 0 ? (
                    <div className='no-favorites-msg'>
                        <p>You don't have any favorites yet.</p>
                        <button>Add a Favorite</button>
                    </div>
                ) : (
                <div className='favorite-list'>
                    <div className='create-fav-button'>
                        <button>Create a Favorites List</button>
                    </div>
                    {favorites.Favorites.map((favorite, index) => (
                        <div key={index} className='favorite-item'>
                            <h3>{favorite.name}</h3>
                            {favorite.builds.map((build, buildIndex) => (
                                <div key={buildIndex} className='build-item'>
                                    <p>{build.build_details.name}</p>
                                    <Link to={`/keebs/${favorite.builds[0]?.build_details?.id}`}>
                                        <img src={favorite.builds[0]?.build_details?.img_url[0]?.url} alt='build-thumbnail' className='fav-build-img'/>
                                    </Link>
                                    <h4>{favorite.builds[0]?.build_details?.name}</h4>
                                    {/* <p>{build.build_details.case}</p>
                                    <p>{build.build_details.keeb_info}</p>
                                    <p>{build.build_details.keycaps}</p> */}
                                </div>
                            ))}
                            {/* {favorite.builds.slice(1).map((build, buildIndex) => (
                                <div key={buildIndex} className='build-item'>
                                    <p>{build.build_details.name}</p>
                                    <Link to={`/keebs/${build?.build_details?.id}`}>
                                        <img src={build?.build_details?.img_url[0]?.url} alt='build-thumbnail' className='fav-build-img'/>
                                    </Link>
                                </div>
                            ))} */}
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    )
}

export default UserFavoritesPage
