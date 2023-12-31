import { csrfFetch } from "./csrf";

const GET_ALL_COMMENTS = "comment/GET_ALL_COMMENTS";
const GET_USER_COMMENTS = "comment/GET_USER_COMMENTS";
const GET_BUILD_COMMENTS = "comment/GET_BUILD_COMMENTS";
const GET_COMMENT_BY_ID = "comment/GET_COMMENT_BY_ID";
const CREATE_COMMENT = "comment/CREATE_COMMENT";
const UPDATE_COMMENT = "comment/UPDATE_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";

const getAllComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    payload: comments,
})

const getUserComments = (comments) => ({
    type: GET_USER_COMMENTS,
    payload: comments,
})

const getBuildComments = (comments) => ({
    type: GET_BUILD_COMMENTS,
    payload: comments,
})

const getCommentById = (comment) => ({
    type: GET_COMMENT_BY_ID,
    payload: comment,
})

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment,
})

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment,
})

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    payload: commentId,
})

export const getCommentsThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/comments");
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllComments(data));
    }
}

export const getUserCommentsThunk = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/comments`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getUserComments(data));
    }
}

export const getBuildCommentsThunk = (buildId) => async (dispatch) => {
    const response = await csrfFetch(`/api/keebs/${buildId}/comments`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getBuildComments(data));
        return data;
    }
}
export const getCommentByIdThunk = (commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getCommentById(data));
    }
}

export const createCommentThunk = (keebId, comment) => async (dispatch) => {
    const response = await csrfFetch(`/api/keebs/${keebId}/comments/new`, {
        method: "POST",
        body: JSON.stringify(comment),
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createComment(data));
        return {}
    } else if (response.status === 400 || response.status === 404) {
        return { errors: response.data.errors };
    }
}
export const updateCommentThunk = (commentId, comment) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}/edit`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment),
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateComment(data));
        return data;
    }
}
export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}/delete`, {
        method: "DELETE",
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteComment(data));
    }
}

const initialState = {
    comments: {},
    userComments: {},
    buildComments: {},
};

const commentsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_COMMENTS:
            newState.comments = action.payload;
            return newState;
        case GET_USER_COMMENTS:
            newState.userComments = action.payload;
            return newState;
        case GET_BUILD_COMMENTS:
            newState.buildComments = action.payload;
            return newState;
        case GET_COMMENT_BY_ID:
            newState.comments[action.payload.id] = action.payload;
            return newState;
        case CREATE_COMMENT:
            newState.comments[action.payload.id] = action.payload;
            return newState;
        case UPDATE_COMMENT:
            newState.comments[action.payload.id] = action.payload;
            newState.buildComments.comments = newState.buildComments.comments.map(comment => {
                if (comment.id === action.payload.id) {
                    return action.payload;
                }
                return comment;
            });
            return newState;
        case DELETE_COMMENT:
            delete newState.comments[action.payload];
            return newState;
        default:
            return state;
    }
}


export default commentsReducer;
