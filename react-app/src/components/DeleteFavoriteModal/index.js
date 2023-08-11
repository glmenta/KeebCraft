import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as FavoriteActions from "../../store/favorite";
import './deletefav.css'
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
            <div className='delete-favorite-contents'>
                <h3 className='delete-favorite-title'>Are you sure you want to delete {favorite?.name}?</h3>
                <div className='delete-favorite-button-container'>
                <button onClick={() => handleDelete(favorite.id)}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteFavoriteModal;
