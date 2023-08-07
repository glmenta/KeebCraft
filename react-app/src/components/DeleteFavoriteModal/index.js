import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as FavoriteActions from "../../store/favorite";

const DeleteFavoriteModal = ({ favorite, closeModal, afterDelete }) => {
    const dispatch = useDispatch();

    const handleDelete = async (favoriteId) => {
        try {
            await dispatch(FavoriteActions.deleteFavoriteThunk(favoriteId));
            closeModal();
            afterDelete();
        } catch(err) {
            console.error(err);
        }
    }
    return (
        <div className='delete-favorite-container'>
            <div>
                <h3>Delete A Favorite List</h3>
                <button onClick={() => handleDelete(favorite.id)}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteFavoriteModal;
