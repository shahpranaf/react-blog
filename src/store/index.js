import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { postsApi } from './apis/postsApi';
import { authApi } from './apis/authApi';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        // [userApi.reducerPath]: userApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(postsApi.middleware)
    }
});

setupListeners(store.dispatch);

export { store };