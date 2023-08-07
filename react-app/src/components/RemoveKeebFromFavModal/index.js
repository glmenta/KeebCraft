import React from 'react';
import { useDispatch } from "react-redux";
import * as FavoriteActions from "../../store/favorite";

const DeleteBuildFromFavModal = ({ favorite, closeModal, afterDelete }) => {
    const dispatch = useDispatch();

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
        <div>
            <div>
                <h3>Delete a Build</h3>
                {favorite.builds && favorite.builds.map(build => (
                    <div key={build.id}>
                        <p>{build.build_details.name}</p>
                        <button onClick={() => handleDelete(build.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DeleteBuildFromFavModal;
