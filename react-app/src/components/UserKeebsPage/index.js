import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BuildActions from "../../store/build";
import { useHistory, Link } from "react-router-dom";
import DeleteKeebModal from "../DeleteKeebModal";

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
        console.log('handleShow called')
        setDeleteModal(prevModal => ({...prevModal, [keebId]: true}));
        setDeletedKeebId(keebId)
    };

    const handleClose = () => {
        setDeleteModal(prevModal => ({...prevModal, [deletedKeebId]: false}))
    };

    const handleDelete = () => {
        handleClose()
        // dispatch(BuildActions.deleteKeebThunk(keebId))
        // .then(() => {
        //     setDeleteSuccess(true);
        //     dispatch(BuildActions.getUserKeebsThunk(userId))
        // })
        // .catch((err) => {
        //     console.error(err);
        // });
    };

    if (!isLoaded) {
        return null;
    }

    return (
        <div>
        {Object.values(userKeebs)
            .filter((keeb) => keeb.user_id === userId)
            .map((keeb) => (
            <div key={keeb.id}>
            <h2>{keeb.name}</h2>
            <button onClick={() => handleShow(keeb.id)}>Delete Keeb!</button>
            <div>
                <Link to={`/keebs/${keeb.id}/edit`}>
                    <button>Update Keeb!</button>
                </Link>
            </div>

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
