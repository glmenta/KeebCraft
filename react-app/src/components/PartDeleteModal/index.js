import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as PartActions from "../../store/part";
import { useHistory } from "react-router-dom";

function DeletePartModal({ partId, show, handleClose }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = () => {
        console.log('partId', partId);
        dispatch(PartActions.deletePartThunk(partId))
        handleClose();
    }

    if (!show) {
        return null;
    }

    return (
        <div className="delete-modal">
            <h3>Are you sure you want to delete this part?</h3>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleClose}>No</button>
        </div>
    )
}

export default DeletePartModal;
