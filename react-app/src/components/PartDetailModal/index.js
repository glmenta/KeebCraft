import React from "react";
import { useSelector } from "react-redux";
import '../PartListPage/modal.css'

function PartDetailModal({ isOpen, onClose, partId }) {
    const parts = useSelector((state) => state.parts.parts.Parts);
    const part = Array.isArray(parts) ? parts.find((p) => Number(p.id) === Number(partId)) : null;

    if (!isOpen || !part) {
        return null;
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="part-modal" onClick={onClose}>
            <div className="modal-content" onClick={stopPropagation}>
                <h2>{part.name}</h2>
                <p>{part.description}</p>
                {part.part_img && part.part_img.length > 0 && (
                    <img src={part.part_img[0].url} alt={part.name} />
                )}
            </div>
        </div>
    );
}

export default PartDetailModal;
