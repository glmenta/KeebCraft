import { csrfFetch } from "./csrf";

const GET_ALL_PARTS = "parts/GET_ALL_PARTS";
const CREATE_PART = "parts/CREATE_PART";
const GET_PART = "parts/GET_PART";
const UPDATE_PART = "parts/UPDATE_PART";
const DELETE_PART = "parts/DELETE_PART";
const GET_ALL_PART_TYPES = "parts/GET_ALL_PART_TYPES";
const GET_USER_PARTS = "parts/GET_USER_PARTS";

export const getAllParts = (parts) => {
    return {
        type: GET_ALL_PARTS,
        parts,
    };
}

export const createPart = (part) => {
    return {
        type: CREATE_PART,
        part,
    };
}

export const getPart = (part) => {
    return {
        type: GET_PART,
        part,
    };
}

export const getUserParts = (part) => {
    return {
        type: GET_USER_PARTS,
        part,
    }
}

export const getAllPartTypes = (partTypes) => {
    return {
        type: GET_ALL_PART_TYPES,
        partTypes,
    };
}
export const updatePart = (part) => {
    return {
        type: UPDATE_PART,
        part,
    };
}

export const deletePart = (partId) => {
    return {
        type: DELETE_PART,
        partId,
    };
}

export const fetchAllParts = () => async (dispatch) => {
    const res = await csrfFetch("/api/parts");
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllParts(data));
        return data
    }
}

export const fetchPart = (part) => async (dispatch) => {
    const res = await csrfFetch(`/api/parts/${part.id}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getPart(data));
        return data
    }
}

export const fetchUserParts = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/parts`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getUserParts(data));
        return data
    }
}
export const fetchAllPartTypes = () => async (dispatch) => {
    const res = await csrfFetch("/api/parts/types");
    console.log('this is res', res)
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllPartTypes(data));
        return data
    }
}

export const createPartThunk = (part) => async (dispatch) => {
    console.log("Part data being sent: ", part);
    const res = await csrfFetch("/api/parts/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(part),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(createPart(data));
        return data
    } else {
        const errorData = await res.json();
        return {errors: errorData.errors}
    }
}

export const updatePartThunk = (part) => async (dispatch) => {
    console.log('part from thunk', part)
    const res = await csrfFetch(`/api/parts/${part.id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(part),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(updatePart(data));
        return data
    }
}

export const deletePartThunk = (partId) => async (dispatch) => {
    const res = await csrfFetch(`/api/parts/${partId}/delete`, {
        method: "DELETE",
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(deletePart(data));
        return data
    }
}

const initialState = {
    parts: {},
    userParts: {},
    partTypes: {}
}

const partsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_PARTS:
            newState.parts = action.parts;
            return newState;
        case GET_PART:
            newState.parts[action.part.id] = action.part;
            return newState;
        case GET_USER_PARTS:
            newState.parts = { ...newState.parts, ...action.part };
            return newState;
        case GET_ALL_PART_TYPES:
            newState.partTypes = action.partTypes;
            return newState;
        case CREATE_PART:
            newState.parts[action.part.id] = action.part;
            return newState;
        case UPDATE_PART:
            newState.parts[action.part.id] = action.part;
            return newState;
        case DELETE_PART:
            delete newState.parts[action.partId];
            return newState;
        default:
            return state;
    }
}

export default partsReducer;
