import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as FavoriteActions from "../../store/favorite";
import * as BuildActions from "../../store/build";

const AddBuildToFavModal = ({ userId, favoriteId, closeModal }) => {
    const dispatch = useDispatch();
    const [selectedBuildId, setSelectedBuildId] = useState(null);
    const allKeebs = useSelector(state => Object.values(state.keebs.keebs));
    const userFavoriteLists = useSelector(state => Object.values(state.favorites.userFavorites));
    const favList = userFavoriteLists.flat().find(favorite => favorite.id === favoriteId);
    const favListBuildIds = favList?.builds?.map(build => build.build_id) || [];
    const keebsNotInFavoriteList = allKeebs.filter(keeb => !favListBuildIds?.includes(keeb.id));

    const handleSubmit = async ({closeModal}) => {
        try {
            await dispatch(FavoriteActions.addBuildToFavoriteThunk(selectedBuildId, favoriteId));
            dispatch(FavoriteActions.getUserFavoritesThunk(userId));
            closeModal();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        dispatch(BuildActions.fetchAllKeebs());
        dispatch(FavoriteActions.getAllBuildsFromFavoriteThunk(favoriteId));
    }, [])

    return (
        <div>
            <div>
                <h3>Add a Build</h3>
                <select onChange={(e) => setSelectedBuildId(parseInt(e.target.value, 10))}>
                    <option value="">Select a Build</option>
                    {keebsNotInFavoriteList && keebsNotInFavoriteList.map(keeb => (
                        <option key={keeb.id} value={keeb.id}>{keeb.name}</option>
                    ))}
                </select>
                <button onClick={handleSubmit}>Add to Favorite</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default AddBuildToFavModal
