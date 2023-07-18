import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as PartActions from "../../store/part";
import './update.css'
function UpdatePartModal({ isOpen, onClose, part }) {
    const [name, setName] = useState(part ? part.name : "");
    const [description, setDescription] = useState(part ? part.description : "");
    const [typeId, setTypeId] = useState(part ? part.type_id : "");
    const [imgUrl, setImgUrl] = useState(part && part.part_img[0] ? part.part_img[0].url : "");
    const [partTypes, setPartTypes] = useState([]);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(PartActions.fetchAllPartTypes())
        .then(setPartTypes);
    }, [dispatch]);

    function isValidImageUrl(url) {
        return url.match(/\.(jpeg|jpg|png)(\?.*)?$/i);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = {};

        if (!name) error.name = 'Please input a name';
        if (!description) error.description = 'Please input a description';
        if (!typeId) error.typeId = 'Please select a type';
        if (!imgUrl) error.imgUrl = 'Please input an image URL';
        else if (!isValidImageUrl(imgUrl)) error.imgUrl = 'Please input a valid image URL';
        if (Object.keys(error).length > 0) {
            setErrors(error);
            return;
        }

        const updatedPart = {
            id: part.id,
            name,
            description,
            type_id: typeId,
            part_img: imgUrl
        };

        try {
            const res = await dispatch(PartActions.updatePartThunk(updatedPart));

            if (res.errors) {
                setErrors(res.errors);
            } else {
                dispatch(PartActions.fetchAllParts());
                onClose();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="part-modal" onClick={onClose}>
            <div className='modal-bg' >
            <div className="modal-content" onClick={stopPropagation}>
                <h2>Update Part</h2>
                <form className='modal-form'onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {errors.name && <div className="error-message">{errors.name}</div>}
                    </label>
                    <label>
                        Description
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        {errors.description && <div className="error-message">{errors.description}</div>}
                    </label>
                    <label>
                        Type
                        <select
                            value={typeId}
                            onChange={(e) => setTypeId(e.target.value)}
                            required
                        >
                            {partTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.type}</option>
                            ))}
                        </select>
                        {errors.typeId && <div className="error-message">{errors.typeId}</div>}
                    </label>
                    <label>
                        Image URL
                        <input
                            type="text"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            required
                        />
                        {errors.imgUrl && <div className="error-message">{errors.imgUrl}</div>}
                    </label>
                    <button type="submit">Update</button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default UpdatePartModal;
