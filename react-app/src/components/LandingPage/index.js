import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../store/session";

function LandingPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.fetchUsers())
        .then(() => setIsLoaded(true))
        .catch((err) => {
            console.error(err)
        })
    }, [dispatch])

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Welcome to KeebForge!</h1>
            <p>Explore Keebs</p>
            <Link to="/keebs">
                <button>Enter</button>
            </Link>
        </div>
    )
}

export default LandingPage;
