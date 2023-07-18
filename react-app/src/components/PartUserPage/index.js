import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserParts, updatePartThunk } from "../../store/part";
import { Redirect } from "react-router-dom";
import * as PartActions from "../../store/part";
import UpdatePartModal from "../PartUpdateModal";
import DeletePartModal from "../PartDeleteModal";
import './userparts.css'
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
            setDeleteModal(false)
            setRefresh(prevState => !prevState);
        })
        .catch((err) => {
            console.error(err.message);
        });
    };
    const partsArray = Object.values(userParts).filter((part) => part.user_id === userId);
if (!isLoaded) {
    return null;
}

if (partsArray.length === 0) {
    return (
        <div className="no-parts-container">
            <h2 className='no-parts-text'>You don't have any parts yet.</h2>
            <p className='no-parts-p'>View components and create your own</p>
            <button className='no-parts-button' onClick={() => window.location.href='/parts'}>View parts</button>
        </div>
    );
}

    return (
        <div className="container">
            {Object.values(userParts)
                .filter((part) => part.user_id === userId)
                .map((part) => (
                    <div key={part.id} className="part-tile">
                        <h2>{part.name}</h2>
                        <img src={part?.part_img?.[0]?.url || 'default_url'} alt={part.name} />
                        <button onClick={() => handleShow(part.id)}>Update Part</button>
                        <button onClick={() => handleDeleteShow(part.id)}>Delete Part</button>
                    </div>
                ))
            }
            {updateModalPartId && (
                <UpdatePartModal
                    partId={updateModalPartId}
                    part={Object.values(userParts).find(part => part.id === updateModalPartId)}
                    isOpen={!!updateModalPartId}
                    onClose={handleClose}
                />
            )}
            {deleteModal && (
                <DeletePartModal
                    partId={deletedPartId}
                    isOpen={deleteModal}
                    handleDeleteClose={handleDeleteClose}
                    handleDelete={() => handleDelete(deletedPartId)}
                />
            )}
        </div>
    );

}

export default UserPartsPage;
