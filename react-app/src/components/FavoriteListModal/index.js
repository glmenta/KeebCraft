import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as FavoriteActions from "../../store/favorite";

const FavoriteListModal = ({ favorite,closeModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const displayedBuilds = favorite.builds.slice(0, 4);
    return (
        <div className='favorite-list-modal'>
            <div className='fav-list-contents'>
                {displayedBuilds.map((build, buildIndex) => (
                    <div key={buildIndex}>
                        <p>{build.build_details.name}</p>
                        <div className='images-container'>
                            {build?.build_details?.img_url.map((image, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    src={image.url}
                                    alt='build-thumbnail'
                                    className='fav-build-img'
                                />
                            ))}
                        </div>
                    </div>
                ))}
                {favorite.builds.length > 4 && (
                    <div className="more-builds-indicator">
                        {favorite.builds.length - 4} more builds hidden...
                    </div>
                )}
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
}

export default FavoriteListModal
