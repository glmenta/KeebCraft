import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as PartActions from "../../store/part";

function UpdatePartModal({ isOpen, onClose, partId }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [typeId, setTypeId] = useState("");
    const [partTypes, setPartTypes] = useState([]);
    const dispatch = useDispatch();

    const part = useSelector((state) => state.parts.parts.Parts.find(p => p.id === partId));

    useEffect(() => {
        if(part){
            setName(part.name);
            setDescription(part.description);
            setTypeId(part.type_id);
        }
    }, [part]);

    useEffect(() => {
        dispatch(PartActions.fetchAllPartTypes())
        .then(setPartTypes);
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPart = {
            id: part.id,
            name,
            description,
            type_id: typeId,
        };

        await dispatch(PartActions.updatePartThunk(updatedPart));
        dispatch(PartActions.fetchAllParts());
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
                <h2>Update Part</h2>
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
                            required
                        >
                            {partTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.type}</option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePartModal;
