import { csrfFetch } from "./csrf";
import { fetchAllParts } from "./part";

const GET_ALL_KEEBS = "keebs/GET_ALL_KEEBS";
const GET_KEEB = "keebs/GET_KEEB";
const CREATE_KEEB = "keebs/CREATE_KEEB";
const UPDATE_KEEB = "keebs/UPDATE_KEEB";
const DELETE_KEEB = "keebs/DELETE_KEEB";
const REMOVE_USER_KEEB = "keebs/REMOVE_USER_KEEB";
const GET_USER_KEEBS = "keebs/GET_USER_KEEBS";

export const getAllKeebs = (keeb) => {
    return {
        type: GET_ALL_KEEBS,
        keeb,
    };
}

export const getKeeb = (keeb) => {
    return {
        type: GET_KEEB,
        keeb,
    };
}

export const createKeeb = (keeb) => {
    return {
        type: CREATE_KEEB,
        keeb,
    };
}

export const updateKeeb = (keeb) => {
    return {
        type: UPDATE_KEEB,
        keeb,
    };
}

export const deleteKeeb = (keebId) => {
    return {
        type: DELETE_KEEB,
        keebId,
    };
}

export const getUserKeebs = (keeb) => {
    return {
        type: GET_USER_KEEBS,
        keeb,
    };
}

export const removeUserKeeb = (keebId) => {
    return {
        type: REMOVE_USER_KEEB,
        keebId,
    };
};

export const fetchAllKeebs = () => async (dispatch) => {
    const res = await csrfFetch("/api/keebs");
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllKeebs(data.Keebs));
        return data;
    }
};

export const fetchKeeb = (keebId) => async (dispatch) => {
    console.log('this is thunk')
    const res = await csrfFetch(`/api/keebs/${keebId}`);
    if (res.ok) {
        const data = await res.json();
        console.log('this is data from thunk', data)
        dispatch(getKeeb(data));
        return data;
    }
}

export const getUserKeebsThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/keebs`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getUserKeebs(data.Keebs));
        return data;
    }
}
export const createKeebThunk = (keeb) => async (dispatch) => {
    await dispatch(fetchAllParts());

    const res = await csrfFetch("/api/keebs/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(keeb),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(createKeeb(data));
        return data;
    } else {
        const data = await res.json();
        const errors = typeof data.errors === 'string' ? { _error: data.errors } : data.errors;
        return {
            errors: errors
        }
    }
}

export const updateKeebThunk = (keebId, keeb) => async (dispatch) => {
    const res = await csrfFetch(`/api/keebs/${keebId}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(keeb),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(updateKeeb(data));
        return data;
    }
}

export const deleteKeebThunk = (keebId) => async (dispatch) => {
    const res = await csrfFetch(`/api/keebs/${keebId}/delete`, {
        method: "DELETE",
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(deleteKeeb(keebId));
        dispatch(removeUserKeeb(keebId));
        return keebId
    }
}

const initialState = {
    keebs: {},
    userKeebs: {},
}

const keebReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_KEEBS:
            for (const keeb of action.keeb) {
                newState.keebs[keeb.id] = keeb;
            }
            return newState;
        case GET_KEEB:
            newState.keebs[action.keeb.id] = action.keeb;
            return newState;
        case CREATE_KEEB:
            newState.keebs[action.keeb.id] = action.keeb;
            return newState;
        case UPDATE_KEEB:
            newState.keebs[action.keeb.id] = action.keeb;
            return newState;
        case DELETE_KEEB:
            delete newState.keebs[action.keebId];
            return newState;
        case REMOVE_USER_KEEB:
            delete newState.userKeebs[action.keebId];
            return newState;
        case GET_USER_KEEBS:
            newState.userKeebs = action.keeb.reduce((acc, keeb) => {
                acc[keeb.id] = keeb;
                return acc;
            }, {});
            return newState;
        default:
            return state;
    }
}

export default keebReducer;
