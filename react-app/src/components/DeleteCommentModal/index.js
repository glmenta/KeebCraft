import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as CommentActions from '../../store/comment';

const DeleteCommentModal = ({ keebId, commentId, refreshKey, setRefreshKey }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const deleteComment = async (e) => {
        e.preventDefault();
        try {
            await dispatch(CommentActions.deleteCommentThunk(commentId));
            // await fetchComments();
            setRefreshKey(refreshKey + 1);
            closeModal();
            history.push(`/keebs/${keebId}`);
        } catch (error) {
            console.log(error);
        }
    }

    const cancelDelete = () => {
        closeModal();
    }

    return (
        <div className='delete-comment-modal'>
            <div>
                <h3>Are you sure you want to delete this comment?</h3>
                <button className='yes-button' onClick={deleteComment}>Yes</button>
                <button className='no-button' onClick={cancelDelete}>No</button>
            </div>
        </div>
    )
}

export default DeleteCommentModal
