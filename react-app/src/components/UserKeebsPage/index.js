import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BuildActions from "../../store/build";
import { useHistory, Link, Redirect } from "react-router-dom";
import DeleteKeebModal from "../DeleteKeebModal";
import './userkeebs.css'
function UserKeebsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userKeebs = useSelector((state) => state.keebs.userKeebs);
    const userId = useSelector((state) => state.session.user.id);

    const [isLoaded, setIsLoaded] = useState(false);
    const [deleteModal, setDeleteModal] = useState({});
    const [deletedKeebId, setDeletedKeebId] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {
        dispatch(BuildActions.getUserKeebsThunk(userId))
        .then(() => setIsLoaded(true))
        .catch((err) => {
            console.error(err);
        });
    }, [dispatch, userId, refresh]);

    useEffect(() => {
        if (deleteSuccess) {
        setDeleteModal(false);
        setDeletedKeebId(null);
        setRefresh((prevRefresh) => !prevRefresh);
        setDeleteSuccess(false)
        }
    }, [deleteSuccess]);

    const handleShow = (keebId) => {
        setDeleteModal(prevModal => ({...prevModal, [keebId]: true}));
        setDeletedKeebId(keebId)
    };

    const handleClose = () => {
        setDeleteModal(prevModal => ({...prevModal, [deletedKeebId]: false}))
    };

    const handleDelete = () => {
        handleClose()
    };

    if (!isLoaded) {
        return null;
    }
    const keebsArray = Object.values(userKeebs).filter((keeb) => keeb.user_id === userId);
    if (!isLoaded) {
        return null;
    }

    if (keebsArray.length === 0) {
        return (
            <div className="no-keebs-container">
                <h2>You don't have any keyboards yet.</h2>
                <p>Check out other user keyboards for ideas!</p>
                <button onClick={() => history.push('/keebs')}>Go to Keebs</button>
            </div>
        );
    }
    return (
        <div className='user-keebs'>
        {Object.values(userKeebs)
            .filter((keeb) => keeb.user_id === userId)
            .map((keeb) => (
            <div className='keeb-container'>
                <div key={keeb.id}>
                <h2 className='keeb-name'>{keeb.name}</h2>
                <img className='keeb-img' src={keeb?.img_url[0].url}/>
                <div className='update-button'>
                    <Link to={`/keebs/${keeb.id}/edit`}>
                        <button>Update Keeb!</button>
                    </Link>
                </div>
            </div>
            <button onClick={() => handleShow(keeb.id)}>Delete Keeb!</button>
            {deleteModal[keeb.id] && (
                <DeleteKeebModal
                keebId={deletedKeebId}
                show={deleteModal[keeb.id]}
                handleClose={handleClose}
                handleDelete={handleDelete}
                />
            )}
            </div>
        ))}
        </div>
    );
}

export default UserKeebsPage;
