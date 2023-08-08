import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as FavoriteActions from "../../store/favorite";

const FavoriteListModal = ({ favorite, build, closeModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className='favorite-list-modal'>
            <div>
                <h3>{favorite.name}</h3>
                {build && <p>{build.build_details.name}</p>}
            </div>
            <button onClick={closeModal}>Close</button>
        </div>
    )
}

export default FavoriteListModal
