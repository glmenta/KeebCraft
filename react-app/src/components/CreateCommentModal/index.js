import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import * as CommentActions from "../../store/comment";


function CreateCommentModal({ keebId, onSubmit }) {
    const dispatch = useDispatch();

    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const { closeModal } = useModal();

    const submitComment = async (e) => {
        e.preventDefault();
        const data = await dispatch(CommentActions.createCommentThunk(keebId, {comment}));
        setComment("");
        if (data && !data.errors) {
            onSubmit && onSubmit();
            closeModal();
            dispatch(CommentActions.getBuildCommentsThunk(keebId));
            setRefreshKey(prevKey => prevKey + 1);
        } else if (data.errors) {
            setErrors(data.errors)
        }
    }

    return (
        <div className='create-comment-modal'>
            <div className='create-comment-modal-contents'>
                <h3 className='create-comment-modal-title'>Add a new comment</h3>
                {errors.map((error, idx) => <div key={idx} className="error">{error}</div>)}
                <form className='create-comment-form' onSubmit={submitComment}>
                    <textarea
                        className='create-comment-textarea'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <button className='submit-button'>Submit</button>
                    </form>
            </div>
        </div>
    )
}

export default CreateCommentModal
