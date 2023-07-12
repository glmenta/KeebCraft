import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as PartActions from "../../store/part";
import { useHistory } from "react-router-dom";
import { createKeebThunk } from "../../store/build";

function CreateKeebPage() {
    const [keeb, setKeeb] = useState();
    const [keebImg, setKeebImg] = useState();

    const [name, setName] = useState("");
    const [keebcase, setKeebcase] = useState("");
    const [keycaps, setKeycaps] = useState("");
    const [switches, setSwitches] = useState("");
    const [plate, setPlate] = useState("");
    const [stabs, setStabs] = useState("");
    const [description, setDescription] = useState("");
    const [forge, setForge] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);
    const parts = useSelector((state) => state.parts.parts);
    console.log('these are all the parts', parts);
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
        dispatch(PartActions.fetchAllParts());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        setForge(true);

        const payload = {
            name,
            keebcase,
            keycaps,
            switches,
            plate,
            stabs,
            description,
        }

        const res = await dispatch(createKeebThunk(payload));

        if (res.ok) {
            const newKeebId = res.id
            const url = `/api/keebs/${newKeebId}`;
            setName("");
            setKeebcase("");
            setKeycaps("");
            setSwitches("");
            setPlate("");
            setStabs("");
            setDescription("");
            setErrors({});
            history.push(url);
        } else {
            setErrors(res.errors);
        }
    }

    return (
        <div>
            <h2>Create a new Keeb</h2>
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
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Create Keeb</button>
            </form>
            {Object.values(errors).map((error, idx) => (
                <div key={idx}>{error}</div>
            ))}
        </div>
    );


}

export default CreateKeebPage
