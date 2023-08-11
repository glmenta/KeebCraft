import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import CreateCommentModal from "../CreateCommentModal";
import DeleteCommentModal from "../DeleteCommentModal";
import * as KeebActions from "../../store/build";
import * as UserActions from "../../store/session";
import * as PartActions from "../../store/part";
import * as CommentActions from "../../store/comment";
import './keeb.css'

function KeebDetailPage() {
    const { keebId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const allUsers = useSelector((state) => state.session.users) || [];
    const userArr = allUsers.users;
    const currKeeb = useSelector((state) => state.keebs.keebs[keebId]);
    const creatorId = currKeeb?.user_id
    const creatorUser = userArr?.find(user => user.id === creatorId);
    const user = useSelector((state) => state.session.user);
    const allParts = useSelector((state) => state.parts.parts.Parts);
    const [comments, setComments] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const userId = user?.id
    const [isLoaded, setIsLoaded] = useState(false);
    console.log('allParts', allParts)
    console.log('currKeebComments', currKeeb?.comments)

    useEffect(() => {
        dispatch(PartActions.fetchAllParts())
    }, [dispatch])
    useEffect(() => {
        setIsLoaded(false);

        if (!keebId) {
            console.error('No keebId');
            return
        }
        Promise.all([
            dispatch(KeebActions.fetchKeeb(keebId)),
            dispatch(UserActions.fetchUsers())
        ]).then(() => setIsLoaded(true))

    }, [dispatch, keebId])

    useEffect(() => {
        dispatch(CommentActions.getBuildCommentsThunk(keebId))
            .then(fetchedComments => {
                setComments(fetchedComments.comments);
            });
    }, [dispatch, keebId, refreshKey]);


    const handleFeature = () => {
        history.push(`/users/${user.id}/favorites`);
    };

    return (
        <div className="keeb-detail">
            {!isLoaded ? (
                <div> Loading... </div>
            ) :
            currKeeb && (
                <div className='keeb-container'>
                    <div className='keeb-info'>
                        <div className='keeb-details'>
                            <div className='keeb-main'>
                                <h2 className='keeb-name'>{currKeeb.name}</h2>
                                <img
                                    src={currKeeb?.images[0]?.url}
                                    alt={currKeeb.name}
                                ></img>
                                <p>By: {creatorUser?.username}</p>
                                <p>{currKeeb.keeb_info}</p>
                            </div>
                            <div className='fav-button'>
                                <button onClick={handleFeature}>Add to Favorites!</button>
                            </div>
                            <div className='part-details'>
                                <div>
                                    <h3>Case</h3>
                                    <p>{currKeeb.case}</p>
                                    <div className='part-detail-img'>
                                        {allParts.find(part => part.name === currKeeb.case)?.part_img[0] &&
                                        <img src={allParts.find(part => part.name === currKeeb.case).part_img[0].url} alt="Case image"/>}
                                    </div>

                                </div>
                                <div>
                                    <h3>Keycaps</h3>
                                    <p>{currKeeb.keycaps}</p>
                                    <div className='part-detail-img'>
                                        {allParts.find(part => part.name === currKeeb.keycaps)?.part_img[0] &&
                                        <img src={allParts.find(part => part.name === currKeeb.keycaps).part_img[0].url} alt="Keycaps image"/>}
                                    </div>
                                </div>
                                <div>
                                    <h3>Switches</h3>
                                    <p>{currKeeb.switches}</p>
                                    <div className='part-detail-img'>
                                        {allParts.find(part => part.name === currKeeb.switches)?.part_img[0] &&
                                        <img src={allParts.find(part => part.name === currKeeb.switches).part_img[0].url} alt="Switches image"/>}
                                    </div>
                                </div>
                                <div>
                                    <h3>Stabilizers</h3>
                                    <p>{currKeeb.stabilizers}</p>
                                    <div className='part-detail-img'>
                                        {allParts.find(part => part.name === currKeeb.stabilizers)?.part_img[0] &&
                                        <img src={allParts.find(part => part.name === currKeeb.stabilizers).part_img[0].url} alt="Stabilizers image"/>}
                                    </div>
                                </div>
                                <div>
                                    <h3>Plate</h3>
                                    <p>{currKeeb.plate}</p>
                                    <div className='part-detail-img'>
                                        {allParts.find(part => part.name === currKeeb.plate)?.part_img[0] &&
                                        <img src={allParts.find(part => part.name === currKeeb.plate).part_img[0].url} alt="Plate image"/>}
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                    <div className='comments-section'>
                        <div className='comments-container'>
                            <h2>Comments</h2>
                            <div className='comment-button'>
                                {userId && (
                                    <OpenModalButton
                                    buttonText={< i className='fas fa-comment'>Add comment</i>}
                                    modalComponent={
                                        <CreateCommentModal
                                            keebId={keebId}
                                            refreshKey={refreshKey}
                                            onSubmit={() => setRefreshKey(refreshKey + 1)}
                                            setRefreshKey={setRefreshKey}
                                        />
                                    }
                                    />
                                )}
                            </div>
                            <div className='keeb-comments'>
                                {comments.slice().reverse().map((comment, index) => (
                                    <div
                                        className='keeb-comment'
                                        key={index}>
                                        <div className='keeb-comment-user'>
                                            <img
                                                src={comment.user_id.user_img[0].url}
                                                className="user-comment-img"
                                                alt='user-img-alt'
                                            />
                                            <p className='keeb-comment-username'>{comment.user_id.username}</p>
                                        </div>
                                        <div className='keeb-comment-text'>
                                            <p>{comment.comment}</p>
                                        </div>
                                        {userId === comment.user_id.id && (
                                        <div className='delete-comment-button'>
                                            <OpenModalButton
                                            buttonText={< i className='fas fa-trash'>Delete Comment</i>}
                                            modalComponent={
                                                <DeleteCommentModal
                                                keebId={keebId}
                                                commentId={comment.id}
                                                refreshKey={refreshKey}
                                                setRefreshKey={setRefreshKey}
                                            />
                                            }
                                            />
                                        </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default KeebDetailPage
