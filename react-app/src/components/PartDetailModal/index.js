import React, { useEffect}  from "react";
import { useSelector, useDispatch } from "react-redux";
import '../PartListPage/modal.css'
import './part-detail.css'
import * as UserActions from "../../store/session";
function PartDetailModal({ isOpen, onClose, partId }) {
    const dispatch = useDispatch();
    const parts = useSelector((state) => state.parts.parts.Parts);
    const part = Array.isArray(parts) ? parts.find((p) => Number(p.id) === Number(partId)) : null;
    const partUserId = part?.user_id
    const users = useSelector((state) => state.session.users);
    const partUser = users?.users?.find(user => user?.id === partUserId)

    if (!isOpen || !part) {
        return null;
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="part-modal" onClick={onClose}>
            <div className="modal-content" onClick={stopPropagation}>
                <h2 className="part-name">{part.name}</h2>
                {part.part_img && part.part_img.length > 0 && (
                    <img src={part.part_img[0].url} className='part-img'alt={part.name} />
                )}
                <p>Uploaded by: {partUser?.username}</p>
                <p className="part-description">{part.description}</p>
            </div>
        </div>
    );
}

export default PartDetailModal;
