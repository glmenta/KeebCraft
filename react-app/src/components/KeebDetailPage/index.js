import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as KeebActions from "../../store/build";
import * as UserActions from "../../store/session";
import * as PartActions from "../../store/part";
import * as CommentActions from "../../store/comment";
import './keeb.css'

function KeebDetailPage() {
    const { keebId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const allKeebs = useSelector((state) => state.keebs);
    const allUsers = useSelector((state) => state.session.users) || [];
    const userArr = allUsers.users;
    const currKeeb = useSelector((state) => state.keebs.keebs[keebId]);
    const creatorId = currKeeb?.user_id
    const creatorUser = userArr?.find(user => user.id === creatorId);
    const user = useSelector((state) => state.session.user);
    const allParts = useSelector((state) => state.parts.parts);
    const [comments, setComments] = useState([]);
    const userId = user?.id
    const [isLoaded, setIsLoaded] = useState(false);

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
        dispatch(CommentActions.getBuildCommentsThunk(keebId)).then(
            (comments) => setComments(comments)
        )
    }, [dispatch, keebId])

    const handleFeature = () => {
        alert("Feature Coming Soon!");
    };

    const backToKeebs = () => {
        history.push("/keebs");
    }
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
                                <h2>{currKeeb.name}</h2>
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
                                </div>
                                <div>
                                    <h3>Keycaps</h3>
                                    <p>{currKeeb.keycaps}</p>
                                </div>
                                <div>
                                    <h3>Switches</h3>
                                    <p>{currKeeb.switches}</p>
                                </div>
                                <div>
                                    <h3>Stabilizers</h3>
                                    <p>{currKeeb.stabilizers}</p>
                                </div>
                                <div>
                                    <h3>Plate</h3>
                                    <p>{currKeeb.plate}</p>
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
                                <h2>button here</h2>
                            </div>
                            <div className='keeb-comments'>
                                {currKeeb?.comments.map((comment, index) => (
                                    <div
                                        className='keeb-comment'
                                        key={index}>
                                        <div className='keeb-comment-user'>
                                            <p>{comment.user_id.username}</p>
                                            <img
                                            src={comment.user_id.user_img[0].url}
                                            className="user-comment-img"
                                            alt='user-img-alt'
                                        />
                                        </div>
                                        <div className='keeb-comment-text'>
                                            <p>{comment.comment}</p>
                                        </div>
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
