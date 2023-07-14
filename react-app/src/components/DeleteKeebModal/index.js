import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as BuildActions from "../../store/build";
import { useHistory } from "react-router-dom";

const DeleteKeebModal = ({ keebId, show, handleClose }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = () => {
        console.log('keebId', keebId);
        dispatch(BuildActions.deleteKeebThunk(keebId))
        handleClose();
    }

    if (!show) {
        return null;
    }

    return (
        <div className="delete-modal">
            <h3>Are you sure you want to delete this keeb?</h3>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleClose}>No</button>
        </div>
    )
}

export default DeleteKeebModal;
