import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BuildActions from "../../store/build";
import * as PartActions from "../../store/part";
import { useHistory, useParams } from "react-router-dom";
import './updatekeeb.css';

function UpdateKeebPage() {
    const { keebId } = useParams();
    const [name, setName] = useState("");
    const [keebcase, setKeebcase] = useState("");
    const [keycaps, setKeycaps] = useState("");
    const [switches, setSwitches] = useState("");
    const [plate, setPlate] = useState("");
    const [stabs, setStabs] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);
    const parts = useSelector((state) => state.parts.parts);
    const keeb = useSelector((state) => state.keebs.keebs[keebId]);

    let switchList, caseList, keycapList, stabList, plateList;
    if (parts && parts.Parts) {
        const partsArray = parts.Parts;
        switchList = partsArray.filter(part => part.type_id === 1);
        caseList = partsArray.filter(part => part.type_id === 2);
        keycapList = partsArray.filter(part => part.type_id === 3);
        stabList = partsArray.filter(part => part.type_id === 4);
        plateList = partsArray.filter(part => part.type_id === 5);
    }

    useEffect(() => {
        console.log('keeb', keeb)
        if (keeb) {
            setName(keeb.name || "");
            setKeebcase(keeb.case || "");
            setKeycaps(keeb.keycaps || "");
            setSwitches(keeb.switches || "");
            setPlate(keeb.plate || "");
            setStabs(keeb.stabilizers || "");
            setDescription(keeb.keeb_info || "");
            setImgUrl(keeb.images || "");
            console.log('imgUrl', imgUrl)
        }
    }, [keeb]);

    useEffect(() => {
        if (keeb && user && keeb.user_id !== user.id) {
            history.push('/');
        }
    });

    useEffect(() => {
        dispatch(PartActions.fetchAllParts())
            .then(() => dispatch(BuildActions.fetchKeeb(keebId)));
    }, [dispatch, keebId]);

    const handleImageUpload = async () => {
        if (!imageFile) {
            return imgUrl;
        }

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const response = await fetch("/api/keebs/upload-image", {
                method: "POST",
                body: formData
            });
            const uploadData = await response.json();
            if (!response.ok) {
                throw new Error(`Failed to upload image: ${uploadData.message || 'Server error'}`);
            }
            return uploadData.img_url; // Assuming the server returns the URL of the uploaded image.
        } catch (error) {
            setErrors(prev => ({ ...prev, imgUrl: error.message }));
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = {};

        // Validations
        if (!name.trim()) error.name = 'Please input a valid name';
        if (!keebcase) error.keebcase = 'Please select a case';
        if (!keycaps) error.keycaps = 'Please select keycaps';
        if (!switches) error.switches = 'Please select switches';
        if (!plate) error.plate = 'Please select a plate';
        if (!stabs) error.stabs = 'Please select stabilizers';
        if (!description) error.description = 'Please input a description';
        if (!imageFile) error.imgUrl = 'Please upload a new image to update your Keeb';

        if (Object.keys(error).length > 0) {
            setErrors(error);
            return;
        }

        // Since image upload is now mandatory, proceed only if an image file is provided
        const uploadedImgUrl = await handleImageUpload();
        if (!uploadedImgUrl) {
            // Handle upload error
            setErrors(prev => ({ ...prev, imgUrl: 'Image upload failed' }));
            return;
        }

        // Assemble payload with the new image URL included
        const payload = {
            name,
            case: keebcase,
            keycaps,
            switches,
            plate,
            stabilizers: stabs,
            keeb_info: description,
            img_url: uploadedImgUrl
        };

        // Dispatch the update action
        const res = await dispatch(BuildActions.updateKeebThunk(keebId, payload));
        if (res.id) {
            // On successful update, clear form and navigate to the updated keeb page
            history.push(`/keebs/${keebId}`);
            resetForm();
        } else {
            // Handle potential errors from the update operation
            setErrors(res.errors);
        }
    };

    // Helper function to reset form fields
    const resetForm = () => {
        setName("");
        setKeebcase("");
        setKeycaps("");
        setSwitches("");
        setPlate("");
        setStabs("");
        setDescription("");
        setImageFile(null);
        setErrors({});
    };



    const returnToUserKeebs = () => {
        history.push(`/users/${user.id}/keebs`);
    };

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
                <div className="image-upload-container">
                    {imgUrl ? (
                        <div>
                            <img src={imgUrl} alt="Current Keeb" className="current-keeb-image" />
                            <label>
                                Please upload a new image (required):
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                            </label>
                        </div>
                    ) : (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    )}
                    {errors.imgUrl && <div className="error-message">{errors.imgUrl}</div>}
                </div>
                {errors.description && <div className="error-message">{errors.description}</div>}
                <textarea
                    placeholder="Description"
                    value={description}
                    className='update-keeb-description'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Update Keeb</button>
                <button type="button" onClick={returnToUserKeebs}>Cancel</button>
            </form>
        </div>
    );
}

export default UpdateKeebPage;
