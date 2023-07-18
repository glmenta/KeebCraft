import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as PartActions from "../../store/part";
import PartDetailModal from "../PartDetailModal";
import CreatePartModal from "../PartCreateModal";
import './modal.css'
function PartListPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [parts, setParts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [selectedPartId, setSelectedPartId] = useState(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(PartActions.fetchAllParts())
        .then((data) => {
            setParts(data.Parts);
            setIsLoaded(true);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [dispatch, createModalOpen]);


    useEffect(() => {
    }, [detailModal]);

    if (!isLoaded) {
        return null;
    }

    const openCreateModal = () => {
        setCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setCreateModalOpen(false);
    };
    const openModal = (id) => {
        setSelectedPartId(id);
        setDetailModal(true);
    };

    const onPartCreated = (newPart) => {
        setParts(prevParts => [...prevParts, newPart]);
    };

    const closeModal = () => {
        setSelectedPartId(null);
        setDetailModal(false);
    };

    const handleCheckKeebs = () => {
        history.push("/keebs");
    }
    return (
        <div className="part-container">
            <div className="part-header">
                {user && (
                <button className='create-part-button' onClick={openCreateModal}>Create Part</button>
                )}
                    { createModalOpen && (
                        <CreatePartModal isOpen={createModalOpen} onClose={closeCreateModal} onPartCreated={onPartCreated}/>
                    )}
                <button className='back-keebs-button' onClick={handleCheckKeebs}>Back to Keebs</button>
            </div>
            <div className="part-list">
                {parts.map((part) => (
                    <div key={part.id} className="part-tile" onClick={() => openModal(part.id)}>
                    <h3>{part.name}</h3>
                    {part.part_img && part.part_img.length > 0 && (
                        <img src={part.part_img[0].url} alt={part.name} />
                    )}
                    </div>
                ))}

                {detailModal && <PartDetailModal isOpen={detailModal} onClose={closeModal} partId={selectedPartId} />}
            </div>
        </div>
    );
}

export default PartListPage;
