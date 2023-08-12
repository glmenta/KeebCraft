import React from 'react';
import { useDispatch } from "react-redux";
import * as FavoriteActions from "../../store/favorite";
import './removekeeb.css'
const DeleteBuildFromFavModal = ({ favorite, closeModal, afterDelete }) => {
    const dispatch = useDispatch();
    console.log('favorite', favorite)
    const handleDelete = async (buildId) => {
        try {
            await dispatch(FavoriteActions.removeBuildFromFavoriteThunk(buildId, favorite.id));
            closeModal();
            afterDelete();
        } catch (err) {
            console.error(err);
        }
    }
    const handleContentClick = (e) => {
        e.stopPropagation();
    }
    return (
        <div className='modal-container' onClick={closeModal}>
            <div className='modal-content' onClick={handleContentClick}>
                <h3 className='delete-build-text'>Delete a Build</h3>
                {favorite.builds && favorite.builds.length ?
                    favorite.builds.map(build => (
                        <div key={build.id}>
                            <p>{build.build_details.name}</p>
                            <img src={build.build_details.img_url[0].url} alt='build-thumbnail' className='fav-build-img'/>
                            <button className='delete-build-button' onClick={() => handleDelete(build.id)}>Delete</button>
                        </div>
                    ))
                :
                    <p>No builds! Let's Add One!</p>
                }
                <button className='modal-close'onClick={closeModal}>Close</button>
            </div>
        </div>
    )
}

export default DeleteBuildFromFavModal;
