import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import * as CommentActions from "../../store/comment";
import './update.css'
function UpdateCommentModal({commentId, initialComment, refreshComments, onClose }) {
    const dispatch = useDispatch();
    const [updatedComment, setUpdatedComment] = useState(initialComment);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const validateComment = () => {
        const newErrors = [];
        if (updatedComment.trim() === "") {
            newErrors.push("Please write a comment before submitting~");
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (validateComment()) {
            const commentData = {
                comment: updatedComment
            };
            const response = await dispatch(CommentActions.updateCommentThunk(commentId, commentData));
            if (response && !response.errors) {
                refreshComments();
                onClose();
            }
        }
    }

    const handleOverlayClick = (e) => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    return (
        <div className='update-comment-container' onClick={handleOverlayClick}>
            <div className='update-comment-modal'>
                <div className='update-comment-modal-contents'>
                    <h3 className='update-comment-modal-title'>Update Comment!</h3>
                    {errors.map((error, idx) => <div key={idx} className="error">{error}</div>)}
                    <form className='update-comment-form' onSubmit={handleUpdate}>
                        <textarea
                            className='update-comment-textarea'
                            value={updatedComment}
                            onChange={(e) => setUpdatedComment(e.target.value)}
                            placeholder="What are your thoughts..."
                        />
                        <button className='submit-button'>Submit</button>
                        <button onClick={onClose}>Back To Keeb</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateCommentModal;
