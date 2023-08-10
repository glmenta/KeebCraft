import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as FavoriteActions from "../../store/favorite";
import * as BuildActions from "../../store/build";
import './addbuild.css'
const AddBuildToFavModal = ({ userId, favoriteId, closeModal }) => {
    const dispatch = useDispatch();
    const modalContentRef = useRef();
    const [selectedBuildId, setSelectedBuildId] = useState(null);
    const allKeebs = useSelector(state => Object.values(state.keebs.keebs));
    const userFavoriteLists = useSelector(state => Object.values(state.favorites.userFavorites));
    const favList = userFavoriteLists.flat().find(favorite => favorite.id === favoriteId);
    const favListBuildIds = favList?.builds?.map(build => build.build_id) || [];
    const keebsNotInFavoriteList = allKeebs.filter(keeb => !favListBuildIds?.includes(keeb.id));
    const selectedBuild = keebsNotInFavoriteList.find(keeb => keeb.id === selectedBuildId);
    const [error, setError] = useState('');
    console.log(selectedBuild)
    const handleSubmit = async () => {
        setError('');

        if (!selectedBuildId) {
            setError('Please select a build before submitting.');
            return;
        }
        try {
            await dispatch(FavoriteActions.addBuildToFavoriteThunk(selectedBuildId, favoriteId));
            dispatch(FavoriteActions.getUserFavoritesThunk(userId));
            closeModal();
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        }
    }
    const handleClickOutside = (event) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
            closeModal();
        }
    };
    useEffect(() => {
        dispatch(BuildActions.fetchAllKeebs());
        dispatch(FavoriteActions.getAllBuildsFromFavoriteThunk(favoriteId));
    }, [])

    return (
        <div className='modal-background' onClick={handleClickOutside}>
            <div className='modal-content' ref={modalContentRef}>
                <h3 className='add-build-text'>Add a Build</h3>
                {error && <div className="error-message">{error}</div>}
                <select className='select-build'onChange={(e) => setSelectedBuildId(parseInt(e.target.value, 10))}>
                    <option value="">Select a Build</option>
                    {keebsNotInFavoriteList && keebsNotInFavoriteList.map(keeb => (
                        <option key={keeb.id} value={keeb.id}>{keeb.name}</option>
                    ))}
                </select>
                {selectedBuild && <img src={selectedBuild.img_url[0].url} alt={selectedBuild.name} className='selected-build-img'/>}
                <button onClick={handleSubmit}>Add to Favorite</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default AddBuildToFavModal
