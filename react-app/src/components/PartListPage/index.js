import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as PartActions from "../../store/part";
import PartDetailModal from "../PartDetailModal";
import './modal.css'
function PartListPage() {
    const dispatch = useDispatch();

    const [parts, setParts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [selectedPartId, setSelectedPartId] = useState(null);

    useEffect(() => {
        dispatch(PartActions.fetchAllParts())
        .then((data) => {
            setParts(data.Parts);
            setIsLoaded(true);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [dispatch]);


    useEffect(() => {
        console.log('detailModal state: ', detailModal);
    }, [detailModal]);

    if (!isLoaded) {
        return null;
    }



    const openModal = (id) => {
        console.log('this is id ', id);
        setSelectedPartId(id);
        setDetailModal(true);
        console.log("detailModal state after setting: ", detailModal);
    };

    const closeModal = () => {
        setSelectedPartId(null);
        setDetailModal(false);
    };

    return (
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
    );
}

export default PartListPage;