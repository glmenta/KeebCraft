import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as KeebActions from "../../store/build";
import './build.css'
function KeebBuildPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const keebs= useSelector((state) => Object.values(state.keebs.keebs));
    console.log('keebs', keebs)
    const user = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false)
    Promise.all([dispatch(KeebActions.fetchAllKeebs())]).then(() =>
        setIsLoaded(true)
    );
    }, [dispatch])

    const handleCreateKeeb = () => {
        history.push("/keebs/new");
    }

    const handleCheckParts = () => {
        history.push("/parts");
    }

    return (
            <div className="build-container">
            <div className='create-keeb-button'>
                {user && (
                <button onClick={handleCreateKeeb}>Create Keeb</button>
                )}
            </div>
            <div className='check-parts-button'>
                <button onClick={handleCheckParts}>Check out Parts!</button>
            </div>
            {isLoaded && keebs.length > 0 && (
                <ul>
                {keebs.map((kb) => (
                    <Link to={`/keebs/${kb.id}`}>
                    <li key={kb.id} className='keeb-tile'>
                        <div className='keeb-name'>{kb.name}</div>
                        <img src={kb?.img_url && kb.img_url.length > 0 ? kb.img_url[0].url : 'placeholder_img'} alt={kb.name} />
                    </li>
                    </Link>
                ))}
                </ul>
            )}
            </div>
        );
}

export default KeebBuildPage
