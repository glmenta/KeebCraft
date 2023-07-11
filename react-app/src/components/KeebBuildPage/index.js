import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as KeebActions from "../../store/build";

function KeebBuildPage() {
    const dispatch = useDispatch();
    const keebArr = useSelector((state) => Object.values(state.keebs.keebs));
    const keebs = keebArr.flat()
    const user = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(KeebActions.fetchAllKeebs());
        setIsLoaded(true);
    }, [dispatch])

    return (
        <div className="build-container">
            {isLoaded && keebs.length > 0 && (
                <ul>
                    {keebs.map((kb) => (
                        <li key={kb.id}>
                            <Link to={`/keebs/${kb.id}`}>{kb.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default KeebBuildPage
