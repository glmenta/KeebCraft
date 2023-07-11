import { csrfFetch } from "./csrf";

const GET_ALL_PARTS = "parts/GET_ALL_PARTS";
const CREATE_PART = "parts/CREATE_PART";
const GET_PART = "parts/GET_PART";
const UPDATE_PART = "parts/UPDATE_PART";
const DELETE_PART = "parts/DELETE_PART";

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

export const updatePart = (part) => {
    return {
        type: UPDATE_PART,
        part,
    };
}

export const deletePart = (part) => {
    return {
        type: DELETE_PART,
        part,
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
export const createPartThunk = (part) => async (dispatch) => {
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
    }
}

export const updatePartThunk = (part) => async (dispatch) => {
    const res = await csrfFetch(`/api/parts/${part.id}`, {
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

export const deletePartThunk = (part) => async (dispatch) => {
    const res = await csrfFetch(`/api/parts/${part.id}`, {
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
        case CREATE_PART:
            newState.parts[action.part.id] = action.part;
            return newState;
        case UPDATE_PART:
            newState.parts[action.part.id] = action.part;
            return newState;
        case DELETE_PART:
            delete newState.parts[action.part.id];
            return newState;
        default:
            return state;
    }
}

export default partsReducer;
