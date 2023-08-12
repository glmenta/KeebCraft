import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as PartActions from "../../store/part";
import { useHistory } from "react-router-dom";
import { createKeebThunk } from "../../store/build";
import './createkeeb.css'
function CreateKeebPage() {
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
    console.log('Current Img URL:', imgUrl);

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
        console.log('stabList', stabList);
        console.log('plateList', plateList);
    }

    useEffect(() => {
        dispatch(PartActions.fetchAllParts());
    }, [dispatch]);
    function isValidImageUrl(url) {
        // const pattern = new RegExp('\\.(jpg|jpeg|png|bmp|gif)$', 'i');
        // return pattern.test(url) || url.includes('reddit.com/media?url=');
        const pattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '\\.(jpg|jpeg|png|bmp|gif)(\\?[;&a-z\\d%_.~+=-]*)?$','i');
        return !!pattern.test(url);
    }
    function isOnlyWhitespace(str) {
        return !str.trim().length;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = {};

        if (isOnlyWhitespace(name) || !name) error.name = 'Please input a valid name';
        if (!name) error.name = 'Please input a name';
        if (!keebcase) error.keebcase = 'Please select a case';
        if (!keycaps) error.keycaps = 'Please select keycaps';
        if (!switches) error.switches = 'Please select switches';
        if (!plate) error.plate = 'Please select a plate';
        if (!stabs) error.stabs = 'Please select stabilizers';
        if (!description) error.description = 'Please input a description';
        if (!isValidImageUrl(imgUrl)) error.imgUrl = 'Please input a valid image URL';
        if (!imgUrl) error.imgUrl = 'Please input an image URL';

        if (Object.keys(error).length > 0) {
            setErrors(error);
            return;
        }

        setErrors({});
        setForge(true);
        console.log('Img URL at Submission:', imgUrl);

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
        <div className='create-keeb-container'>
            <h2 className='create-keeb-header'>Create a new Keeb!</h2>
            <form onSubmit={handleSubmit}>
            {errors.name && <div className="error-message">{errors.name}</div>}
                <input
                    type="text"
                    placeholder="Name"
                    className='create-keeb-name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.keebcase && <div className="error-message">{errors.keebcase}</div>}
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
                {keebcase && caseList && (
                    <img src={caseList.find(c => c.name === keebcase)?.part_img[0].url} alt="Selected case" className="part-image" />
                )}
                {errors.keycaps && <div className="error-message">{errors.keycaps}</div>}
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
                {
                    keycaps && keycapList && (
                        <img src={keycapList.find(keycap => keycap.name === keycaps)?.part_img[0].url} alt="Selected keycaps" className="part-image" />
                    )
                }
                {errors.switches && <div className="error-message">{errors.switches}</div>}
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
                {
                    switches && switchList && (
                        <img src={switchList.find(keebSwitch => keebSwitch.name === switches)?.part_img[0].url} alt="Selected switches" className="part-image" />
                    )
                }
                {errors.plate && <div className="error-message">{errors.plate}</div>}
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
                {/* {
                    plate && plateList && (
                        <img src={plateList.find(plate => plate.name === plate)?.part_img[0].url} alt="Selected plate" className="part-image" />
                    )
                } */}
                {errors.stabs && <div className="error-message">{errors.stabs}</div>}
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
                {
                    stabs && stabList && (
                        <img src={stabList.find(stab => stab.name === stabs)?.part_img[0].url} alt="Selected stabilizers" className="part-image" />
                    )
                }
                {errors.imgUrl && <div className="error-message">{errors.imgUrl}</div>}
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imgUrl}
                    className='create-keeb-img'
                    onChange={(e) => setImgUrl(e.target.value)}
                />
                {errors.description && <div className="error-message">{errors.description}</div>}
                <textarea
                    placeholder="Description"
                    value={description}
                    className='create-keeb-description'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Create Keeb</button>
                <button type="button" onClick={returnToKeebs}>Back To Keebs</button>
            </form>
        </div>
    );


}

export default CreateKeebPage
