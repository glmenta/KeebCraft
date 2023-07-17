import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as PartActions from "../../store/part";
import { useHistory } from "react-router-dom";
import { createKeebThunk } from "../../store/build";
import './createkeeb.css'
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
    const [imgUrl, setImgUrl] = useState("");
    const [forge, setForge] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);
    const parts = useSelector((state) => state.parts.parts);

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
        let error = {};

        if (!name) error.name = 'Please input a name';
        if (!keebcase) error.keebcase = 'Please select a case';
        if (!keycaps) error.keycaps = 'Please select keycaps';
        if (!switches) error.switches = 'Please select switches';
        if (!plate) error.plate = 'Please select a plate';
        if (!stabs) error.stabs = 'Please select stabilizers';
        if (!description) error.description = 'Please input a description';
        if (!imgUrl) error.imgUrl = 'Please input an image URL';

        if (Object.keys(error).length > 0) {
            setErrors(error);
            return;
        }

        setErrors({});
        setForge(true);

        const payload = {
            name,
            case: keebcase,
            keycaps,
            switches,
            plate,
            stabilizers: stabs,
            keeb_info: description,
            img_url: imgUrl
        }

        const res = await dispatch(createKeebThunk(payload));

        if (res.errors) {
            setErrors(res.errors);
        } else {
            const newKeebId = res.id
            const url = `/keebs/${newKeebId}`;
            setName("");
            setKeebcase("");
            setKeycaps("");
            setSwitches("");
            setPlate("");
            setStabs("");
            setDescription("");
            setImgUrl("");
            setErrors({});
            history.push(url);
        }
    }

    const returnToKeebs = () => {
        history.push('/keebs');
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
                {errors.name && <div className="error-message">{errors.name}</div>}
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
                {errors.keebcase && <div className="error-message">{errors.keebcase}</div>}
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
                {errors.keycaps && <div className="error-message">{errors.keycaps}</div>}
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
                {errors.switches && <div className="error-message">{errors.switches}</div>}
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
                {errors.plate && <div className="error-message">{errors.plate}</div>}
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
                {errors.stabs && <div className="error-message">{errors.stabs}</div>}
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                />
                {errors.imgUrl && <div className="error-message">{errors.imgUrl}</div>}
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <div className="error-message">{errors.description}</div>}
                <button type="submit">Create Keeb</button>
                <button type="button" onClick={returnToKeebs}>Back To Keebs</button>
            </form>
        </div>
    );


}

export default CreateKeebPage
