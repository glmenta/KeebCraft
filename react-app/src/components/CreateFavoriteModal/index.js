import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as FavoriteActions from '../../store/favorite';
import * as BuildActions from '../../store/build';
import './createfavmodal.css'
function CreateFavoriteModal({ closeModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [selectedBuild, setSelectedBuild] = useState("");
    const [errors, setErrors] = useState({});

    const user = useSelector((state) => state.session.user);
    const builds = useSelector((state) => Object.values(state.keebs.keebs));
    const selectBuild = builds.find(build => build.id === parseInt(selectedBuild));
    console.log('selectBuild', selectBuild);
    useEffect(() => {
        dispatch(BuildActions.fetchAllKeebs());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!name || name.trim() === "") {
            newErrors.name = 'Please input a name';
        }

        if (!selectedBuild) {
            newErrors.selectedBuild = 'Please select a keeb to start with';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newFavorite = {
            name,
            userId: user.id,
            selectedBuild
        }

        try {
            const favorite = await dispatch(FavoriteActions.createFavoriteThunk(newFavorite));

            const url = `/users/${user.id}/favorites`;
            if (favorite) {
                setName("");
                setSelectedBuild("");
                setErrors({});
                closeModal();
                dispatch(FavoriteActions.getUserFavoritesThunk(user.id));
                history.push(url)
            }
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            } else {
                setErrors({
                    message: 'An error occurred. Please try again.'
                })
            }
        }
    }
    return (
        <div className='create-favorite-modal'>
            <form className='create-favorite-form' onSubmit={handleSubmit}>
                <h2>Create a Favorite</h2>
                <div className="error-messages">
                {errors.name && <p>{errors.name}</p>}
                </div>
                <div className='create-name-input'>
                    <input
                        className='create-favorite-input'
                        type='text'
                        placeholder='Favorite name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                <p>Lets start it off with a keeb!</p>
                <div className="error-messages">
                    {errors.selectedBuild && <p>{errors.selectedBuild}</p>}
                </div>
                    <select
                        className='create-favorite-select'
                        value={selectedBuild}
                        onChange={(e) => setSelectedBuild(e.target.value)}>
                        <option value="">Select a keeb</option>
                        {builds && builds.map((build, idx) => (
                            <option key={idx} value={build.id}>{build.name}</option>
                        ))}
                    </select>
                    {selectBuild && <img src={selectBuild.img_url[0].url} alt={selectBuild.name} className='selected-build-img'/>}
                <div className='fav-modal-buttons'>
                    <button className='submit-button'>Submit</button>
                    <button className='cancel-button' onClick={closeModal}>Cancel</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default CreateFavoriteModal
