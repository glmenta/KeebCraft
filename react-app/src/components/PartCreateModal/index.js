import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPartThunk } from "../actions/parts";

function CreatePartModal({ isOpen, onClose }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [typeId, setTypeId] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const part = {
            name,
            description,
            type_id: typeId,
        };

        dispatch(createPartThunk(part));
        onClose();
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
                            required
                        />
                    </label>
                    <label>
                        Description
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Type
                        <select
                            value={typeId}
                            onChange={(e) => setTypeId(e.target.value)}
                            required>
                            {partTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.type}</option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePartModal;
