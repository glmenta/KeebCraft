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

    return (
        <div className='modal-container'>
            <div className='modal-content'>
                <h3 className='delete-build-text'>Delete a Build</h3>
                {favorite.builds && favorite.builds.map(build => (
                    <div key={build.id}>
                        <p>{build.build_details.name}</p>
                        <img src={build.build_details.img_url[0].url} alt='build-thumbnail' className='fav-build-img'/>
                        <button className='delete-build-button' onClick={() => handleDelete(build.id)}>Delete</button>
                    </div>
                ))}
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    )
}

export default DeleteBuildFromFavModal;
