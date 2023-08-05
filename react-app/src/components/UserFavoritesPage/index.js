import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import * as FavoriteActions from "../../store/favorite";
import CreateFavoriteModal from "../CreateFavoriteModal";
import './favorites.css'

const UserFavoritesPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const userId = user?.id;

    // const [favorites, setFavorites] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const userFavorites = useSelector((state) => Object.values(state.favorites.userFavorites));
    const favorites = userFavorites.flat()
    console.log('favorites', favorites)
    const toggleCreateModal = () => {
        setShowCreateModal((prev) => !prev);
    };

    useEffect(() => {
        if (user) {
            dispatch(FavoriteActions.getUserFavoritesThunk(userId));
        }
        // const getUserFavorites = async () => {
        //     const res = await dispatch(FavoriteActions.getUserFavoritesThunk(userId));
        //     setFavorites(res);
        // }
        // if (user) {
        //     getUserFavorites();
        // }
    }, [dispatch, userId, user])

    return (
        <div className='user-favorites-container'>
            {showCreateModal && <CreateFavoriteModal closeModal={toggleCreateModal} />}
            <div className='user-favorites'>
                <h2>My Favorites</h2>
                {favorites.length === 0 ? (
                    <div className='no-favorites-msg'>
                        <p>You don't have any favorites yet.</p>
                        <button onClick={toggleCreateModal}>Add a Favorite</button>
                    </div>
                ) : (
                <div className='favorite-list'>
                    <div className='create-fav-button'>
                        <button onClick={toggleCreateModal}>Create a Favorites List</button>
                    </div>
                    <div className='favorite-list-box'>
                        {favorites.map((favorite, index) => (
                            <div key={index} className='favorite-item'>
                                <h3>{favorite?.name}</h3>
                                {favorite.builds && favorite.builds.map((build, buildIndex) => (
                                    <div key={buildIndex} className='build-item'>
                                        <p>{build.build_details.name}</p>
                                        <Link to={`/keebs/${build?.build_details?.id}`}>
                                            <img src={build?.build_details?.img_url[0]?.url} alt='build-thumbnail' className='fav-build-img'/>
                                        </Link>
                                        <div className='remove-from-fav'>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className='favorite-buttons'>
                        <div className='add-to-fav'>

                        </div>
                        <div className='delete-fav-button'>

                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default UserFavoritesPage
