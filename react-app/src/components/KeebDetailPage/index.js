import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as KeebActions from "../../store/build";
import * as UserActions from "../../store/session";

function KeebDetailPage() {
    const { keebId } = useParams();
    const dispatch = useDispatch();

    const allKeebs = useSelector((state) => state.keebs);
    console.log('this is all the keebs', allKeebs)
    const allUsers = useSelector((state) => state.session.users) || [];
    const userArr = allUsers.users;
    const currKeeb = useSelector((state) => state.keebs.keebs[keebId]);
    console.log('tests', currKeeb)
    const creatorId = currKeeb?.user_id
    console.log('creatorId', creatorId)
    console.log('userArr', userArr)
    const creatorUser = userArr?.find(user => user.id === creatorId);
    console.log('creatorUser', creatorUser)
    const user = useSelector((state) => state.session.user);

    const userId = user?.id
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!keebId) {
            console.error('No keebId');
            return
        }
        dispatch(KeebActions.fetchKeeb(keebId))
        dispatch(UserActions.fetchUsers())
        setIsLoaded(true);
    }, [dispatch, keebId])

    return (
        <div className="keeb-detail">
            {currKeeb && (
                <div className='keeb-container'>
                    <div className='keeb-info'>
                        <div className='keeb-details'>
                            <div className='keeb-main'>
                                <h2>{currKeeb.name}</h2>
                                <img
                                    src={currKeeb.img_url}
                                    alt={currKeeb.name}
                                ></img>
                                <p>By: {creatorUser?.username}</p>
                                <p>{currKeeb.keeb_info}</p>
                            </div>
                            <div className='fav-button'>
                                <button>Add to Favorites!</button>
                            </div>
                            <div className='part-details'>
                                <div>
                                    <h3>Case</h3>
                                    <p>{currKeeb.case}</p>
                                    <p>img here</p>
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
                            comments here
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default KeebDetailPage
