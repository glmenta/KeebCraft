import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BuildActions from "../../store/build";
import { useHistory } from "react-router-dom";
import DeleteKeebModal from "../DeleteKeebModal";

function UserKeebsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userKeebs = useSelector((state) => state.keebs.userKeebs);
    const userId = useSelector((state) => state.session.user.id);

    const [isLoaded, setIsLoaded] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletedKeebId, setDeletedKeebId] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        dispatch(BuildActions.getUserKeebsThunk(userId))
        .then(() => setIsLoaded(true))
        .catch((err) => {
            console.error(err);
        });
    }, [dispatch, userId, refresh]);

    useEffect(() => {
        if (deletedKeebId) {
        setDeleteModal(false);
        setDeletedKeebId(null);
        setRefresh((prevRefresh) => !prevRefresh);
        }
    }, [deletedKeebId]);

    const handleShow = (keebId) => {
        setDeleteModal(keebId);
    };

    const handleClose = () => {
        setDeleteModal(null);
    };

    const handleDelete = (keebId) => {
        dispatch(BuildActions.deleteKeebThunk(keebId))
        .then(() => {
            setDeletedKeebId(keebId);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    if (!isLoaded) {
        return null;
    }

    return (
        <div>
        {Object.values(userKeebs).map((keeb) => (
            <div key={keeb.id}>
            <h2>{keeb.name}</h2>
            <button onClick={() => handleShow(keeb.id)}>Delete Keeb</button>
            {deleteModal === keeb.id && (
                <DeleteKeebModal
                keebId={keeb.id}
                show={deleteModal === keeb.id}
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
