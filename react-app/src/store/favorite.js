import { csrfFetch } from "./csrf";

const GET_ALL_FAVORITES = "session/GET_ALL_FAVORITES";
const GET_USER_FAVORITES = "session/GET_USER_FAVORITES";
const GET_ALL_BUILDS_FROM_FAVORITE = "session/GET_ALL_BUILDS_FROM_FAVORITES";
const GET_BUILD_FROM_FAVORITE = "session/GET_BUILD_FROM_FAVORITES";
const CREATE_FAVORITE = "session/CREATE_FAVORITE";
const ADD_BUILD_TO_FAVORITE = "session/ADD_BUILD_TO_FAVORITES";
const REMOVE_BUILD_FROM_FAVORITE = "session/REMOVE_BUILD_FROM_FAVORITES";
const DELETE_FAVORITE = "session/DELETE_FAVORITE";

const getAllFavorites = (favorites) => ({
    type: GET_ALL_FAVORITES,
    payload: favorites,
})

const getUserFavorites = (favorites) => ({
    type: GET_USER_FAVORITES,
    payload: favorites,
})

const getAllBuildsFromFavorite = (builds) => ({
    type: GET_ALL_BUILDS_FROM_FAVORITE,
    payload: builds,
})

const getBuildFromFavorite = (build) => ({
    type: GET_BUILD_FROM_FAVORITE,
    payload: build,
})

const createFavorite = (favorite) => ({
    type: CREATE_FAVORITE,
    payload: favorite,
})

const addBuildToFavorite = (buildId, favoriteId) => ({
    type: ADD_BUILD_TO_FAVORITE,
    buildId,
    favoriteId,
})

const removeBuildFromFavorite = (buildId, favoriteId) => ({
    type: REMOVE_BUILD_FROM_FAVORITE,
    buildId,
    favoriteId,
})

const deleteFavorite = (favoriteId) => ({
    type: DELETE_FAVORITE,
    payload: favoriteId,
})

export const getAllFavoritesThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/favorites");
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllFavorites(data));
        return data;
    }
}

export const getUserFavoritesThunk = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/favorites`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getUserFavorites(data));
        return data;
    }
}

export const getAllBuildsFromFavoriteThunk = (favoriteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/${favoriteId}/builds`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllBuildsFromFavorite(data));
        return data;
    }
}

export const getBuildFromFavoriteThunk = (favoriteId, buildId) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/${favoriteId}/builds/${buildId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getBuildFromFavorite(data));
        return data;
    }
}

export const createFavoriteThunk = (favorite) => async (dispatch) => {
    const { name, userId, selectedBuild } = favorite
    const response = await csrfFetch("/api/favorites/new", {
        method: "POST",
        body: JSON.stringify({
            name,
            user_id: userId,
            builds: selectedBuild
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createFavorite(data));
        return data;
    } else {
        const errorData = await response.json();
        console.error('errorData', errorData);
        throw new Error('Failed to create favorite');
    }
}

export const addBuildToFavoriteThunk = (buildId, favoriteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/${favoriteId}/add`, {
        method: "POST",
        body: JSON.stringify({build_id: buildId}),
    });
    if (response.ok) {
        const data = await response.json();
        // dispatch(addBuildToFavorite(data));
        dispatch(addBuildToFavorite(data.buildId, data.favoriteId));
        return data;
    } else {
        throw new Error('Failed to add build to favorite');
    }
};


export const removeBuildFromFavoriteThunk = (buildId, favoriteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/${favoriteId}/remove/${buildId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeBuildFromFavorite(data));
        return data;
    }
}

export const deleteFavoriteThunk = (favoriteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/${favoriteId}/remove`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteFavorite(data));
        return data;
    }
}

const initialState = {
    favorites: {},
    userFavorites: { builds: {}},
}

const favoriteReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_FAVORITES:
            newState.favorites = action.payload;
            return newState;
        case GET_USER_FAVORITES:
            newState.userFavorites = action.payload;
            return newState;
        case GET_ALL_BUILDS_FROM_FAVORITE:
                if (!newState.userFavorites[action.favoriteId]) {
                    newState.userFavorites[action.favoriteId] = {};
                }
                newState.userFavorites[action.favoriteId].builds = action.payload;
                return newState;
        case CREATE_FAVORITE:
            newState.favorites[action.payload.id] = action.payload;
            return newState;
        case ADD_BUILD_TO_FAVORITE:
            if (newState.favorites[action.favoriteId]) {
                const existingBuilds = newState.favorites[action.favoriteId].builds.map(build => build.id);
                if (!existingBuilds.includes(action.buildId)) {
                    newState.favorites[action.favoriteId].builds.push({ id: action.buildId });
                }
            }
            return newState;
        case REMOVE_BUILD_FROM_FAVORITE:
            if (newState.favorites[action.favoriteId]) {
                newState.favorites[action.favoriteId].builds = newState.favorites[action.favoriteId].builds.filter(build => build.id !== action.buildId);
            }
            return newState;
        default:
            return state;
    }
}

export default favoriteReducer;
