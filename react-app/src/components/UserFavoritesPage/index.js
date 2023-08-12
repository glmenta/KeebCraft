import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as FavoriteActions from "../../store/favorite";
import FavoriteListModal from "../FavoriteListModal";
import CreateFavoriteModal from "../CreateFavoriteModal";
import AddBuildToFavModal from "../AddKeebToFavModal";
import DeleteBuildFromFavModal from "../RemoveKeebFromFavModal";
import DeleteFavoriteModal from "../DeleteFavoriteModal";
import './favorites.css'

const UserFavoritesPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const userId = user?.id;

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [currentOpenModalFavoriteId, setCurrentOpenModalFavoriteId] = useState(null);
    const [currentDeleteModalFavoriteId, setCurrentDeleteModalFavoriteId] = useState(null);
    const [currentDeleteFavoriteModalId, setCurrentDeleteFavoriteModalId] = useState(null);
    // this is to render favorite list modal
    const [selectedFavorite, setSelectedFavorite] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const favorites = useSelector((state) => state.favorites.userFavorites.Favorites);

    const toggleCreateModal = () => {
        setShowCreateModal((prev) => !prev);
    };

    useEffect(() => {
        if (user) {
            dispatch(FavoriteActions.getUserFavoritesThunk(userId)).then(() => {
                setIsLoaded(true);
            })
        }
    }, [dispatch])

    const toggleAddBuildModal = (favoriteId) => {
        if (currentOpenModalFavoriteId !== favoriteId) {
            setCurrentOpenModalFavoriteId(favoriteId);
        }
    };

    const toggleDeleteBuildModal = (favoriteId) => {
        if (currentDeleteModalFavoriteId === favoriteId) {
            setCurrentDeleteModalFavoriteId(null);
        } else {
            setCurrentDeleteModalFavoriteId(favoriteId);
        }
    };

    const toggleDeleteFavoriteModal = (favoriteId) => {
        if (currentDeleteFavoriteModalId === favoriteId) {
            setCurrentDeleteFavoriteModalId(null);
        } else {
            setCurrentDeleteFavoriteModalId(favoriteId);
        }
    }
    return (
        <div className='user-favorites-container'>
            {showCreateModal && <CreateFavoriteModal closeModal={toggleCreateModal} />}
                {currentOpenModalFavoriteId &&
                <AddBuildToFavModal
                    favoriteId={currentOpenModalFavoriteId}
                    userId={userId}
                    closeModal={() => setCurrentOpenModalFavoriteId(null)}
                />
            }
            {isLoaded && (
            <div className='user-favorites'>
                <h2>My Favorites</h2>
                {(!favorites || favorites.length === 0)? (
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
                                <h3 className='fav-item-h3'onClick={() => setSelectedFavorite(favorite)}>{favorite?.name}</h3>
                                {selectedFavorite === favorite && (
                                        <FavoriteListModal
                                            favorite={favorite}
                                            closeModal={() => setSelectedFavorite(null)}
                                        />
                                    )}

                                <div className='fav-buttons'>
                                <button className='fav-build-button' onClick={() => toggleAddBuildModal(favorite.id)}>Add Build</button>
                                    <button className='fav-build-button' onClick={() => toggleDeleteBuildModal(favorite.id)}>Remove Build</button>
                                    {currentDeleteModalFavoriteId === favorite.id &&
                                        <DeleteBuildFromFavModal
                                            favorite={favorite}
                                            closeModal={() => toggleDeleteBuildModal(favorite.id)}
                                            afterDelete={() => dispatch(FavoriteActions.getUserFavoritesThunk(userId))}
                                        />
                                    }
                                    <button className='fav-build-button' onClick={() => toggleDeleteFavoriteModal(favorite.id)}>Delete Favorite</button>
                                    {currentDeleteFavoriteModalId === favorite.id &&
                                        <DeleteFavoriteModal
                                        favorite={favorite}
                                        closeModal={() => toggleDeleteFavoriteModal(favorite.id)}
                                        afterDelete={() => dispatch(FavoriteActions.getUserFavoritesThunk(userId))}
                                    />
                                    }
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
            )}
        </div>
    )
}

export default UserFavoritesPage
