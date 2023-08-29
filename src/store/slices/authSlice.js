import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../apis/authApi';

const initialState = {
    loading: false,
    user: null, // for user object
    token: localStorage.getItem('token') || null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'currentUser',
    initialState,
    tagTypes: ["CurrentUser"],
    reducers: {
        logOut: (state) => {
            localStorage.removeItem('token');
            state.user = null
            state.token = null
            return state;
        },
        setToken: (state, action) => {
            const accessToken = action.payload
            state.token = accessToken;
            localStorage.setItem('token', accessToken);
        },
        setCurrentUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addMatcher(authApi.endpoints.fetchCurrentUser.matchFulfilled,
            (state, action) => {
                state.user = action.payload
            }
        )
            .addMatcher(authApi.endpoints.logoutUser.matchFulfilled,
                (state, action) => {
                    localStorage.removeItem('token');
                    state.user = null;
                    state.token = null;
                }
            )
    },
})

export const { setToken, logOut, setCurrentUser } = authSlice.actions
export default authSlice.reducer;

export const selectCurrentUser = (state) => {
    return state.auth.user
}
export const selectCurrentToken = (state) => state.auth.token