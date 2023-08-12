import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BuildActions from "../../store/build";
import * as PartActions from "../../store/part";
import { useHistory, useParams } from "react-router-dom";
import './updatekeeb.css'
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
    const [isValidImgUrl, setIsValidImgUrl] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);
    const parts = useSelector((state) => state.parts.parts);
    const keeb = useSelector((state) => state.keebs.keebs[keebId]);
    console.log('this is keeb', keeb?.images?.[0]?.url)
    useEffect(() => {
        if (keeb) {
            setName(keeb.name || "");
            setKeebcase(keeb.case || "");
            setKeycaps(keeb.keycaps || "");
            setSwitches(keeb.switches || "");
            setPlate(keeb.plate || "");
            setStabs(keeb.stabilizers || "");
            setDescription(keeb.keeb_info || "");
            setImgUrl(keeb?.images?.[0]?.url || "");
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

    function isValidImageUrl(url) {
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
        let error= {}

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

    const returnToUserKeebs = () => {
        history.push(`/users/${user.id}/keebs`);
    }
    return (
        <div className='update-keeb-container'>
            <h2 className='update-keeb-header'>Update Keeb</h2>
            <form onSubmit={handleSubmit}>
            {errors.name && <div className="error-message">{errors.name}</div>}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    className='update-keeb-name'
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
                    className='update-keeb-img'
                    onChange={(e) => {
                        setImgUrl(e.target.value);
                        setIsValidImgUrl(true);
                    }}
                />
                {errors.description && <div className="error-message">{errors.description}</div>}
                <textarea
                    placeholder="Description"
                    value={description}
                    className='update-keeb-description'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Update Keeb</button>
                <button onClick={returnToUserKeebs}>Cancel</button>
            </form>
            {errors && Object.values(errors).map((error, idx) => (
                <div key={idx}>{error}</div>
            ))}
        </div>
    );

}

export default UpdateKeebPage
