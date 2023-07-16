import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../store/session";
import './landing.css'
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
        <div className="landing-page">
            <h1>KeebCraft</h1>
            <p>Forge your unique keyboard</p>
            <Link to="/keebs">
                <button>Enter</button>
            </Link>
        </div>
    )
}

export default LandingPage;
