import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function DeletePartModal({ partId, isOpen, handleDeleteClose, handleDelete }) {
    const dispatch = useDispatch();
    const history = useHistory();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="delete-modal">
            <h3>Are you sure you want to delete this part?</h3>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleDeleteClose}>No</button>
        </div>
    )
}

export default DeletePartModal;
