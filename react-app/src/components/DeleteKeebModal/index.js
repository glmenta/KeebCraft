import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as BuildActions from "../../store/build";
import { useHistory } from "react-router-dom";
import './deletemodal.css'
const DeleteKeebModal = ({ keebId, show, handleClose }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async () => {
        console.log('keebId', keebId);
        try {
            await dispatch(BuildActions.deleteKeebThunk(keebId));
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    if (!show) {
        return null;
    }

    return (
        <div className="delete-modal">
            <div className='delete-modal-contents'>
                <h3 className='delete-modal-title'>Are you sure you want to delete this keeb?</h3>
                <button className='delete-button'onClick={handleDelete}>Yes</button>
                <button className='cancel-button' onClick={handleClose}>No</button>
            </div>
        </div>
    )
}

export default DeleteKeebModal;
