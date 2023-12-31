import { csrfFetch } from "./csrf";
// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_ALL_USERS = "session/GET_ALL_USERS";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const getAllUsers = (users) => ({
	type: GET_ALL_USERS,
	payload: users,
})
const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	try {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		if (response.ok) {
			const data = await response.json();
			dispatch(setUser(data));
			return null;
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return { errors: data.errors };
			}
		} else {
			return { errors: ["An error occurred. Please try again."] };
		}
	} catch (err) {
		return { errors: ["An error occurred. Please check your network connection and try again."] };
	}
};


export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	try {
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			if (errorData.errors) {
				return { errors: errorData.errors };
			}
			throw new Error("Signup request failed due to server error");
		}

		const data = await response.json();
		dispatch(setUser(data));
		return { ok: true };

	} catch (error) {
		console.error(error);
		return { errors: ["An error occurred. Please try again."] };
	}
};


export const fetchUsers = () => async (dispatch) => {
    const res = await csrfFetch("/api/users");
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllUsers(data));
        return data;
    }
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		case REMOVE_USER:
			return { ...state, user: null };
		case GET_ALL_USERS:
			return { ...state, users: action.payload }
		default:
			return state;
	}
}
