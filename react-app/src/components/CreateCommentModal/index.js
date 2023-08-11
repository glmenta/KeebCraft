import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import * as CommentActions from "../../store/comment";
import './comment.css'

function CreateCommentModal({ keebId, onSubmit, refreshKey, setRefreshKey }) {
    const dispatch = useDispatch();

    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const validateComment = () => {
        const newErrors = [];
        if (comment.trim() === "") {
            newErrors.push("Please write a comment before submitting~");
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    };
    const submitComment = async (e) => {
        e.preventDefault();

        if (validateComment()) {
            const data = await dispatch(CommentActions.createCommentThunk(keebId, {comment}));
            setComment("");
            if (data && !data.errors) {
                onSubmit && onSubmit();
                closeModal();
            } else if (data.errors) {
                setErrors(data.errors);
            }
        }
    }
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('create-comment-modal')) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOverlayClick);
        return () => {
            document.removeEventListener('click', handleOverlayClick);
        };
    }, [closeModal]);
    return (
        <div className='create-comment-modal'>
            <div className='create-comment-modal-contents'>
                <h3 className='create-comment-modal-title'>Add A Comment!</h3>
                {errors.map((error, idx) => <div key={idx} className="error">{error}</div>)}
                <form className='create-comment-form' onSubmit={submitComment}>
                    <textarea
                        className='create-comment-textarea'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What are your thoughts..."
                    />
                    <button className='submit-button'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateCommentModal
