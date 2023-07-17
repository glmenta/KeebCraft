import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserParts, updatePartThunk } from "../../store/part";
import * as PartActions from "../../store/part";
import UpdatePartModal from "../PartUpdateModal";
import DeletePartModal from "../PartDeleteModal";
function UserPartsPage() {
    const dispatch = useDispatch();
    const userParts = useSelector((state) => state.parts.parts.Parts);
    const userId = useSelector((state) => state.session.user.id);
    console.log('parts', userParts);
    const [isLoaded, setIsLoaded] = useState(false);
    const [updateModalPartId, setUpdateModalPartId] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletedPartId, setDeletedPartId] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        dispatch(fetchUserParts(userId))
            .then(() => setIsLoaded(true))
            .catch((err) => {
                console.error(err);
            });
    }, [dispatch, userId, refresh]);

    const handleShow = (partId) => {
        setUpdateModalPartId(partId);
    };

    const handleClose = () => {
        setUpdateModalPartId(null);
    };

    const handleDeleteShow = (partId) => {
        setDeleteModal(partId)
        setDeletedPartId(partId);
    }
    const handleDeleteClose = () => {
        setDeleteModal(false)
    }
    if (!isLoaded) {
        return null;
    }
    const handleDelete = (partId) => {
        console.log('part id from handledelete', partId)
        dispatch(PartActions.deletePartThunk(partId))
        .then(() => {
            setDeletedPartId(partId);
            setRefresh(prevState => !prevState);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    return (
        <div>
            {Object.values(userParts)
                .filter((part) => part.user_id === userId)
                .map((part) => (
                    <div key={part.id}>
                        <h2>{part.name}</h2>
                        <img src={part?.part_img[0].url} />
                        <button onClick={() => handleShow(part.id)}>Update Part</button>
                        {updateModalPartId === part.id && (
                            <UpdatePartModal
                                partId={part.id}
                                isOpen={updateModalPartId === part.id}
                                onClose={handleClose}
                            />
                        )}
                        <button onClick={() => handleDeleteShow(part.id)}>Delete Part</button>
                        {deleteModal && deleteModal === part.id && (
                            <DeletePartModal
                                partId={part.id}
                                isOpen={deleteModal && deleteModal === part.id}
                                onClose={handleDeleteClose}
                                handleDelete={() => handleDelete(part.id)}
                            />
                        )}
                    </div>
                ))}
        </div>
    );
}

export default UserPartsPage;
