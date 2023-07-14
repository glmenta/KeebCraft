import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllParts, updatePartThunk } from "../../store/part";
import UpdatePartModal from "../PartUpdateModal";

function UserPartsPage() {
    const dispatch = useDispatch();
    const parts = useSelector((state) => state.parts.parts.Parts);
    const userId = useSelector((state) => state.session.user.id);
    console.log('parts', parts);
    const [isLoaded, setIsLoaded] = useState(false);
    const [updateModalPartId, setUpdateModalPartId] = useState(null);

    useEffect(() => {
        dispatch(fetchAllParts())
            .then(() => setIsLoaded(true))
            .catch((err) => {
                console.error(err);
            });
    }, [dispatch]);

    const handleShow = (partId) => {
        setUpdateModalPartId(partId);
    };

    const handleClose = () => {
        setUpdateModalPartId(null);
    };

    if (!isLoaded) {
        return null;
    }

    return (
        <div>
            {Object.values(parts)
                .filter((part) => part.user_id === userId)
                .map((part) => (
                    <div key={part.id}>
                        <h2>{part.name}</h2>
                        <button onClick={() => handleShow(part.id)}>Update Part</button>
                        {updateModalPartId === part.id && (
                            <UpdatePartModal
                                partId={part.id}
                                isOpen={updateModalPartId === part.id}
                                onClose={handleClose}
                            />
                        )}
                    </div>
                ))}
        </div>
    );
}

export default UserPartsPage;
