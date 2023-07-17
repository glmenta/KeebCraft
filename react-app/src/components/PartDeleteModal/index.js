import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './deletepart.css'
function DeletePartModal({ partId, isOpen, handleDeleteClose, handleDelete }) {
    const dispatch = useDispatch();
    const history = useHistory();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="delete-modal">
            <div className='delete-modal-contents'>
                <h3 className='delete-modal-title'>Are you sure you want to delete this part?</h3>
                <button className='yes-button' onClick={handleDelete}>Yes</button>
                <button className='no-button'  onClick={handleDeleteClose}>No</button>
            </div>
        </div>
    )
}

export default DeletePartModal;
