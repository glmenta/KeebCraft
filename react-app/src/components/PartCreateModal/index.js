import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPartThunk, fetchAllPartTypes } from "../../store/part";
import './create.css'
function CreatePartModal({ isOpen, onClose, onPartCreated }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [partTypes, setPartTypes] = useState([]);
    const [errors, setErrors] = useState({});
    const [imgUrl, setImgUrl] = useState("");
    const [typeId, setTypeId] = useState(partTypes[0]?.id || "");
    console.log('partTypes', partTypes);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchAllPartTypes())
        .then((data) => {
            setPartTypes(data);
            setTypeId(data[0]?.id || "");
        });
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error  = {};

        if (!name) error.name = 'Please input a name';
        if (!description) error.description = 'Please input a description';
        if (!imgUrl) error.imgUrl = 'Please input an image URL';
        if (!typeId) error.typeId = 'Please select a type';


        if (Object.keys(error).length > 0) {
            setErrors(error);
            return;
        }

        setErrors({});

        const part = {
            name,
            description,
            type_id: typeId,
            part_img: imgUrl
        };
        try {
            const newPart = await dispatch(createPartThunk(part));

            if (newPart.errors) {
                setErrors(newPart.errors);
            } else {
                onPartCreated(newPart);
                onClose();
                history.push(`/parts/${newPart.id}`);
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
            <div className="modal-content" onClick={stopPropagation}>
                <h2>New Part</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <div className="error-message">{errors.name}</div>}
                    </label>
                    <label>
                        Description
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && <div className="error-message">{errors.description}</div>}
                    </label>
                    <label>
                        Type
                        {partTypes.length ? (
                            <select
                                value={typeId}
                                onChange={(e) => setTypeId(e.target.value)}
                            >
                                {partTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.type}</option>
                                ))}
                            </select>
                        ) : (
                            <p>Loading part types...</p>
                        )}
                    </label>
                    {errors.typeId && <div className="error-message">{errors.typeId}</div>}
                    <label>
                        Image URL
                        <input
                            type="text"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                        />
                        {errors.imgUrl && <div className="error-message">{errors.imgUrl}</div>}
                    </label>
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePartModal;
