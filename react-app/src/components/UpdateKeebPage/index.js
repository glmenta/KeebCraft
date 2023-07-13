import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BuildActions from "../../store/build";
import * as PartActions from "../../store/part";
import { useHistory, useParams } from "react-router-dom";

function UpdateKeebPage() {
    const { keebId } = useParams();

    const [name, setName] = useState("");
    const [keebcase, setKeebcase] = useState("");
    const [keycaps, setKeycaps] = useState("");
    const [switches, setSwitches] = useState("");
    const [plate, setPlate] = useState("");
    const [stabs, setStabs] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);
    const parts = useSelector((state) => state.parts.parts);
    const keeb = useSelector((state) => state.keebs.keebs[keebId]);
    console.log('keeb', keeb);
    console.log('user', user.id)

    useEffect(() => {
        if (keeb) {
            setName(keeb.name || "");
            setKeebcase(keeb.case || "");
            setKeycaps(keeb.keycaps || "");
            setSwitches(keeb.switches || "");
            setPlate(keeb.plate || "");
            setStabs(keeb.stabilizers || "");
            setDescription(keeb.keeb_info || "");
            setImgUrl(keeb.img_url || "");
        }
    }, [keeb]);

    useEffect(() => {
        if (keeb && user && keeb.user_id !== user.id) {
            history.push('/')
        }
    })
    let switchList, caseList, keycapList, stabList, plateList;
    if (parts && parts.Parts) {
        const partsArray = parts.Parts;
        console.log('partsArray', partsArray);
        switchList = partsArray.filter(part => part.type_id === 1);
        caseList = partsArray.filter(part => part.type_id === 2);
        keycapList = partsArray.filter(part => part.type_id === 3);
        stabList = partsArray.filter(part => part.type_id === 4);
        plateList = partsArray.filter(part => part.type_id === 5);
        console.log('switchList', switchList);
    }

    useEffect(() => {
        dispatch(PartActions.fetchAllParts())
            .then(() => dispatch(BuildActions.fetchKeeb(keebId)));
    }, [dispatch, keebId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            "case": keebcase,
            keycaps,
            switches,
            plate,
            stabilizers: stabs,
            keeb_info: description,
            img_url: imgUrl
        };
        const res = await dispatch(BuildActions.updateKeebThunk(keebId, payload));

        if (res.id) {
            history.push(`/keebs/${keebId}`);
            setName("");
            setKeebcase("");
            setKeycaps("");
            setSwitches("");
            setPlate("");
            setStabs("");
            setDescription("");
            setImgUrl("");
            setErrors({});
        } else {
            setErrors(res.errors);
        }
    };

    return (
        <div>
            <h2>Update Keeb</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select
                    value={keebcase}
                    onChange={(e) => setKeebcase(e.target.value)}
                >
                    <option value="">Select a Case</option>
                    {caseList && caseList.map((keebcase) => (
                        <option key={keebcase.id} value={keebcase.name}>
                            {keebcase.name}
                        </option>
                    ))}
                </select>
                <select
                    value={keycaps}
                    onChange={(e) => setKeycaps(e.target.value)}
                >
                    <option value="">Select Keycaps</option>
                    {keycapList && keycapList.map((keycap) => (
                        <option key={keycap.id} value={keycap.name}>
                            {keycap.name}
                        </option>
                    ))}
                </select>
                <select
                    value={switches}
                    onChange={(e) => setSwitches(e.target.value)}
                >
                    <option value="">Select Switches</option>
                    {switchList && switchList.map((keebSwitch) => (
                        <option key={keebSwitch.id} value={keebSwitch.name}>
                            {keebSwitch.name}
                        </option>
                    ))}
                </select>
                <select
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                >
                    <option value="">Select a Plate</option>
                    {plateList && plateList.map((plate) => (
                        <option key={plate.id} value={plate.name}>
                            {plate.name}
                        </option>
                    ))}
                </select>
                <select
                    value={stabs}
                    onChange={(e) => setStabs(e.target.value)}
                >
                    <option value="">Select Stabilizers</option>
                    {stabList && stabList.map((stab) => (
                        <option key={stab.id} value={stab.name}>
                            {stab.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Update Keeb</button>
            </form>
            {errors && Object.values(errors).map((error, idx) => (
                <div key={idx}>{error}</div>
            ))}
        </div>
    );

}

export default UpdateKeebPage
